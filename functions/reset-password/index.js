const cloudbase = require('@cloudbase/node-sdk');
const crypto = require('crypto');

exports.main = async (event, context) => {
  console.log('=== reset-password 云函数被调用 ===');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const db = app.database();
    
    const { userId, phone } = event;
    
    console.log('重置密码参数:', { userId, phone });
    
    if (!userId && !phone) {
      return {
        code: 400,
        message: '缺少必要参数：userId或phone'
      };
    }
    
    let user;
    if (userId) {
      const result = await db.collection('managers').doc(userId).get();
      if (!result.data || result.data.length === 0) {
        return {
          code: 404,
          message: '用户不存在'
        };
      }
      user = result.data[0];
    } else {
      const result = await db.collection('managers').where({ phone }).get();
      if (!result.data || result.data.length === 0) {
        return {
          code: 404,
          message: '用户不存在'
        };
      }
      user = result.data[0];
    }
    
    const defaultPassword = user.phone.slice(-6);
    const hashedPassword = crypto.createHash('sha256').update(defaultPassword).digest('hex');
    
    await db.collection('managers').doc(user._id).update({
      password: hashedPassword,
      needChangePassword: true,
      updatedAt: new Date().getTime()
    });
    
    return {
      code: 200,
      message: '密码重置成功，新密码为手机号后六位',
      data: {
        phone: user.phone,
        defaultPassword: defaultPassword
      }
    };
    
  } catch (err) {
    console.error('重置密码失败:', err.message);
    return {
      code: 500,
      message: '重置密码失败: ' + err.message
    };
  }
};