export default function({event, data}) { 
  
  // 1. 从事件传参中提取“背包”数据
  const currentItem = data.target;
  
  if (!currentItem || !currentItem.recordId) {
    console.error("【传参失败】当前收到的数据：", data);
    $w.utils.showToast({ title: '请先在右侧配置【事件传参】', icon: 'error' });
    return;
  }
  // 2. 取出核心数据
  const recordId = currentItem.recordId;
  const photoIdx = currentItem.originalIndex;
  let rawImages = currentItem.rawImages;
  // 3. 深拷贝，脱离只读保护
  let currentImages = [];
  if (typeof rawImages === 'string') {
    try { currentImages = JSON.parse(rawImages); } 
    catch (e) { currentImages = [rawImages]; }
  } else if (Array.isArray(rawImages)) {
    currentImages = JSON.parse(JSON.stringify(rawImages));
  } else if (rawImages) {
    currentImages = [JSON.parse(JSON.stringify(rawImages))];
  }
  // 4. 获取开关被拨动后的最新状态 (true 或 false)
  const newStatus = event.detail.value;
  // 5. 定点修改照片数组
  let targetImg = currentImages[photoIdx];
  if (typeof targetImg === 'string') {
    currentImages[photoIdx] = { url: targetImg, visible: newStatus };
  } else if (targetImg) {
    currentImages[photoIdx].visible = newStatus;
  }
  // 6. 🚨 终极绝杀：完全复刻您 PC 端的云函数调用逻辑，绕开前端权限拦截！
  $w.cloud.callFunction({
    name: 'update-record', // 严格对应您后台使用的云函数名称
    data: {
      collection: 'wo_records', // 表名
      docId: recordId,          // 要修改的单子ID
      data: {
        images: currentImages,
        updateTime: new Date().getTime() // 顺手打上更新时间，和 PC 端保持一致
      }
    }
  }).then((res) => {
    // 检查云函数是否真正返回成功 (对应您源码里的 result.result.success 判断)
    if (res && res.result && (res.result.success || res.result.code === 0 || !res.result.error)) {
      $w.utils.showToast({ title: newStatus ? '已对客户公开' : '已对客户隐藏', icon: 'success' });
      
      // 静默刷新，让图片上的遮罩实时消失/出现
      if ($w.query_kance && typeof $w.query_kance.load === 'function') $w.query_kance.load();
      if ($w.query_shigong && typeof $w.query_shigong.load === 'function') $w.query_shigong.load();
    } else {
      console.error("云函数执行异常返回：", res);
      $w.utils.showToast({ title: '修改失败，请联系管理员', icon: 'error' });
    }
  }).catch((error) => {
    console.error("调用云函数失败：", error);
    $w.utils.showToast({ title: '网络异常，请重试', icon: 'error' });
  });
}