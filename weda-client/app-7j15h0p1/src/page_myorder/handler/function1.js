export default async function({event, data}) {
    try {
        $w.utils.showLoading({ title: '提交评价中...' });
        // 1. 从“接力棒”页面变量里拿到刚刚点击的订单 ID
        const orderId = $w.page.dataset.state.current_review_order_id;
        if (!orderId) throw new Error("未获取到订单ID");
        // 2. 🎯 精准匹配您的组件 ID：拿弹窗里的星星和评语
        const rateStars = $w.rating1?.value; 
        const reviewText = $w.textarea1?.value || "客户默认好评";
        if (!rateStars || rateStars === 0) {
            throw new Error("请先点亮星星打分哦~");
        }
        // 3. 更新主表
        await $w.cloud.callDataSource({
            dataSourceName: 'workorders', 
            methodName: 'wedaUpdate',
            params: {
                _id: orderId,
                review_stars: Number(rateStars), 
                customer_review: reviewText      
            }
        });
        // 4. 记入流水账，留存记录
        await $w.cloud.callDataSource({
            dataSourceName: 'wo_records', 
            methodName: 'wedaCreate',
            params: {
                order_id: orderId,
                record_type: '客户评价',
                content: `客户已给出 ${rateStars} 星评价，评语：${reviewText}`,
                creator_name: '客户',
                creator_role: 'customer'
            }
        });
        $w.utils.hideLoading();
        $w.utils.showToast({ title: '感谢您的评价', icon: 'success' });
        
        // 5. 🎯 关弹窗 -> 清空残留数据 -> 刷新列表！
        $w.modal1?.close();
        
        // 归零重置，防止下次点开别的订单评价时还带着上一次的内容
        try { $w.rating1?.setValue(0); } catch(e){} 
        try { $w.textarea1?.setValue(''); } catch(e){}
        
        // 刷新外层的列表，让“去评价”的按钮自动消失
        setTimeout(() => {
            if ($w.listView1) $w.listView1.refresh();
        }, 500);
    } catch (e) {
        $w.utils.hideLoading();
        $w.utils.showModal({ title: '提交失败', content: e.message, showCancel: false });
    }
}