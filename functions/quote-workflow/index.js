const crypto = require('crypto');
const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
});

const db = app.database();

const ACTIONS = {
  save_initial: {
    actor: 'manager',
    allowedStatuses: ['30', '40'],
    targetStatus: '40'
  },
  save_change: {
    actor: 'worker',
    allowedStatuses: ['60', '65'],
    targetStatus: '65'
  },
  accept_initial: {
    actor: 'client',
    allowedStatuses: ['40'],
    targetStatus: '45',
    recordType: '3',
    content: '客户已在线同意维修方案及报价，准备进场施工'
  },
  reject_initial: {
    actor: 'client',
    allowedStatuses: ['40'],
    targetStatus: '30',
    recordType: '客户驳回',
    content: '客户对当前维修方案或价格存在疑问，已驳回。'
  },
  accept_change: {
    actor: 'client',
    allowedStatuses: ['65'],
    targetStatus: '60',
    recordType: '3_1',
    content: '客户已在线同意现场施工变更方案及最新报价，师傅继续施工。'
  },
  reject_change: {
    actor: 'client',
    allowedStatuses: ['65'],
    targetStatus: '60',
    recordType: '客户驳回',
    content: '客户驳回了现场施工变更报价，要求师傅重新核算方案。'
  }
};

const getData = (result) => {
  if (!result || result.data === null || result.data === undefined) return [];
  return Array.isArray(result.data) ? result.data : [result.data];
};

const toTimestamp = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'object') {
    if (value.$numberLong !== undefined) return Number(value.$numberLong) || 0;
    if (value.$numberDouble !== undefined) return Number(value.$numberDouble) || 0;
    if (value.$numberInt !== undefined) return Number(value.$numberInt) || 0;
    const primitive = typeof value.valueOf === 'function' ? value.valueOf() : value;
    if (primitive !== value) return toTimestamp(primitive);
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getRecordTime = (record = {}) => Math.max(
  toTimestamp(record.createdAt),
  toTimestamp(record.updatedAt),
  toTimestamp(record.updateTime)
);

const hasValue = (value) => value !== undefined && value !== null && value !== '';

const normalizeArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [value];
    } catch {
      return [value];
    }
  }
  return [value].filter(Boolean);
};

const getCallerOpenId = async (_event, context) => {
  const direct = [
    context?.OPENID,
    context?.openid,
    context?.openId
  ].find(Boolean);
  if (direct) return String(direct);

  try {
    const userInfo = await app.auth().getUserInfo();
    return String(userInfo?.openId || userInfo?.openid || userInfo?._openid || '');
  } catch (error) {
    console.warn('无法从调用上下文读取 OpenID:', error?.message || error);
    return '';
  }
};

const validateStaff = async ({ actorId, token, callerOpenId }) => {
  if (!actorId) return { ok: false, message: '未识别到员工身份，请重新进入工作台' };
  const result = await db.collection('managers').doc(actorId).get();
  const staff = getData(result)[0];
  if (!staff) return { ok: false, message: '员工账号不存在' };

  if (token) {
    if (staff.token !== token) return { ok: false, message: '登录已过期，请重新登录' };
    return { ok: true, staff };
  }

  if (!callerOpenId || String(staff.bind_openid || '') !== callerOpenId) {
    return { ok: false, message: '无法验证当前微信员工身份，请重新登录后再试' };
  }
  return { ok: true, staff };
};

const isSamePrice = (left, right) => Math.abs(Number(left) - Number(right)) < 0.000001;

const fail = (message, code = 409) => ({ success: false, code, message });

exports.main = async (event = {}, context = {}) => {
  const config = ACTIONS[event.action];
  if (!config) return fail('不支持的报价操作', 400);
  if (!event.orderId) return fail('缺少工单ID', 400);

  try {
    const callerOpenId = await getCallerOpenId(event, context);
    let staff = null;
    if (config.actor !== 'client') {
      const staffResult = await validateStaff({
        actorId: event.actorId || event.userId,
        token: event.token,
        callerOpenId
      });
      if (!staffResult.ok) return fail(staffResult.message, 403);
      staff = staffResult.staff;
    }

    const result = await db.runTransaction(async (transaction) => {
      const orderResult = await transaction.collection('workorders').doc(event.orderId).get();
      const order = getData(orderResult)[0];
      if (!order) throw new Error('工单不存在，请刷新后重试');

      const currentStatus = String(order.status || '');
      const currentVersion = Number(order.quote_version || 0);
      const expectedStatus = String(event.expectedStatus || '');
      const hasExpectedVersion = hasValue(event.expectedQuoteVersion);
      const expectedVersion = hasExpectedVersion ? Number(event.expectedQuoteVersion) : null;
      const expectedQuoteUpdatedAt = toTimestamp(event.expectedQuoteUpdatedAt);
      const hasExpectedPrice = hasValue(event.expectedPrice);
      const expectedPrice = hasExpectedPrice ? Number(event.expectedPrice) : null;

      if (!config.allowedStatuses.includes(currentStatus) || currentStatus !== expectedStatus) {
        throw new Error('工单状态已变化，本次操作未保存，请刷新后重试');
      }

      if (config.actor === 'client') {
        const ownerOpenId = String(order.owner || order._openid || order.createBy || '');
        if (!callerOpenId || callerOpenId !== ownerOpenId) {
          throw new Error('无法验证当前客户身份，请重新进入工单');
        }
      } else {
        const assignedId = config.actor === 'manager' ? order.manager_id : order.worker_id;
        if (String(assignedId || '') !== String(staff._id || event.actorId || event.userId || '')) {
          throw new Error(config.actor === 'manager' ? '您不是当前工单的项目经理' : '您不是当前工单指派的施工师傅');
        }
      }

      let latestQuote = null;
      const loadLatestQuote = async () => {
        if (latestQuote !== null) return latestQuote;
        const recordsResult = await transaction.collection('wo_records')
          .where({ order_id: event.orderId, record_type: '2' })
          .get();
        const rollbackAt = toTimestamp(order.rollback_at);
        latestQuote = getData(recordsResult)
          .filter((record) => getRecordTime(record) >= rollbackAt)
          .sort((a, b) => getRecordTime(b) - getRecordTime(a))[0] || null;
        return latestQuote;
      };

      if (hasExpectedVersion) {
        if (currentVersion !== expectedVersion) {
          throw new Error('报价内容已变化，本次操作未保存，请刷新后重新确认');
        }
      } else {
        const currentQuote = await loadLatestQuote();
        if (expectedQuoteUpdatedAt > 0 && getRecordTime(currentQuote || {}) !== expectedQuoteUpdatedAt) {
          throw new Error('报价内容已变化，本次操作未保存，请刷新后重新确认');
        }
        const shouldCheckExpectedPrice =
          !event.action.startsWith('save_') ||
          !['30', '60'].includes(currentStatus);
        if (shouldCheckExpectedPrice && hasExpectedPrice && !isSamePrice(order.total_price, expectedPrice)) {
          throw new Error('报价金额已变化，本次操作未提交，请刷新后重新确认');
        }
      }

      const now = Date.now();
      if (event.action.startsWith('save_')) {
        const price = Number(event.price);
        if (!Number.isFinite(price) || price <= 0) throw new Error('请输入有效的报价金额');

        const currentQuote = await loadLatestQuote();
        const shouldCreate = currentStatus === '30' || currentStatus === '60' || !currentQuote?._id;
        const nextVersion = currentVersion + 1;
        const quoteRecordId = shouldCreate
          ? `quote_${crypto.randomBytes(12).toString('hex')}`
          : currentQuote._id;
        const recordData = {
          order_id: event.orderId,
          record_type: '2',
          content: String(event.content || ''),
          price,
          images: normalizeArray(event.images),
          attachments: normalizeArray(event.attachments),
          creator_name: event.creatorName || staff?.name || (config.actor === 'manager' ? '项目经理' : '现场师傅'),
          creator_role: config.actor,
          creator_id: staff?._id || event.actorId || event.userId || '',
          quote_version: nextVersion,
          updatedAt: now
        };

        if (shouldCreate) {
          await transaction.collection('wo_records').doc(quoteRecordId).create({
            ...recordData,
            createdAt: now
          });
        } else {
          await transaction.collection('wo_records').doc(quoteRecordId).update(recordData);
        }

        await transaction.collection('workorders').doc(event.orderId).update({
          status: config.targetStatus,
          total_price: price,
          quote_version: nextVersion,
          quote_record_id: quoteRecordId,
          quote_stage: event.action === 'save_initial' ? 'initial' : 'change',
          quote_pending: true,
          quote_updated_at: now,
          updatedAt: now
        });

        return { quoteVersion: nextVersion, quoteRecordId, status: config.targetStatus, price };
      }

      if (hasExpectedPrice && !isSamePrice(order.total_price, expectedPrice)) {
        throw new Error('报价金额已变化，本次操作未提交，请刷新后重新确认');
      }

      const decisionUpdate = {
        status: config.targetStatus,
        quote_pending: false,
        quote_decision_at: now,
        updatedAt: now
      };
      if (event.action.startsWith('accept_')) {
        decisionUpdate.accepted_price = Number(order.total_price);
        decisionUpdate.accepted_quote_version = currentVersion;
      }
      await transaction.collection('workorders').doc(event.orderId).update(decisionUpdate);

      await transaction.collection('wo_records').doc(`decision_${crypto.randomBytes(12).toString('hex')}`).create({
        order_id: event.orderId,
        record_type: config.recordType,
        content: config.content,
        price: Number(order.total_price || 0),
        quote_version: currentVersion,
        creator_name: '业主/客户',
        creator_role: 'client',
        creator_id: callerOpenId,
        createdAt: now,
        updatedAt: now
      });

      return { quoteVersion: currentVersion, status: config.targetStatus, price: Number(order.total_price || 0) };
    });

    return { success: true, code: 200, message: '操作成功', data: result };
  } catch (error) {
    console.error('报价事务失败:', { action: event.action, orderId: event.orderId, error });
    const message = error?.message || '报价操作失败';
    const isConflict = String(error?.code || '').includes('TRANSACTION') || message.includes('冲突');
    return fail(isConflict ? '报价刚刚发生变化，请刷新后重试' : message, 409);
  }
};
