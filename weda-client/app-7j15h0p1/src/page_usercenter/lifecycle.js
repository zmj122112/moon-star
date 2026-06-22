export default {
    onPageShow() {
        // 页面每次显示时，自动去本地缓存里找手机号
        if (typeof wx !== 'undefined') {
            const cachedPhone = wx.getStorageSync('userPhone');
            if (cachedPhone) {
                // 如果缓存里有，就立刻装进全局变量，让页面亮起来！
                $w.app.dataset.userPhone = cachedPhone;
            }
        }
    }
}