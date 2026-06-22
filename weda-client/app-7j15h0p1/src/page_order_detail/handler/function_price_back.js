const normalizeArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
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
const getLatestQuoteRecord = () => {
    return normalizeArray($w.listView1?.records)
        .filter((record) => String(record?.record_type) === '2')
        .sort((a, b) => getRecordTime(b) - getRecordTime(a))[0];
};
export default async function({event, data}) {
    // 1. 精准抓取工单主表的 ID
    let currentOrderId = $w.page.dataset.params?.record_id || $w.page.dataset.params?._id || $w.dataView1?.record?._id || $w.dataView1?.record?.order_id || $w.page.dataset.params?.id || $w.page.dataset.state?.orderId;
    if (!currentOrderId) {
        $w.utils.showToast({ title: '未能获取正确的订单ID', icon: 'error' });
        return;
    }
    // 🎯 核心新增：安全抓取当前工单的真实状态
    let currentStatus = String($w.dataView1?.record?.status || $w.query1?.data?.status || '');
    const currentPrice = Number($w.dataView1?.record?.total_price || $w.query1?.data?.total_price || 0);
    const quoteVersion = $w.dataView1?.record?.quote_version !== undefined && $w.dataView1?.record?.quote_version !== null && $w.dataView1?.record?.quote_version !== ''
        ? Number($w.dataView1.record.quote_version)
        : ($w.query1?.data?.quote_version !== undefined && $w.query1?.data?.quote_version !== null && $w.query1?.data?.quote_version !== ''
            ? Number($w.query1.data.quote_version)
            : undefined);
    const latestQuoteRecord = getLatestQuoteRecord();
    const expectedQuoteUpdatedAt = getRecordTime(latestQuoteRecord || {});
    // 🧠 核心智能分流逻辑：
    // 如果是施工中二次变更报价(65)被退回 -> 返回 60(施工中)，让工人重新发方案
    // 如果是初始报价被退回 -> 返回原先设定的 30 状态
    const modalContent = currentStatus === '65' ? '退回后，现场师傅将会收到通知，并为您重新调整现场施工方案与变更价格。' : '退回后，项目经理将会收到通知，并为您重新调整维修方案和价格。';
    $w.utils.showModal({
        title: '确认退回报价？',
        content: modalContent,
        showCancel: true,
        success: async (res) => {
            if (res.confirm) {
                try {
                    $w.utils.showLoading({ title: '正在退回...' });
                    const backResult = await $w.cloud.callFunction({
                        name: 'quote-workflow',
                        data: {
                            action: currentStatus === '65' ? 'reject_change' : 'reject_initial',
                            orderId: currentOrderId,
                            expectedStatus: currentStatus,
                            expectedQuoteVersion: quoteVersion,
                            expectedQuoteUpdatedAt: expectedQuoteUpdatedAt > 0 ? expectedQuoteUpdatedAt : undefined,
                            expectedPrice: currentPrice
                        }
                    });
                    const backPayload = backResult?.result || backResult;
                    if (!backPayload?.success) throw new Error(backPayload?.message || '退回报价失败');
                    $w.utils.hideLoading();
                    $w.utils.showToast({ title: '退回成功', icon: 'success' });
                    // 4. 🔄 强力安全刷新：保证页面和数据容器状态同步，按钮实时隐退
                    if ($w.query1) {
                        await new Promise(resolve => setTimeout(resolve, 800));
                        try {
                            if (typeof $w.query1.load === 'function') await $w.query1.load();
                            else if (typeof $w.query1.trigger === 'function') await $w.query1.trigger();
                        } catch(e) {}
                    }
                    if ($w.dataView1 && typeof $w.dataView1.refresh === 'function') {
                        $w.dataView1.refresh();
                    }
                } catch (error) {
                    $w.utils.hideLoading();
                    $w.utils.showModal({ title: '操作失败', content: error.message, showCancel: false });
                }
            }
        }
    });
}
