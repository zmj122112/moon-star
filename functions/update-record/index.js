const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: 'waterproof-3g9f7h9kdb626bb3'
});

const db = app.database();

exports.main = async (event, context) => {
  const { collection, docId, data } = event;
  
  console.log('收到更新请求:', { collection, docId, data });
  
  try {
    const res = await db.collection(collection).doc(docId).update(data);
    console.log('更新结果:', res);
    
    return {
      success: true,
      message: '更新成功',
      data: res
    };
  } catch (error) {
    console.error('更新失败:', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};