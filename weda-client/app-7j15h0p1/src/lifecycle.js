/**
 * 可通过 app 获取或修改全局应用的 变量 状态 等信息
 * 具体可以console.info 在编辑器Console面板查看更多信息
 * 如果需要 async-await，请在方法前 async
 * 生命周期文档请参考：https://cloud.tencent.com/document/product/1301/71504
 **/
export default {
  onAppLaunch(launchOpts) {
    //console.log('---------> LifeCycle onAppLaunch', launchOpts)
  },
  onAppShow(appShowOpts) {
    //console.log('---------> LifeCycle onAppShow', appShowOpts)
  },
  onAppHide() {
    //console.log('---------> LifeCycle onAppHide')
  },
  onAppError(options) {
    //console.log('---------> LifeCycle onAppError', options)
  },
  onAppPageNotFound(options) {
    //console.log('---------> LifeCycle onAppPageNotFound', options)
  },
  onAppUnhandledRejection(options) {
    //console.log('---------> LifeCycle onAppUnhandledRejection', options)
  }
}