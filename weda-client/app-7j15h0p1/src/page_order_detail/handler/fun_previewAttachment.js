export default async function({event, data}) {
    const fileItem = data || event?.detail;
    if (!fileItem || !fileItem.target) {
        $w.utils.showToast({ title: '未找到目标文件', icon: 'error' });
        return;
    }
    const fileUrl = String(fileItem.target || '').trim();
    const isVideo = /\.(mp4|mov|m4v|webm)(\?|$)/i.test(fileUrl.toLowerCase());
    const isCloudFile = fileUrl.startsWith('cloud://');
    try {
        $w.utils.showLoading({ title: '正在安全下载...' });
        // 🛡️ 微信云开发环境初始化（确保连通）
        if (typeof wx !== 'undefined' && wx.cloud) {
            wx.cloud.init({ env: 'waterproof-3g9f7h9kdb626bb3', traceUser: false });
        } else {
            throw new Error("请在微信小程序环境内打开预览");
        }
        const handleDownloadedFile = (tempFilePath) => {
            if (!tempFilePath) {
                $w.utils.hideLoading();
                $w.utils.showToast({ title: '文件下载失败', icon: 'error' });
                return;
            }
            if (isVideo && typeof wx.previewMedia === 'function') {
                $w.utils.hideLoading();
                wx.previewMedia({
                    current: 0,
                    sources: [{ url: tempFilePath, type: 'video' }],
                    fail: function () {
                        $w.utils.showToast({ title: '视频暂时无法预览', icon: 'error' });
                    }
                });
                return;
            }
            $w.utils.showLoading({ title: '正在打开文件...' });
            wx.openDocument({
                filePath: tempFilePath,
                showMenu: true,
                success: function () {
                    $w.utils.hideLoading();
                },
                fail: function () {
                    $w.utils.hideLoading();
                    $w.utils.showToast({ title: '暂不支持预览该格式', icon: 'error' });
                }
            });
        };
        if (isCloudFile) {
            wx.cloud.downloadFile({
                fileID: fileUrl,
                success: function (res) {
                    handleDownloadedFile(res.tempFilePath);
                },
                fail: function (err) {
                    $w.utils.hideLoading();
                    $w.utils.showModal({ 
                        title: '下载失败', 
                        content: '微信云存储通道异常：' + JSON.stringify(err), 
                        showCancel: false 
                    });
                }
            });
            return;
        }
        wx.downloadFile({
            url: fileUrl,
            success: function (res) {
                handleDownloadedFile(res.tempFilePath);
            },
            fail: function (err) {
                $w.utils.hideLoading();
                $w.utils.showModal({
                    title: '下载失败',
                    content: '公网附件下载异常：' + JSON.stringify(err),
                    showCancel: false
                });
            }
        });
    } catch (e) {
        $w.utils.hideLoading();
        $w.utils.showModal({ 
            title: '❌ 运行报错', 
            content: e.message || String(e), 
            showCancel: false 
        });
    }
}
