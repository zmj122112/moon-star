const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
});

const db = app.database();

const ALLOWED_COLLECTIONS = {
  wo_records: [
    'order_id',
    'record_type',
    'images',
    'attachments',
    'content',
    'price',
    'manager_id',
    'manager_name',
    'worker_id',
    'worker_name',
    'visit_time',
    'date_appointment',
    'creator_name',
    'creator_role',
    'creator_id',
    'updatedAt',
    'updateTime'
  ]
};

const WORKFLOW_NEXT_RECORD_TYPES = {
  '0': ['1', '2', '3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '1': ['2', '3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '2': ['3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '3': ['3_5', '4', '5', '6', '9', '10'],
  '3_1': ['5', '6', '9', '10'],
  '3_5': ['4', '5', '6', '9', '10'],
  '4': ['5', '6', '9', '10'],
  '5': ['6', '9', '10'],
  '6': ['9', '10'],
};

const validateUserIfTokenProvided = async (userId, token) => {
  if (!token) return { ok: true };

  const result = await db.collection('managers').doc(userId).get();
  const user = Array.isArray(result.data) ? result.data[0] : result.data;
  if (!user || user.token !== token) {
    return { ok: false, message: '登录已过期，请重新登录' };
  }

  return { ok: true };
};

const getResultData = (result) => {
  if (!result || !result.data) return [];
  return Array.isArray(result.data) ? result.data : [result.data].filter(Boolean);
};

const toTimestamp = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'bigint') return Number(value);
  if (value instanceof Date) return value.getTime();

  if (typeof value === 'object') {
    if (value.$numberLong !== undefined) return Number(value.$numberLong) || 0;
    if (value.$numberDouble !== undefined) return Number(value.$numberDouble) || 0;
    if (value.$numberInt !== undefined) return Number(value.$numberInt) || 0;

    const primitive = typeof value.valueOf === 'function' ? value.valueOf() : value;
    if (primitive !== value) {
      return toTimestamp(primitive);
    }

    const text = typeof value.toString === 'function' ? value.toString() : '';
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getRecordTime = (record = {}) => Math.max(
  toTimestamp(record.createdAt),
  toTimestamp(record.updatedAt),
  toTimestamp(record.updateTime)
);

const normalizeImageEntries = (images) => {
  if (!Array.isArray(images)) return [];
  return images.map((item) => {
    if (typeof item === 'string') {
      return { url: item, visible: true };
    }
    return {
      url: item?.url || '',
      visible: item?.visible !== false
    };
  });
};

const isVisibilityOnlyImageUpdate = (currentImages, nextImages, updateData) => {
  const updateKeys = Object.keys(updateData || {});
  const allowedKeys = ['images', 'updateTime', 'updatedAt'];
  if (updateKeys.length === 0 || updateKeys.some((key) => !allowedKeys.includes(key))) {
    return false;
  }

  const before = normalizeImageEntries(currentImages);
  const after = normalizeImageEntries(nextImages);
  if (before.length === 0 || before.length !== after.length) {
    return false;
  }

  let visibilityChanged = false;
  for (let index = 0; index < before.length; index += 1) {
    if (before[index].url !== after[index].url) {
      return false;
    }
    if (before[index].visible !== after[index].visible) {
      visibilityChanged = true;
    }
  }

  return visibilityChanged;
};

const getRecordById = async (collection, docId) => {
  if (!docId) return null;
  const result = await db.collection(collection).doc(docId).get();
  return getResultData(result)[0] || null;
};

const getOrderById = async (orderId) => {
  if (!orderId) return null;
  const result = await db.collection('workorders').doc(orderId).get();
  return getResultData(result)[0] || null;
};

const hasLaterWorkflowRecord = async (orderId, recordType, referenceTime = 0) => {
  const nextTypes = WORKFLOW_NEXT_RECORD_TYPES[String(recordType)] || [];
  if (!orderId || nextTypes.length === 0) return false;

  const orderResult = await db.collection('workorders').doc(orderId).get();
  const order = getResultData(orderResult)[0] || {};
  const rollbackAt = toTimestamp(order.rollback_at);
  const recordsResult = await db.collection('wo_records').where({ order_id: orderId }).get();

  return getResultData(recordsResult).some((record) => (
    getRecordTime(record) >= rollbackAt &&
    (String(recordType) !== '2' || getRecordTime(record) > referenceTime) &&
    nextTypes.includes(String(record.record_type))
  ));
};

const getLatestActiveWorkflowTime = async (orderId) => {
  if (!orderId) return 0;
  const order = await getOrderById(orderId) || {};
  const rollbackAt = toTimestamp(order.rollback_at);
  const recordsResult = await db.collection('wo_records').where({ order_id: orderId }).get();
  return getResultData(recordsResult)
    .filter((record) => getRecordTime(record) >= rollbackAt)
    .reduce((latest, record) => Math.max(latest, getRecordTime(record)), rollbackAt);
};

const getUpdatedCount = (result) => {
  if (!result) return 0;
  if (typeof result.updated === 'number') return result.updated;
  if (typeof result.stats?.updated === 'number') return result.stats.updated;
  return 0;
};

const findLatestRecordId = async ({ collection, orderId, recordType }) => {
  if (!orderId || !recordType) return '';

  const orderResult = await db.collection('workorders').doc(orderId).get();
  const order = getResultData(orderResult)[0] || {};
  const rollbackAt = toTimestamp(order.rollback_at);

  const result = await db.collection(collection)
    .where({
      order_id: orderId,
      record_type: String(recordType)
    })
    .get();

  const latest = getResultData(result)
    .filter((record) => getRecordTime(record) >= rollbackAt)
    .sort((a, b) => getRecordTime(b) - getRecordTime(a))[0];

  return latest?._id || '';
};

exports.main = async (event, context) => {
  const { collection, docId, orderId, recordType, data, userId, token, upsert = false, allowedStatuses, forceCreate = false } = event;
  
  console.log('收到更新请求:', { collection, docId, orderId, recordType, data, upsert, allowedStatuses, forceCreate });
  
  try {
    if (!collection || !data || typeof data !== 'object' || Array.isArray(data)) {
      return {
        success: false,
        message: '缺少必要参数'
      };
    }

    const authResult = await validateUserIfTokenProvided(userId, token);
    if (!authResult.ok) {
      return {
        success: false,
        message: authResult.message
      };
    }

    const allowedFields = ALLOWED_COLLECTIONS[collection];
    if (!allowedFields) {
      return {
        success: false,
        message: '不允许更新该集合'
      };
    }

    const updateData = {};
    for (const [key, value] of Object.entries(data)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value;
      }
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: '没有可更新的字段'
      };
    }

    let targetDocId = forceCreate ? '' : docId;
    if (!targetDocId && !forceCreate) {
      targetDocId = await findLatestRecordId({ collection, orderId, recordType });
    }

    if (!targetDocId && !upsert) {
      return {
        success: false,
        message: '未找到要更新的流水记录'
      };
    }

    const targetRecord = await getRecordById(collection, targetDocId);
    const targetOrderId = orderId || targetRecord?.order_id;
    const targetRecordType = recordType || targetRecord?.record_type || data.record_type;
    if (!targetOrderId || !targetRecordType) {
      return {
        success: false,
        message: '缺少工单或流水类型参数'
      };
    }

    const quoteSensitiveFields = ['price', 'content', 'attachments', 'creator_name', 'creator_role', 'creator_id'];
    if (
      String(targetRecordType) === '2' &&
      (upsert || forceCreate || quoteSensitiveFields.some((field) => data[field] !== undefined))
    ) {
      return {
        success: false,
        message: '报价只能通过报价事务接口保存，请刷新页面后重试'
      };
    }

    const visibilityOnlyImageUpdate = isVisibilityOnlyImageUpdate(
      targetRecord?.images,
      updateData.images,
      updateData
    );

    let currentOrder = null;
    if (Array.isArray(allowedStatuses) && allowedStatuses.length > 0) {
      currentOrder = await getOrderById(targetOrderId);
      if (!currentOrder) {
        return {
          success: false,
          message: '工单不存在，请刷新后重试'
        };
      }
      if (!allowedStatuses.map(String).includes(String(currentOrder.status))) {
        return {
          success: false,
          message: '工单状态已变化，当前不可修改'
        };
      }
    }

    if (forceCreate && String(targetRecordType) === '2') {
      currentOrder = currentOrder || await getOrderById(targetOrderId);
      if (!currentOrder || !['30', '60'].includes(String(currentOrder.status))) {
        return {
          success: false,
          message: '当前状态不可发起新一轮报价'
        };
      }
    }

    let laterRecordReferenceTime = 0;
    if (String(targetRecordType) === '2') {
      laterRecordReferenceTime = forceCreate
        ? await getLatestActiveWorkflowTime(targetOrderId)
        : getRecordTime(targetRecord || {});
    }

    if (!visibilityOnlyImageUpdate && await hasLaterWorkflowRecord(targetOrderId, targetRecordType, laterRecordReferenceTime)) {
      return {
        success: false,
        message: '后续节点已经保存或提交，当前流水不可再修改。如需处理，请走运维退回。'
      };
    }

    if (!targetDocId && upsert) {
      const now = Date.now();
      const createData = {
        ...updateData,
        order_id: targetOrderId,
        record_type: String(targetRecordType),
        createdAt: data.createdAt || now,
        updatedAt: updateData.updatedAt || now
      };
      const createResult = await db.collection(collection).add(createData);
      const createdDocId = createResult.id || createResult._id || createResult.docId || '';

      console.log('新增结果:', createResult);

      return {
        success: Boolean(createdDocId || createResult),
        message: createdDocId || createResult ? '新增成功' : '新增失败',
        data: createResult,
        docId: createdDocId,
        created: true
      };
    }

    let res = await db.collection(collection).doc(targetDocId).update(updateData);
    let updatedCount = getUpdatedCount(res);

    if (updatedCount === 0 && orderId && recordType && targetDocId === docId) {
      const fallbackDocId = await findLatestRecordId({ collection, orderId, recordType });
      if (fallbackDocId && fallbackDocId !== targetDocId) {
        targetDocId = fallbackDocId;
        res = await db.collection(collection).doc(targetDocId).update(updateData);
        updatedCount = getUpdatedCount(res);
      }
    }

    console.log('更新结果:', res);
    
    return {
      success: updatedCount > 0,
      message: updatedCount > 0 ? '更新成功' : '未找到要更新的流水记录',
      data: res,
      docId: targetDocId
    };
  } catch (error) {
    console.error('更新失败:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};
