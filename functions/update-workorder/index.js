const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
});

const db = app.database();

const validateUserIfTokenProvided = async (userId, token) => {
  if (!token) return { ok: true };

  const result = await db.collection('managers').doc(userId).get();
  const user = Array.isArray(result.data) ? result.data[0] : result.data;
  if (!user || user.token !== token) {
    return { ok: false, message: '登录已过期，请重新登录' };
  }

  return { ok: true };
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

const hasLaterWorkflowRecord = async (order, recordType) => {
  const nextTypes = WORKFLOW_NEXT_RECORD_TYPES[String(recordType)] || [];
  if (nextTypes.length === 0) return false;

  const orderId = order?._id || order?.id || order?.order_id;
  if (!orderId) return false;

  const rollbackAt = toTimestamp(order.rollback_at);
  const result = await db.collection('wo_records').where({ order_id: orderId }).get();
  const records = getResultData(result);
  const latestCurrentRecordTime = String(recordType) === '2'
    ? records
      .filter((record) => getRecordTime(record) >= rollbackAt && String(record.record_type) === '2')
      .reduce((latest, record) => Math.max(latest, getRecordTime(record)), 0)
    : 0;
  return records.some((record) => (
    getRecordTime(record) >= rollbackAt &&
    (String(recordType) !== '2' || getRecordTime(record) > latestCurrentRecordTime) &&
    nextTypes.includes(String(record.record_type))
  ));
};

exports.main = async (event, context) => {
  try {
    const { orderId, status, total_price, visit_time, manager_id, worker_id, date_appointment, cs_remark, userId, token } = event;
    
    console.log('接收到更新请求:', { orderId, status, total_price, visit_time, manager_id, worker_id, date_appointment });
    
    const checkResult = await db.collection('workorders').where({
      _id: orderId
    }).get();
    console.log('查询结果:', checkResult);
    
    const currentOrder = getResultData(checkResult)[0];
    if (!currentOrder) {
      return {
        success: false,
        message: '未找到对应的工单'
      };
    }
    currentOrder._id = currentOrder._id || orderId;

    const authResult = await validateUserIfTokenProvided(userId, token);
    if (!authResult.ok) {
      return {
        success: false,
        message: authResult.message
      };
    }

    if (total_price !== undefined || String(status || '') === '40') {
      return {
        success: false,
        message: '报价金额和报价状态只能通过报价事务接口修改，请刷新页面后重试'
      };
    }

    const isAssignmentUpdate = manager_id !== undefined || visit_time !== undefined || cs_remark !== undefined;
    const isQuoteUpdate = total_price !== undefined && String(status || currentOrder.status) === '40';
    const isDispatchUpdate = worker_id !== undefined || date_appointment !== undefined;

    if (isAssignmentUpdate && await hasLaterWorkflowRecord(currentOrder, '0')) {
      return {
        success: false,
        message: '项目经理已保存或提交勘测/后续节点，派单信息不可再修改。如需处理，请走运维退回。'
      };
    }

    if (isQuoteUpdate && await hasLaterWorkflowRecord(currentOrder, '2')) {
      return {
        success: false,
        message: '客户或后续节点已经处理，报价不可再修改。如需处理，请走运维退回。'
      };
    }

    if (isDispatchUpdate && await hasLaterWorkflowRecord(currentOrder, '3_5')) {
      return {
        success: false,
        message: '施工准备或后续节点已经提交，派工信息不可再修改。如需处理，请走运维退回。'
      };
    }
    
    const updateData = {};
    if (status !== undefined) {
      updateData.status = status;
    }
    if (total_price !== undefined) {
      updateData.total_price = total_price;
    }
    if (visit_time !== undefined) {
      updateData.visit_time = visit_time;
    }
    if (manager_id !== undefined) {
      updateData.manager_id = manager_id;
    }
    if (worker_id !== undefined) {
      updateData.worker_id = worker_id;
    }
    if (date_appointment !== undefined) {
      updateData.date_appointment = date_appointment;
    }
    if (cs_remark !== undefined) {
      updateData.cs_remark = cs_remark;
    }
    updateData.updatedAt = Date.now();
    
    console.log('更新数据:', updateData);
    
    const result = await db.collection('workorders').where({
      _id: orderId
    }).update(updateData);
    
    console.log('更新结果:', result);
    
    return {
      success: result.updated > 0,
      message: result.updated > 0 ? '更新成功' : '更新失败',
      data: result
    };
  } catch (error) {
    console.error('更新失败:', error);
    return {
      success: false,
      message: error.message || '更新失败'
    };
  }
};
