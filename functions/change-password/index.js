const cloudbase = require('@cloudbase/node-sdk');
const crypto = require('crypto');

const validateSelfIfTokenProvided = async (db, userId, token) => {
  if (!token) return { ok: true };

  const result = await db.collection('managers').doc(userId).get();
  const user = Array.isArray(result.data) ? result.data[0] : result.data;
  if (!user || user.token !== token) {
    return { ok: false, code: 401, message: '登录已过期，请重新登录' };
  }

  return { ok: true, user };
};

exports.main = async (event, context) => {
  console.log('=== change-password 云函数被调用 ===');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const db = app.database();
    
    const { userId, oldPassword, newPassword, token } = event;
    
    console.log('修改密码参数:', { userId });
    
    if (!userId || !oldPassword || !newPassword) {
      return {
        code: 400,
        message: '缺少必要参数'
      };
    }

    const authResult = await validateSelfIfTokenProvided(db, userId, token);
    if (!authResult.ok) {
      return {
        code: authResult.code,
        message: authResult.message
      };
    }
    
    const result = await db.collection('managers').doc(userId).get();
    const user = Array.isArray(result.data) ? result.data[0] : result.data;
    
    if (!user) {
      return {
        code: 404,
        message: '用户不存在'
      };
    }

    const hashedOldPassword = crypto.createHash('sha256').update(oldPassword).digest('hex');
    
    if (user.password !== hashedOldPassword) {
      return {
        code: 401,
        message: '当前密码不正确'
      };
    }
    
    const hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
    
    await db.collection('managers').doc(userId).update({
      password: hashedNewPassword,
      needChangePassword: false,
      updatedAt: new Date().getTime()
    });
    
    return {
      code: 200,
      message: '密码修改成功'
    };
    
  } catch (err) {
    console.error('修改密码失败:', err.message);
    return {
      code: 500,
      message: '修改密码失败: ' + err.message
    };
  }
};
