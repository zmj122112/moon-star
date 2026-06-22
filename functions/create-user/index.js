const cloudbase = require('@cloudbase/node-sdk');
const crypto = require('crypto');

const parseRoles = (role) => {
  if (Array.isArray(role)) return role.map(String);
  if (typeof role === 'string') {
    try {
      const parsed = JSON.parse(role);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {}
    return role.split(role.includes(';') ? ';' : ',').map(r => r.trim()).filter(Boolean);
  }
  return [];
};

const validateAdminIfTokenProvided = async (db, operatorId, operatorToken) => {
  if (!operatorToken) return { ok: true };

  const result = await db.collection('managers').doc(operatorId).get();
  const operator = Array.isArray(result.data) ? result.data[0] : result.data;
  if (!operator || operator.token !== operatorToken) {
    return { ok: false, code: 401, message: '登录已过期，请重新登录' };
  }

  const isAdmin = parseRoles(operator.role).some(role => role.includes('admin') || role.includes('管理员'));
  if (!isAdmin) {
    return { ok: false, code: 403, message: '无权限执行该操作' };
  }

  return { ok: true };
};

exports.main = async (event, context) => {
  console.log('=== create-user 云函数被调用 ===');
  console.log('CloudBase SDK 版本:', cloudbase.version || '未知');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const db = app.database();
    
    const { phone, name, department, role, password, operatorId, operatorToken } = event;
    
    console.log('参数:', { phone, name, department, role });
    
    if (!phone || !name) {
      return {
        code: 400,
        message: '缺少必要参数：手机号和姓名为必填项'
      };
    }

    const authResult = await validateAdminIfTokenProvided(db, operatorId, operatorToken);
    if (!authResult.ok) {
      return {
        code: authResult.code,
        message: authResult.message
      };
    }
    
    const existsRes = await db.collection('managers').where({ phone }).get();
    console.log('手机号检查结果:', JSON.stringify(existsRes));
    
    if (existsRes.data && existsRes.data.length > 0) {
      return {
        code: 400,
        message: '该手机号已被注册'
      };
    }
    
    const userId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    const hashedPassword = password ? 
      crypto.createHash('sha256').update(password).digest('hex') : 
      crypto.createHash('sha256').update(phone.slice(-6)).digest('hex');
    
    let roleArray = [];
    if (Array.isArray(role)) {
      roleArray = role;
    } else if (typeof role === 'string') {
      try {
        const parsed = JSON.parse(role);
        if (Array.isArray(parsed)) {
          roleArray = parsed;
        } else {
          roleArray = role.split(',').map(r => r.trim()).filter(r => r);
        }
      } catch {
        roleArray = role.split(',').map(r => r.trim()).filter(r => r);
      }
    }
    
    roleArray = roleArray.map(r => {
      if (typeof r === 'object') {
        return r.label || r.value || '';
      }
      const cleaned = String(r).replace(/\[|\]/g, '').trim();
      return cleaned || String(r).trim();
    }).filter(r => r);
    
    console.log('角色数组:', roleArray);
    
    const managerData = {
      _id: userId,
      name,
      phone,
      password: hashedPassword,
      department: department || '',
      role: roleArray,
      createdAt: new Date().getTime(),
      system_userid: userId,
      needChangePassword: true
    };
    
    console.log('managers 数据:', JSON.stringify(managerData));
    
    const addResult = await db.collection('managers').add(managerData);
    console.log('添加结果:', JSON.stringify(addResult));
    
    return {
      code: 200,
      message: '用户创建成功',
      data: { userId, ...managerData }
    };
    
  } catch (err) {
    console.error('创建失败:', err.message);
    console.error('错误堆栈:', err.stack);
    return {
      code: 500,
      message: '创建用户失败: ' + err.message,
      error: err.stack
    };
  }
};
