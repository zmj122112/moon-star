export default function({event}) {
    $w.app.dataset.userPhone = ''; // 清空全局变量
    if (typeof wx !== 'undefined') {
        wx.removeStorageSync('userPhone'); // 清空本地缓存
    }
    $w.utils.showToast({ title: '已退出' });
}