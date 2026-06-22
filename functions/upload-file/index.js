const cloudbase = require('@cloudbase/node-sdk');
const fs = require('fs');
const path = require('path');

exports.main = async (event, context) => {
  console.log('=== upload-file 云函数被调用 ===');
  console.log('CloudBase SDK 版本:', cloudbase.version || '未知');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const { fileName, fileContent, folder, userId, token } = event;
    
    console.log('参数:', { fileName, folder, fileContentLength: fileContent?.length });
    
    if (!fileName || !fileContent || !folder) {
      return {
        success: false,
        message: '缺少必要参数'
      };
    }

    if (token) {
      const db = app.database();
      const result = await db.collection('managers').doc(userId).get();
      const user = Array.isArray(result.data) ? result.data[0] : result.data;
      if (!user || user.token !== token) {
        return {
          success: false,
          message: '登录已过期，请重新登录'
        };
      }
    }

    const fullFileName = `${folder}/${Date.now()}_${fileName}`;
    console.log('目标路径:', fullFileName);
    
    const buffer = Buffer.from(fileContent, 'base64');
    console.log('Buffer 长度:', buffer.length);
    
    const result = await app.uploadFile({
      cloudPath: fullFileName,
      fileContent: buffer
    });

    console.log('上传结果:', JSON.stringify(result));

    const fileUrl = `cloud://waterproof-3g9f7h9kdb626bb3-1257706342/${fullFileName}`;

    return {
      success: true,
      url: fileUrl,
      message: '上传成功'
    };
  } catch (error) {
    console.error('上传失败:', error.message);
    console.error('错误堆栈:', error.stack);
    return {
      success: false,
      message: error.message || '上传失败'
    };
  }
};
