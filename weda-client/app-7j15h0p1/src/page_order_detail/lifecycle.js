/*
* 可通过 $page 获取或修改当前页面的 变量 状态 handler lifecycle 等信息
* 可通过 app 获取或修改全局应用的 变量 状态 等信息
* 具体可以 console.info 在编辑器Console面板查看更多信息
* 如果需要 async-await，请在方法前 async
* 生命周期文档请参考：https://cloud.tencent.com/document/product/1301/71504
*/
async function refreshPageData() {
  try {
    if ($w.query1 && typeof $w.query1.trigger === 'function') await $w.query1.trigger();
    if ($w.dataView1 && typeof $w.dataView1.refresh === 'function') $w.dataView1.refresh();
    
  } catch (e) {
    console.warn('页面刷新失败:', e);
  }
  try {
    if (typeof wx !== 'undefined' && typeof wx.stopPullDownRefresh === 'function') {
      wx.stopPullDownRefresh();
    }
  } catch (e) {
    console.warn('停止下拉刷新失败:', e);
  }
}
export default {
  onPageLoad(query) {
    //console.log('---------> LifeCycle onPageLoad', query)
  },
  async onPageShow() {
    await refreshPageData();
  },
  onPageReady() {
    //console.log('---------> LifeCycle onPageReady')
  },
  onPageHide() {
    //console.log('---------> LifeCycle onPageHide')
  },
  onPageUnload() {
    //console.log('---------> LifeCycle onPageUnload')
  },
  async onPullDownRefresh() {
    await refreshPageData();
  },
}