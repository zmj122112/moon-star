export default async function({event, data}) {
    // 1. 自动适配循环列表传过来的各种文件 ID 格式
    let fileId = data?.target || data;
    if (!fileId || typeof fileId !== 'string') return;
    fileId = fileId.trim(); 
    const lowerFileId = fileId.toLowerCase();
    const isVideo = /\.(mp4|mov|m4v|webm)(\?|$)/i.test(lowerFileId);
    const isCloudFile = fileId.startsWith('cloud://');
    // 🧠 核心大脑：精准识别当前是“电脑浏览器/PC编辑器”还是“手机微信端”
    const isWebEnv = typeof window !== 'undefined' && (typeof wx === 'undefined' || !wx.cloud);
    if (isWebEnv) {
        // ==================== 💻 电脑端（PC编辑器/管理后台）预览逻辑 ====================
        try {
            $w.utils.showLoading({ title: '正在生成电脑预览...' });
            
            let httpsUrl = fileId;
            if (isCloudFile) {
                const res = await $w.cloud.getTempFileURL({ fileList: [fileId] });
                httpsUrl = res[fileId];
                if (!httpsUrl && typeof res === 'object') {
                    for (let key in res) {
                        if (typeof res[key] === 'string' && res[key].startsWith('http')) {
                            httpsUrl = res[key]; break;
                        }
                    }
                }
            }
            $w.utils.hideLoading(); 
            if (httpsUrl) {
                if (isVideo) {
                    const previewWindow = window.open('', '_blank');
                    if (previewWindow) {
                        previewWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>视频预览</title><style>body{margin:0;background:#000;display:flex;align-items:center;justify-content:center;min-height:100vh;}video{max-width:100vw;max-height:100vh;}</style></head><body><video src="${httpsUrl}" controls autoplay></video></body></html>`);
                        previewWindow.document.close();
                    } else {
                        window.open(httpsUrl, '_blank');
                    }
                } else {
                    window.open(httpsUrl, '_blank'); // 电脑端新标签页直接打开
                }
            } else {
                throw new Error("未能提取到有效的公网链接");
            }
        } catch (error) {
            $w.utils.hideLoading();
            $w.utils.showModal({ title: '电脑端解析异常', content: String(error.message || error), showCancel: false });
        }
        
        return; // 🎯 电脑端执行完直接拦截退出，绝不往下走手机端 API
    }
    // ==================== 📱 手机端（微信小程序）原生直连绿色通道 ====================
    try {
        $w.utils.showLoading({ title: '正在安全下载...' });
        // 初始化微信云开发环境
        wx.cloud.init({ env: 'waterproof-3g9f7h9kdb626bb3', traceUser: false });
        const handleDownloadedFile = (tempFilePath) => {
            if (!tempFilePath) {
                $w.utils.hideLoading();
                $w.utils.showToast({ title: '文件缓存失败', icon: 'error' });
                return;
            }
            if (isVideo && typeof wx.previewMedia === 'function') {
                $w.utils.hideLoading();
                wx.previewMedia({
                    current: 0,
                    sources: [{ url: tempFilePath, type: 'video' }],
                    fail: () => {
                        $w.utils.showToast({ title: '视频暂时无法预览', icon: 'none' });
                    }
                });
                return;
            }
            $w.utils.showLoading({ title: '正在打开文档...' });
            wx.openDocument({
                filePath: tempFilePath,
                showMenu: true,
                success: () => $w.utils.hideLoading(),
                fail: () => {
                    $w.utils.hideLoading();
                    $w.utils.showToast({ title: '暂不支持预览该格式', icon: 'none' });
                }
            });
        };
        if (isCloudFile) {
            wx.cloud.downloadFile({
                fileID: fileId,
                success: function (downloadRes) {
                    handleDownloadedFile(downloadRes.tempFilePath);
                },
                fail: function(err) {
                    $w.utils.hideLoading();
                    $w.utils.showModal({ title: '微信云存储异常', content: JSON.stringify(err), showCancel: false });
                }
            });
            return;
        }
        wx.downloadFile({
            url: fileId,
            success: function(downloadRes) {
                handleDownloadedFile(downloadRes.tempFilePath);
            },
            fail: function(err) {
                $w.utils.hideLoading();
                $w.utils.showModal({ title: '公网附件下载异常', content: JSON.stringify(err), showCancel: false });
            }
        });
    } catch (error) {
        $w.utils.hideLoading();
        $w.utils.showModal({ title: '手机端执行异常', content: String(error.message || error), showCancel: false });
    }
}
