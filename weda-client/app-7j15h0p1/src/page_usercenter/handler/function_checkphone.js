export default async function({event, data}) {
  const phone = $w.page.dataset.state.phoneInput;
  if(!phone) {
    $w.utils.showToast({ title: '请输入手机号', icon: 'error' });
    return;
  }
  try {
    $w.utils.showLoading({ title: '正在核实身份...' });
    // 1. 获取用户信息
    const userInfo = await $w.auth.getUserInfo();
    const myOpenId = userInfo.openId || userInfo.openid;
    
    if (!myOpenId) {
      $w.utils.hideLoading();
      $w.utils.showModal({ title: '未检测到登录状态', content: '请授权后再进行验证。', showCancel: false });
      return;
    }
    // [ 第一把锁：拦截重复的微信 ]
    const openidCheckRes = await $w.cloud.callDataSource({
      dataSourceName: 'managers',
      methodName: 'wedaGetRecords',
      params: { where: [{ key: 'bind_openid', rel: 'eq', val: myOpenId }] }
    });
    if (openidCheckRes?.records?.length > 0) {
      $w.utils.hideLoading();
      $w.utils.showModal({ title: '绑定拦截', content: '您的微信已绑定过员工账号，请勿重复绑定。', showCancel: false });
      return; 
    }
    // 2. 查询手机号是否存在
    const res = await $w.cloud.callDataSource({
      dataSourceName: 'managers',
      methodName: 'wedaGetRecords',
      params: { where: [{ key: 'phone', rel: 'eq', val: phone }] }
    });
    if (res?.records?.length > 0) {
      const employee = res.records[0];
      // [ 第二把锁：拦截已被抢注的手机号 ]
      if (employee.bind_openid && employee.bind_openid !== myOpenId) {
        $w.utils.hideLoading();
        $w.utils.showModal({ title: '安全警告', content: '该手机号已被其他微信绑定！', showCancel: false });
        return; 
      }
      const recordId = employee._id; 
      const myRole = employee.role;
      // 3. 执行更新 (将微信OpenID绑定到该手机号名下)
      await $w.cloud.callDataSource({
        dataSourceName: 'managers',
        methodName: 'wedaUpdate',
        params: {
          _id: recordId,
          bind_openid: myOpenId
        }
      });
      $w.utils.hideLoading();
      $w.utils.showToast({ title: '身份绑定成功！', icon: 'success' });
      // 4. 🎯 【核心】：绑定成功后，立刻将 manager 表的 _id 存入全局口袋
      $w.app.dataset.state.myEmployeeId = recordId;
      
      $w.app.dataset.state.actualRole = myRole;       
      $w.app.dataset.state.globalRole = myRole;       
      $w.page.dataset.state.isStaff = true; 
      $w.page.dataset.state.showBindModal = false;   
      // 5. 跳转工作台
      setTimeout(() => {
        $w.app.navigateTo({ pageId: 'page_master_home' });
      }, 500);
    } else {
      $w.utils.hideLoading();
      $w.utils.showToast({ title: '查无此手机号', icon: 'error' });
    }
  } catch (error) {
    $w.utils.hideLoading();
    $w.utils.showModal({ title: '绑定失败', content: '原因：' + (error.message || '网络异常'), showCancel: false });
  }
}