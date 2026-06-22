const cloudbase = require('@cloudbase/node-sdk');
const crypto = require('crypto');

exports.main = async (event, context) => {
  console.log('=== login 云函数被调用 ===');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const db = app.database();
    
    const { phone, password } = event;
    
    console.log('登录参数:', { phone });
    
    if (!phone || !password) {
      return {
        code: 400,
        message: '缺少必要参数：手机号和密码为必填项'
      };
    }
    
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    
    const result = await db.collection('managers').where({
      phone: phone
    }).get();
    
    console.log('查询结果:', JSON.stringify(result));
    
    if (!result.data || result.data.length === 0) {
      return {
        code: 401,
        message: '手机号或密码错误'
      };
    }
    
    const user = result.data[0];
    
    if (!user.password) {
      return {
        code: 401,
        message: '该用户尚未设置密码，请联系管理员'
      };
    }
    
    if (user.password !== hashedPassword) {
      return {
        code: 401,
        message: '手机号或密码错误'
      };
    }
    
    const token = crypto.createHash('sha256').update(
      user._id + Date.now() + Math.random().toString()
    ).digest('hex');
    
    await db.collection('managers').doc(user._id).update({
      lastLoginAt: new Date().getTime(),
      token: token
    });
    
    let roles = [];
    if (Array.isArray(user.role)) {
      roles = user.role;
    } else if (typeof user.role === 'string') {
      try {
        const parsed = JSON.parse(user.role);
        roles = Array.isArray(parsed) ? parsed : [];
      } catch {
        const separator = user.role.includes(';') ? ';' : ',';
        roles = user.role.split(separator).map(r => {
          const trimmed = r.trim();
          if (trimmed.includes('管理员') || trimmed.includes('admin')) return '管理员(admin)';
          if (trimmed.includes('客服') || trimmed.includes('cs')) return '客服(cs)';
          if (trimmed.includes('工人') || trimmed.includes('worker')) return '施工工人(worker)';
          if (trimmed.includes('项目经理') || trimmed.includes('manager')) return '项目经理(manager)';
          return trimmed;
        }).filter(r => r);
      }
    }
    
    console.log('处理后的角色:', roles);
    
    const userInfo = {
      userId: user._id,
      name: user.name,
      phone: user.phone,
      department: user.department,
      role: roles,
      token: token,
      needChangePassword: user.needChangePassword ?? true
    };
    
    return {
      code: 200,
      message: '登录成功',
      data: userInfo
    };
    
  } catch (err) {
    console.error('登录失败:', err.message);
    console.error('错误堆栈:', err.stack);
    return {
      code: 500,
      message: '登录失败: ' + err.message,
      error: err.stack
    };
  }
};
