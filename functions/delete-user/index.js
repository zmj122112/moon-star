const cloudbase = require('@cloudbase/node-sdk');

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

const saveOperationLog = async (db, operatorId, operatorName, action, targetUserId, targetUserName, detail) => {
  try {
    await db.collection('user_operation_logs').add({
      operatorId,
      operatorName,
      action,
      targetUserId,
      targetUserName,
      detail: JSON.stringify(detail),
      createdAt: new Date().getTime(),
      ip: ''
    });
    console.log('操作日志保存成功');
  } catch (err) {
    console.error('保存操作日志失败:', err.message);
  }
};

exports.main = async (event, context) => {
  console.log('=== delete-user 云函数被调用 ===');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const db = app.database();
    
    const { userId, operatorId, operatorName, operatorToken } = event;
    
    console.log('参数:', { userId, operatorId, operatorName });
    
    if (!userId) {
      return {
        code: 400,
        message: '缺少必要参数：userId'
      };
    }

    const authResult = await validateAdminIfTokenProvided(db, operatorId, operatorToken);
    if (!authResult.ok) {
      return {
        code: authResult.code,
        message: authResult.message
      };
    }
    
    const existsRes = await db.collection('managers').doc(userId).get();
    console.log('用户查询结果:', JSON.stringify(existsRes));
    
    if (!existsRes.data || existsRes.data.length === 0) {
      return {
        code: 400,
        message: '用户不存在'
      };
    }
    
    const existingUser = existsRes.data[0];
    
    const deleteResult = await db.collection('managers').doc(userId).remove();
    console.log('删除结果:', JSON.stringify(deleteResult));
    
    await saveOperationLog(db, operatorId || 'system', operatorName || '系统', 'delete_user', userId, existingUser.name, {
      deletedUser: { name: existingUser.name, phone: existingUser.phone, department: existingUser.department, role: existingUser.role }
    });
    
    return {
      code: 200,
      message: '用户删除成功',
      data: deleteResult
    };
    
  } catch (err) {
    console.error('删除失败:', err.message);
    console.error('错误堆栈:', err.stack);
    return {
      code: 500,
      message: '删除用户失败: ' + err.message,
      error: err.stack
    };
  }
};
