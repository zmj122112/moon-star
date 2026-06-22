/**
 * 提取过滤可见照片，并打包成“朋友圈动态”格式
 * 返回格式: [{ time: '...', creator: '...', content: '...', photos: [{url: '...'}] }]
 */
export default function(records) {
  if (!records || !Array.isArray(records)) {
    return [];
  }
  let resultList = [];
  records.forEach(record => {
    let images = record.images;
    if (!images) return; 
    // 1. 拆解照片
    if (typeof images === 'string') {
      try {
        images = images.trim().startsWith('[') ? JSON.parse(images) : [images];
      } catch (e) {
        return;
      }
    }
    if (!Array.isArray(images)) images = [images];
    // 2. 筛选出这张记录里【可见】的照片
    let visiblePhotos = [];
    images.forEach(img => {
      if (!img) return;
      let finalUrl = typeof img === 'string' ? img : (img.visible ? img.url : '');
      if (finalUrl && typeof finalUrl === 'string') {
        // 直接保留 cloud:// 原生路径给微搭处理
        visiblePhotos.push({ url: finalUrl });
      }
    });
    // 3. 🚨核心升级：只要这条记录里有可见的照片，就把整条动态打包存起来！
    if (visiblePhotos.length > 0) {
      // 格式化时间
      let timeStr = '未知时间';
      if (record.createdAt) {
        const date = new Date(record.createdAt);
        timeStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      }
      resultList.push({
        _id: record._id,
        time: timeStr, // 例如：2026-05-25 14:30
        creator: record.creator_name || (record.creator_role === 'manager' ? '项目经理' : '工作人员'),
        content: record.content || '未填写文字备注',
        photos: visiblePhotos // 这条记录专属的可见照片数组
      });
    }
  });
  return resultList; // 返回完整的动态列表
}