export default async function({event}) {
    // 1. 拿到官方替我们解密好的真金白银包裹
    const info = event?.detail;
    if (!info || !info.phoneNumber) {
        $w.utils.showToast({ title: '未能读取到号码', icon: 'error' });
        return;
    }
    $w.utils.showLoading({ title: '极速登录中...' });
    try {
        // 2. 走最纯正的静默登录，拿到底层 OpenID 的合法身份
        await $w.auth.signIn({ loginType: 'wechat' });
        // 3. 🌟 偷天换日核心逻辑：把明文号码写进你的“私有保险箱”！
        const realPhone = info.phoneNumber;
        
        // 存入微搭全局变量（当前运行可用）
        $w.app.dataset.userPhone = realPhone; 
        
        // 存入微信本地物理缓存（杀掉小程序再进依然可用）
        if (typeof wx !== 'undefined') {
            wx.setStorageSync('userPhone', realPhone);
        }
        $w.utils.hideLoading();
        $w.utils.showToast({ title: '登录成功！', icon: 'success' });
        // 4. 刷新页面，让界面亮起来！
        setTimeout(() => {
            $w.utils.navigateTo({ pageId: 'page_usercenter', type: 'reLaunch' });
        }, 1000);
    } catch (error) {
        $w.utils.hideLoading();
        $w.utils.showModal({ 
            title: '登录异常', 
            content: error.message || JSON.stringify(error),
            showCancel: false
        });
    }
}