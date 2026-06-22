const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};
const toTimestamp = (value) => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return isFinite(value) ? value : 0;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'object') {
    if (value.$numberLong !== undefined) return Number(value.$numberLong) || 0;
    if (value.$numberDouble !== undefined) return Number(value.$numberDouble) || 0;
    if (value.$numberInt !== undefined) return Number(value.$numberInt) || 0;
    const primitive = typeof value.valueOf === 'function' ? value.valueOf() : value;
    if (primitive !== value) return toTimestamp(primitive);
    const parsed = Number(typeof value.toString === 'function' ? value.toString() : '');
    return isFinite(parsed) ? parsed : 0;
  }
  const parsed = Number(value);
  return isFinite(parsed) ? parsed : 0;
};
const getRecordTime = (record = {}) => Math.max(
  toTimestamp(record.createdAt),
  toTimestamp(record.updatedAt),
  toTimestamp(record.updateTime)
);
const getActiveRecords = (records, order) => {
  const rollbackAt = toTimestamp(order?.rollback_at);
  return normalizeArray(records).filter((record) => getRecordTime(record) >= rollbackAt);
};
const hasConstructionStarted = (records, order) => {
  return getActiveRecords(records, order).some((record) => ['4', '5', '6', '9', '10'].includes(String(record.record_type)));
};
const getLatestDispatchRecord = (records, order) => {
  return getActiveRecords(records, order)
    .filter((record) => String(record.record_type) === '3_5')
    .sort((a, b) => getRecordTime(b) - getRecordTime(a))[0];
};
const assertSaved = (result, message) => {
  if (!result) return;
  if (result.success === false || result.code >= 400 || result.error) {
    throw new Error(result.message || result.errMsg || message);
  }
};
const assertFunctionSaved = (result, message) => {
  const payload = result?.result || result;
  assertSaved(payload, message);
  if (payload && payload.success !== true) {
    throw new Error(payload.message || message);
  }
};
const getSingleRecordFromResult = (result) => {
  if (!result) return null;
  if (result.record) return result.record;
  if (result.data && !Array.isArray(result.data)) return result.data;
  if (Array.isArray(result.records)) return result.records[0] || null;
  if (Array.isArray(result.data)) return result.data[0] || null;
  return result;
};
const getRecordsFromResult = (result, fallback = []) => {
  if (!result) return fallback;
  if (Array.isArray(result.records)) return result.records;
  if (Array.isArray(result.data?.records)) return result.data.records;
  if (Array.isArray(result.data)) return result.data;
  if (Array.isArray(result)) return result;
  return fallback;
};
const loadLatestOrder = async (orderId) => {
  const result = await $w.cloud.callDataSource({
    dataSourceName: 'workorders',
    methodName: 'wedaGetItem',
    params: { _id: orderId }
  });
  return getSingleRecordFromResult(result);
};
const formatDateTime = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return value;
  const date = new Date(numeric);
  const pad = (num) => String(num).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
const loadLatestRecords = async (orderId) => {
  try {
    const result = await $w.cloud.callDataSource({
      dataSourceName: 'wo_records',
      methodName: 'wedaGetRecords',
      params: {
        where: [{ key: 'order_id', rel: 'eq', val: orderId }]
      }
    });
    return getRecordsFromResult(result, $w.listView1?.records || []);
  } catch (e) {
    console.warn('读取最新流水失败，使用页面缓存:', e);
    return $w.listView1?.records || [];
  }
};
export default async function({event, data}) {
  try {
    $w.utils.showLoading({ title: '正在派工...' });
    const orderId = $w.page.dataset.params.record_id || $w.page.dataset.params._id;
    if (!orderId) throw new Error('订单ID丢失');
    const orderRecord = await loadLatestOrder(orderId);
    const employeeId = String($w.app?.dataset?.state?.myEmployeeId || '');
    if (!employeeId || String(orderRecord?.manager_id || '') !== employeeId) {
      throw new Error('您不是当前工单的项目经理，不能修改派工信息。');
    }
    const latestStatus = String(orderRecord?.status || '');
    if (!['45', '50'].includes(latestStatus)) {
      throw new Error('工单状态已变化，当前不可修改派工信息。');
    }
    const latestRecords = await loadLatestRecords(orderId);
    if (hasConstructionStarted(latestRecords, orderRecord)) {
      throw new Error('施工准备或后续节点已经提交，派工信息不可再修改。如需处理，请联系后台运维退回。');
    }
    const workerId = $w.select1?.value;
    if (!workerId) throw new Error('请先选择要指派的师傅！');
    const appointmentTime = $w.date1?.value;
    if (!appointmentTime) throw new Error('请选择预约施工时间！');
    const now = Date.now();
    const worker = ($w.query_managers?.data?.records || []).find((item) => item._id === workerId);
    const workerName = worker?.name || '';
    const content = '项目经理已完成派工，施工师傅：' + (workerName || workerId) + '，预计进场时间：' + formatDateTime(appointmentTime);
    const existingRecord = getLatestDispatchRecord(latestRecords, orderRecord);
    const saveRecordResult = await $w.cloud.callFunction({
      name: 'update-record',
      data: {
        collection: 'wo_records',
        docId: existingRecord?._id,
        orderId,
        recordType: '3_5',
        upsert: true,
        allowedStatuses: ['45', '50'],
        data: {
          content,
          worker_id: workerId,
          worker_name: workerName,
          date_appointment: appointmentTime,
          creator_name: '项目经理',
          creator_role: 'manager',
          creator_id: employeeId,
          createdAt: now,
          updatedAt: now
        }
      }
    });
    assertFunctionSaved(saveRecordResult, existingRecord?._id ? '派工流水更新失败' : '派工流水新增失败');
    const updateWorkorderResult = await $w.cloud.callDataSource({
      dataSourceName: 'workorders',
      methodName: 'wedaUpdate',
      params: {
        _id: orderId,
        status: '50',
        worker_id: workerId,
        date_appointment: appointmentTime,
        updatedAt: now
      }
    });
    assertSaved(updateWorkorderResult, '工单派工信息更新失败');
    $w.utils.hideLoading();
    $w.utils.showToast({ title: existingRecord?._id ? '派工信息已修改！' : '派工成功！', icon: 'success' });
    $w.modal2?.close();
    try { $w.select1?.setValue(''); } catch(e) {}
    try { $w.date1?.setValue(''); } catch(e) {}
    try { $w.dataView1?.refresh(); } catch(e) {}
    try { $w.listView1?.refresh(); } catch(e) {}
  } catch (e) {
    $w.utils.hideLoading();
    $w.utils.showModal({ title: '派工失败', content: e.message, showCancel: false });
  }
}
