export default function({event}) {
    // 1. 尝试从点击事件里抓取当前这行订单的数据
    // (微搭的循环列表点击时，通常会把这行的数据绑在 currentTarget.dataset 或是 detail 里)
    const currentItem = event?.currentTarget?.dataset?.item || event?.detail;
    
    // 2. 提取这笔订单的唯一数据库 ID (_id)
    const orderId = currentItem?._id;
    if (!orderId) {
        console.log("未能抓取到订单ID，无法跳转");
        return;
    }
    // 3. 带着 ID 跳转到订单详情页！
    $w.utils.navigateTo({
        pageId: 'page_order_detail', // 跳转目标页面
        params: { id: orderId }      // 把订单 ID 当作包裹传过去
    });
}