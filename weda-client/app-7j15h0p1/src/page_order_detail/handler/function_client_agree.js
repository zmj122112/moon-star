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
    console.log("【点击事件已触发】开始执行同意逻辑...");
    try {
        // 1. 兜底获取参数（双保险）
        const orderId = $w.page.dataset.params.record_id || $w.page.dataset.params._id; 
        if (!orderId) throw new Error("订单ID丢失，请返回列表重新进入");
        // 2. 安全获取状态和价格
        let currentStatus = '';
        let price = 0;
        let quoteVersion;
        if ($w.query1 && $w.query1.data) {
            currentStatus = String($w.query1.data.status); // 强制转字符串防止类型错乱
            if ($w.query1.data.quote_version !== undefined && $w.query1.data.quote_version !== null && $w.query1.data.quote_version !== '') {
                quoteVersion = Number($w.query1.data.quote_version);
            }
            if ($w.query1.data.total_price) {
                price = Number($w.query1.data.total_price);
            }
        }
        const latestQuoteRecord = getLatestQuoteRecord();
        const expectedQuoteUpdatedAt = getRecordTime(latestQuoteRecord || {});
        if (!currentStatus) throw new Error("页面数据未加载完毕，请稍后再试");
        if (currentStatus === '80' && Number($w.query1?.data?.accepted_price) > 0) {
            price = Number($w.query1.data.accepted_price);
        }
        // ---------------- [ 逻辑 A：同意初始报价 ] ----------------
        if (currentStatus === '40') {
            const isConfirm = await new Promise((resolve) => {
                $w.utils.showModal({
                    title: '确认维修方案',
                    content: `总价为 ${price} 元。确认同意并安排进场施工吗？`,
                    showCancel: true,
                    success: (res) => resolve(res.confirm),
                    fail: () => resolve(false)
                });
            });
            if (!isConfirm) return; 
            $w.utils.showLoading({ title: '处理中...' });
            
            const agreeResult = await $w.cloud.callFunction({
                name: 'quote-workflow',
                data: {
                    action: 'accept_initial',
                    orderId,
                    expectedStatus: currentStatus,
                    expectedQuoteVersion: quoteVersion,
                    expectedQuoteUpdatedAt: expectedQuoteUpdatedAt > 0 ? expectedQuoteUpdatedAt : undefined,
                    expectedPrice: price
                }
            });
            const agreePayload = agreeResult?.result || agreeResult;
            if (!agreePayload?.success) throw new Error(agreePayload?.message || '确认报价失败');
            $w.utils.showToast({ title: '已确认，师傅将尽快上门！', icon: 'success' });
        // ---------------- [ 💡 新增 逻辑 E：同意施工中现场变更报价 ] ----------------
        } else if (currentStatus === '65') {
            const isConfirm = await new Promise((resolve) => {
                $w.utils.showModal({
                    title: '确认施工变更方案',
                    content: `调整后的最新总价为 ${price} 元。确认同意此变更并让师傅继续施工吗？`,
                    showCancel: true,
                    success: (res) => resolve(res.confirm),
                    fail: () => resolve(false)
                });
            });
            if (!isConfirm) return; 
            $w.utils.showLoading({ title: '处理中...' });
            
            const changeAgreeResult = await $w.cloud.callFunction({
                name: 'quote-workflow',
                data: {
                    action: 'accept_change',
                    orderId,
                    expectedStatus: currentStatus,
                    expectedQuoteVersion: quoteVersion,
                    expectedQuoteUpdatedAt: expectedQuoteUpdatedAt > 0 ? expectedQuoteUpdatedAt : undefined,
                    expectedPrice: price
                }
            });
            const changeAgreePayload = changeAgreeResult?.result || changeAgreeResult;
            if (!changeAgreePayload?.success) throw new Error(changeAgreePayload?.message || '确认变更报价失败');
            $w.utils.showToast({ title: '变更已确认，师傅继续施工！', icon: 'success' });
        // ---------------- [ 逻辑 B：完工验收 ] ----------------
        } else if (currentStatus === '70') {
            const isConfirm = await new Promise((resolve) => {
                $w.utils.showModal({
                    title: '确认完工验收',
                    content: '请确认现场施工已完成且合格。确认后将进入支付环节。',
                    showCancel: true,
                    success: (res) => resolve(res.confirm),
                    fail: () => resolve(false)
                });
            });
            if (!isConfirm) return;
            $w.utils.showLoading({ title: '处理中...' });
            await $w.cloud.callDataSource({
                dataSourceName: 'workorders',
                methodName: 'wedaUpdate',
                params: { _id: orderId, status: '80' } 
            });
            await $w.cloud.callDataSource({
                dataSourceName: 'wo_records',
                methodName: 'wedaCreate',
                params: {
                    order_id: orderId,
                    record_type: '9', 
                    content: '客户已在线确认完工验收，准备支付尾款',
                    creator_name: '业主/客户', 
                    creator_role: 'client'
                }
            });
            $w.utils.showToast({ title: '验收成功，请支付尾款', icon: 'success' });
        // ---------------- [ 逻辑 C：全自动微信支付直连 ] ----------------
        } else if (currentStatus === '80') {
            if (price <= 0) throw new Error("订单金额异常，无法发起支付");
            $w.utils.showLoading({ title: '连接支付中...' });
            if (typeof wx === 'undefined' || !wx.cloud) {
                throw new Error("请用手机微信扫码打开，才能使用微信支付功能");
            }
            wx.cloud.init({ env: 'waterproof-3g9f7h9kdb626bb3', traceUser: false });
            const payRes = await wx.cloud.callFunction({
                name: 'wxpayFunctions',
                data: {
                    type: 'wxpay_order',
                    out_trade_no: orderId,
                    description: '月星防水维修尾款', 
                    amount: { total: parseInt(price * 100), currency: 'CNY' }
                }
            });
            const paymentData = payRes && payRes.result && payRes.result.data;
            if (!paymentData || !paymentData.paySign) {
                throw new Error("微信下单失败: " + JSON.stringify(payRes.result));
            }
            try { $w.utils.hideLoading(); } catch(e){}
            await wx.requestPayment({
                timeStamp: paymentData.timeStamp,
                nonceStr: paymentData.nonceStr,
                package: paymentData.packageVal,
                signType: paymentData.signType || 'RSA',
                paySign: paymentData.paySign
            });
            $w.utils.showLoading({ title: '正在结单...' });
            await $w.cloud.callDataSource({
                dataSourceName: 'workorders',
                methodName: 'wedaUpdate',
                params: { _id: orderId, status: '90' }
            });
            await $w.cloud.callDataSource({
                dataSourceName: 'wo_records',
                methodName: 'wedaCreate',
                params: {
                    order_id: orderId,
                    record_type: '10', 
                    content: '尾款已支付，订单圆满完成，进入质保期。',
                    creator_name: '系统自动', 
                    creator_role: 'system'
                }
            });
            $w.utils.showToast({ title: '付款成功！', icon: 'success' });
        } else {
            throw new Error("当前状态不可操作（" + currentStatus + "）");
        }
        // ================================================================
        // 🔄 统一抽取的终极安全刷新逻辑（无论是哪个节点成功，都会执行这里）
        // ================================================================
        if ($w.query1) { 
            $w.utils.showLoading({ title: '同步最新状态...' });
            await new Promise(resolve => setTimeout(resolve, 800)); // 等待数据库写入完成
            
            try { 
                if (typeof $w.query1.load === 'function') {
                    await $w.query1.load(); 
                } else if (typeof $w.query1.trigger === 'function') {
                    await $w.query1.trigger();
                }
            } catch(e) {
                console.warn("数据拉取警告:", e);
            } 
            
            try { if ($w.dataView1 && typeof $w.dataView1.refresh === 'function') $w.dataView1.refresh(); } catch(e) {}
            $w.utils.hideLoading(); 
        }
    } catch (e) {
        try { $w.utils.hideLoading(); } catch (err) {}
        if (e.message && (e.message.includes('cancel') || e.message.includes('取消'))) {
            $w.utils.showToast({ title: '您已取消操作', icon: 'none' });
        } else {
            $w.utils.showModal({ title: '操作被拦截', content: e.message || String(e), showCancel: false });
        }
    }
}
