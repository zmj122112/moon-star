const normalizeArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
};
const getUploadFileUrl = (item) => {
  if (!item) return '';
  if (typeof item === 'string') return item.trim();
  if (typeof item !== 'object') return '';
  const directValue = item.url || item.fileID || item.fileId || item.cloudPath || item.cloudFileId || item.path;
  if (typeof directValue === 'string') return directValue.trim();
  for (const nested of [item.response, item.data, item.file]) {
    const nestedUrl = getUploadFileUrl(nested);
    if (nestedUrl) return nestedUrl;
  }
  return '';
};
const getUploadValues = (component) => {
  let methodValue;
  try { methodValue = component?.getValue?.(); } catch(e) {}
  const sources = [component?.value, methodValue, component?.files, component?.fileList, component?.data?.value, component?.props?.value];
  const values = [];
  for (const source of sources) {
    for (const item of normalizeArray(source)) {
      const url = getUploadFileUrl(item);
      if (url && !values.includes(url)) values.push(url);
    }
  }
  return values;
};
const hasPendingUpload = (component) => {
  const items = [component?.files, component?.fileList, component?.value]
    .flatMap((source) => normalizeArray(source));
  return items.some((item) => {
    if (!item || typeof item !== 'object') return false;
    const status = String(item.status || item.uploadStatus || '').toLowerCase();
    return ['uploading', 'pending', 'loading'].includes(status);
  });
};
const waitForUploadValues = async (component, maxWaitMs = 5000) => {
  const startedAt = Date.now();
  let values = getUploadValues(component);
  while (hasPendingUpload(component) && Date.now() - startedAt < maxWaitMs) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    values = getUploadValues(component);
  }
  if (hasPendingUpload(component)) {
    throw new Error('文件仍在上传，请等待上传完成后再提交');
  }
  return values;
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
const hasClientHandledQuote = (records, order, quoteRecord) => {
  const quoteTime = getRecordTime(quoteRecord || {});
  return getActiveRecords(records, order).some((record) => (
    getRecordTime(record) > quoteTime &&
    ['3_1', '客户驳回', '9', '10'].includes(String(record.record_type))
  ));
};
const getLatestQuoteRecord = (records, order) => {
  return getActiveRecords(records, order)
    .filter((record) => String(record.record_type) === '2')
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
    $w.utils.showLoading({ title: '正在提交重新报价...' });
    const orderId = $w.page.dataset.params.record_id || $w.page.dataset.params._id;
    if (!orderId) throw new Error('订单ID丢失，请重进');
    const orderRecord = await loadLatestOrder(orderId);
    const employeeId = String($w.app?.dataset?.state?.myEmployeeId || '');
    if (!employeeId || String(orderRecord?.worker_id || '') !== employeeId) {
      throw new Error('您不是当前工单指派的施工师傅，不能提交现场重新报价');
    }
    const latestRecords = await loadLatestRecords(orderId);
    const existingRecord = getLatestQuoteRecord(latestRecords, orderRecord);
    if (String(orderRecord?.status) === '65' && hasClientHandledQuote(latestRecords, orderRecord, existingRecord)) {
      throw new Error('客户或后续节点已经处理，当前重新报价不可修改。如需处理，请联系后台运维退回。');
    }
    const quotePrice = parseFloat($w.inputNumber2?.value) || 0;
    const quoteImages = await waitForUploadValues($w.uploadImage2);
    const quoteAttachments = await waitForUploadValues($w.uploadFile2);
    if (quotePrice <= 0) throw new Error('请输入有效的重新报价总金额');
    const content = `【现场重新核算】施工师傅现场打开后调整方案。重新报价：${quotePrice}元。`;
    const currentRole = 'worker';
    const roleName = '现场师傅';
    const now = Date.now();
    const recordPayload = {
      content,
      images: quoteImages.length > 0 ? quoteImages : (existingRecord?.images || []),
      attachments: quoteAttachments.length > 0 ? quoteAttachments : (existingRecord?.attachments || []),
      price: quotePrice,
      creator_name: roleName,
      creator_role: currentRole,
      creator_id: $w.app?.dataset?.state?.myEmployeeId,
      updatedAt: now
    };
    const shouldUpdateExisting = existingRecord?._id && String(orderRecord.status) === '65';
    const saveRecordResult = await $w.cloud.callFunction({
      name: 'quote-workflow',
      data: {
        action: 'save_change',
        orderId,
        actorId: employeeId,
        expectedStatus: String(orderRecord.status || ''),
        expectedQuoteVersion: orderRecord.quote_version === undefined || orderRecord.quote_version === null || orderRecord.quote_version === ''
          ? undefined
          : Number(orderRecord.quote_version),
        expectedQuoteUpdatedAt: getRecordTime(existingRecord || {}),
        expectedPrice: Number(orderRecord.total_price || 0),
        price: quotePrice,
        content: recordPayload.content,
        images: recordPayload.images,
        attachments: recordPayload.attachments,
        creatorName: roleName
      }
    });
    assertFunctionSaved(saveRecordResult, shouldUpdateExisting ? '重新报价流水更新失败' : '重新报价流水新增失败');
    $w.utils.hideLoading();
    $w.utils.showToast({ title: existingRecord?._id && String(orderRecord.status) === '65' ? '重新报价已修改！' : '新报价已送达客户！', icon: 'success' });
    $w.modal3?.close();
    try { $w.inputNumber2?.setValue(); } catch(e) {}
    try { $w.uploadImage2?.setValue([]); } catch(e) {}
    try { $w.uploadFile2?.setValue([]); } catch(e) {}
    setTimeout(() => {
      try { $w.dataView1?.refresh(); } catch(e) {}
      try { $w.listView1?.refresh(); } catch(e) {}
    }, 500);
  } catch (e) {
    $w.utils.hideLoading();
    $w.utils.showModal({ title: '提交失败', content: e.message, showCancel: false });
  }
}
