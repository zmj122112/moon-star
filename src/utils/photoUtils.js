/**
 * 照片数据结构处理工具
 * 支持两种格式：
 * 1. 旧格式：纯字符串数组 ['url1', 'url2']
 * 2. 新格式：对象数组 [{ url: 'url1', visible: true }, { url: 'url2', visible: false }]
 */

/**
 * 标准化照片数据格式
 * @param {Array} photos - 照片数据（可能是旧格式或新格式）
 * @returns {Array} 标准化后的照片对象数组
 */
export function normalizePhotos(photos) {
  if (!photos || !Array.isArray(photos)) {
    return [];
  }
  
  return photos.map(photo => {
    if (typeof photo === 'string') {
      // 旧格式：转换为新格式，默认可见
      return {
        url: photo,
        visible: true
      };
    }
    // 新格式：保留原样，确保有默认值
    return {
      url: photo.url || '',
      visible: photo.visible !== false // 默认可见
    };
  });
}

/**
 * 获取可见照片的URL列表
 * @param {Array} photos - 照片数据
 * @returns {Array} 可见照片的URL数组
 */
export function getVisiblePhotoUrls(photos) {
  const normalized = normalizePhotos(photos);
  return normalized
    .filter(photo => photo.visible)
    .map(photo => photo.url);
}

/**
 * 更新照片可见性
 * @param {Array} photos - 原始照片数据
 * @param {number} index - 要更新的照片索引
 * @param {boolean} visible - 是否可见
 * @returns {Array} 更新后的照片数据
 */
export function updatePhotoVisibility(photos, index, visible) {
  const normalized = normalizePhotos(photos);
  if (index >= 0 && index < normalized.length) {
    normalized[index].visible = visible;
  }
  return normalized;
}

/**
 * 添加新照片
 * @param {Array} photos - 原始照片数据
 * @param {string|Array} newPhotos - 要添加的照片URL或URL数组
 * @param {boolean} [visible=true] - 新照片是否默认可见
 * @returns {Array} 更新后的照片数据
 */
export function addPhotos(photos, newPhotos, visible = true) {
  const normalized = normalizePhotos(photos);
  const toAdd = Array.isArray(newPhotos) ? newPhotos : [newPhotos];
  
  toAdd.forEach(url => {
    if (url) {
      normalized.push({ url, visible });
    }
  });
  
  return normalized;
}

/**
 * 转换为向后兼容的格式（用于存储）
 * @param {Array} photos - 照片对象数组
 * @param {boolean} [forceObjectFormat=false] - 是否强制使用对象格式
 * @returns {Array} 存储用的照片数据
 */
export function formatForStorage(photos, forceObjectFormat = true) {
  const normalized = normalizePhotos(photos);
  
  if (forceObjectFormat) {
    // 总是存储为对象格式
    return normalized;
  }
  
  // 检查是否所有照片都是可见的，如果是可以用旧格式存储
  const allVisible = normalized.every(p => p.visible);
  if (allVisible) {
    return normalized.map(p => p.url);
  }
  
  return normalized;
}
