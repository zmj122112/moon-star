/**
 * 格式化单条记录的照片数组（带背包策略版）
 * @param {any} images - 传入单条记录的 images 字段
 * @param {string} recordId - 🚨新增：传入这条记录的真实数据库ID
 * @returns {Object[]}
 */
export default function(images, recordId) { // 接收两个参数
  if (!images) return [];
  let rawImagesCopy = images; // 保存最原始的大数组，一会放进背包里
  if (typeof images === 'string') {
    try {
      images = images.trim().startsWith('[') ? JSON.parse(images) : [images];
    } catch (e) {
      return [];
    }
  }
  if (!Array.isArray(images)) images = [images];
  let allPhotos = [];
  
  images.forEach((img, index) => {
    if (!img) return;
    
    let finalUrl = '';
    let isVisible = true; 
    if (typeof img === 'string') {
      finalUrl = img;
    } else {
      finalUrl = img.url;
      isVisible = img.visible !== false; 
    }
    
    if (finalUrl && typeof finalUrl === 'string') {
      if (finalUrl.startsWith('cloud://')) {
        let pathWithoutPrefix = finalUrl.replace('cloud://', '');
        let firstSlashIndex = pathWithoutPrefix.indexOf('/');
        let filePath = firstSlashIndex !== -1 ? pathWithoutPrefix.substring(firstSlashIndex + 1) : pathWithoutPrefix;
        finalUrl = 'https://7761-waterproof-3g9f7h9kdb626bb3-1257706342.tcb.qcloud.la/' + filePath;
      }
      
      // 🎒 核心操作：给每张照片背上自己的索引、单子ID、和原数组
      allPhotos.push({ 
        url: finalUrl, 
        visible: isVisible,
        originalIndex: index,
        recordId: recordId,     // <--- 把外层的ID装进来
        rawImages: rawImagesCopy // <--- 把原始数据装进来
      });
    }
  });
  return allPhotos; 
}