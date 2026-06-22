const WORKFLOW_NEXT_RECORD_TYPES = {
  '1': ['2', '3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '2': ['3', '3_1', '3_5', '4', '5', '6', '9', '10', '客户驳回'],
  '4': ['5', '6', '9', '10'],
  '5': ['6', '9', '10'],
  '6': ['9', '10']
};
const normalizeArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [value].filter(Boolean);
    } catch {
      return [value].filter(Boolean);
    }
  }
  return [value].filter(Boolean);
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
  const sources = [
    component?.value,
    methodValue,
    component?.files,
    component?.fileList,
    component?.data?.value,
    component?.props?.value
  ];
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
  return normalizeArray(records).filter((record) => {
    return getRecordTime(record) >= rollbackAt;
  });
};
const hasLaterRecord = (records, recordType, order) => {
  const nextTypes = WORKFLOW_NEXT_RECORD_TYPES[String(recordType)] || [];
  const activeRecords = getActiveRecords(records, order);
  const latestCurrentRecordTime = String(recordType) === '2'
    ? activeRecords
      .filter((record) => String(record.record_type) === '2')
      .reduce((latest, record) => Math.max(latest, getRecordTime(record)), 0)
    : 0;
  return activeRecords.some((record) => (
    nextTypes.includes(String(record.record_type)) &&
    (String(recordType) !== '2' || getRecordTime(record) > latestCurrentRecordTime)
  ));
};
const getLatestRecord = (records, recordType, order) => {
  return getActiveRecords(records, order)
    .filter((record) => String(record.record_type) === String(recordType))
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
const getOrderRole = (order, status) => {
  const employeeId = String($w.app?.dataset?.state?.myEmployeeId || '');
  if (!employeeId) return '';
  if (['20', '30', '40', '45'].includes(String(status)) && String(order?.manager_id || '') === employeeId) return 'manager';
  if (String(order?.worker_id || '') === employeeId) return 'worker';
  if (String(order?.manager_id || '') === employeeId) return 'manager';
  return '';
};
export default async function({event, data}) {
  try {
    $w.utils.showLoading({ title: '提交处理中...' });
    const orderId = $w.page.dataset.params.record_id || $w.page.dataset.params._id;
    if (!orderId) throw new Error('订单ID丢失，请重进');
    const orderRecord = await loadLatestOrder(orderId);
    const currentStatus = String(orderRecord?.status || '');
    if (!currentStatus) throw new Error('未拿到状态，请重试');
    const currentRole = getOrderRole(orderRecord, currentStatus);
    if (['20', '30', '40'].includes(currentStatus) && currentRole !== 'manager') {
      throw new Error('您不是当前工单的项目经理，不能操作此节点');
    }
    if (['50', '60', '70'].includes(currentStatus) && currentRole !== 'worker') {
      throw new Error('您不是当前工单指派的施工师傅，不能操作此节点');
    }
    let content = $w.textarea1?.value || '已完成当前节点任务';
    const images = await waitForUploadValues($w.uploadImage1);
    const isFinished = $w.switch1?.value;
    const quotePrice = parseFloat($w.inputNumber1?.value) || 0;
    const quoteAttachments = await waitForUploadValues($w.uploadFile1);
    const completionVideos = await waitForUploadValues($w.uploadVideo1);
    let recordType = '';
    let newStatus = currentStatus;
    let updateWorkorderParams = { _id: orderId };
    if (currentStatus === '20') {
      recordType = '1';
      if (isFinished === true) {
        newStatus = '30';
      } else {
        newStatus = '20';
        content = '[勘测过程补充] ' + content;
      }
    } else if (['30', '40'].includes(currentStatus)) {
      recordType = '2';
      newStatus = '40';
      if (quotePrice <= 0) throw new Error('请输入有效的方案报价总金额');
      content = content + ' 报价：' + quotePrice.toString();
    } else if (currentStatus === '50') {
      recordType = '4';
      newStatus = '60';
    } else if (currentStatus === '60') {
      if (isFinished === true) {
        recordType = '6';
        newStatus = '70';
      } else {
        recordType = '5';
        newStatus = '60';
      }
    } else if (currentStatus === '70') {
      recordType = '6';
      newStatus = '70';
    } else {
      throw new Error('当前状态不可操作');
    }
    const latestRecords = await loadLatestRecords(orderId);
    const latestQuoteRecord = getLatestRecord(latestRecords, '2', orderRecord);
    const latestQuoteRejection = getLatestRecord(latestRecords, '客户驳回', orderRecord);
    const isRejectedQuoteRevision = currentStatus === '30' &&
      getRecordTime(latestQuoteRejection || {}) > getRecordTime(latestQuoteRecord || {});
    if (!isRejectedQuoteRevision && hasLaterRecord(latestRecords, recordType, orderRecord)) {
      throw new Error('后续节点已经保存或提交，当前节点不可再修改。如需处理，请联系后台运维退回。');
    }
    const existingRecord = getLatestRecord(latestRecords, recordType, orderRecord);
    const shouldAppendRecord = currentStatus === '20' || recordType === '5' || isRejectedQuoteRevision;
    const editableRecord = shouldAppendRecord ? null : existingRecord;
    const mediaFallbackRecord = recordType === '2' ? existingRecord : editableRecord;
    const effectiveImages = images.length > 0 ? images : normalizeArray(mediaFallbackRecord?.images);
    const effectiveAttachments = quoteAttachments.length > 0 ? quoteAttachments : normalizeArray(mediaFallbackRecord?.attachments);
    const effectiveVideos = completionVideos.length > 0 ? completionVideos : normalizeArray(editableRecord?.attachments);
    if (['4', '5', '6'].includes(recordType) && effectiveImages.length < 3) {
      throw new Error('施工准备、施工记录和完工验收阶段至少需要上传3张现场照片');
    }
    if (recordType === '6' && effectiveVideos.length === 0) {
      throw new Error('完工验收需要上传1段现场拍摄视频');
    }
    const roleName = currentRole === 'manager' ? '项目经理' : '现场师傅';
    const now = Date.now();
    const recordPayload = {
      order_id: orderId,
      record_type: recordType,
      content: content,
      images: effectiveImages,
      price: quotePrice,
      attachments: recordType === '6' ? effectiveVideos : effectiveAttachments,
      creator_name: roleName,
      creator_role: currentRole,
      creator_id: $w.app?.dataset?.state?.myEmployeeId,
      updatedAt: now
    };
    if (recordType === '2') {
      const quoteResult = await $w.cloud.callFunction({
        name: 'quote-workflow',
        data: {
          action: 'save_initial',
          orderId,
          actorId: $w.app?.dataset?.state?.myEmployeeId,
          expectedStatus: currentStatus,
          expectedQuoteVersion: orderRecord.quote_version === undefined || orderRecord.quote_version === null || orderRecord.quote_version === ''
            ? undefined
            : Number(orderRecord.quote_version),
          expectedQuoteUpdatedAt: getRecordTime(existingRecord || {}),
          expectedPrice: Number(orderRecord.total_price || 0),
          price: quotePrice,
          content: recordPayload.content,
          images: effectiveImages,
          attachments: effectiveAttachments,
          creatorName: roleName
        }
      });
      assertFunctionSaved(quoteResult, editableRecord?._id ? '报价修改失败' : '报价提交失败');
    } else {
      const saveRecordResult = await $w.cloud.callFunction({
        name: 'update-record',
        data: {
          collection: 'wo_records',
          docId: editableRecord?._id,
          orderId,
          recordType,
          upsert: true,
          forceCreate: shouldAppendRecord,
          allowedStatuses: [currentStatus],
          data: {
            ...recordPayload,
            createdAt: now
          }
        }
      });
      assertFunctionSaved(saveRecordResult, editableRecord?._id ? '流水记录更新失败' : '流水记录新增失败');
    }
    if (recordType !== '2' && newStatus !== currentStatus) {
      updateWorkorderParams.status = newStatus;
      updateWorkorderParams.updatedAt = now;
      const updateWorkorderResult = await $w.cloud.callDataSource({
        dataSourceName: 'workorders',
        methodName: 'wedaUpdate',
        params: updateWorkorderParams
      });
      assertSaved(updateWorkorderResult, '工单状态更新失败');
    }
    $w.utils.hideLoading();
    $w.utils.showToast({
      title: editableRecord?._id ? '修改已保存！' : (currentStatus === '30' ? '报价已提交！' : '流程已推进！'),
      icon: 'success'
    });
    $w.modal1?.close();
    try { $w.switch1?.setValue(false); } catch(e) {}
    try { $w.uploadImage1?.setValue([]); } catch(e) {}
    try { $w.uploadVideo1?.setValue([]); } catch(e) {}
    try { $w.textarea1?.setValue(''); } catch(e) {}
    try { $w.inputNumber1?.setValue(); } catch(e) {}
    try { $w.uploadFile1?.setValue([]); } catch(e) {}
    try { $w.dataView1?.refresh(); } catch(e) {}
    try { $w.listView1?.refresh(); } catch(e) {}
  } catch (e) {
    $w.utils.hideLoading();
    $w.utils.showModal({ title: '提交拦截', content: e.message, showCancel: false });
  }
}
