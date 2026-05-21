const cloudbase = require('@cloudbase/node-sdk');

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
  console.log('=== update-user 云函数被调用 ===');
  console.log('event:', JSON.stringify(event));
  
  try {
    const app = cloudbase.init({
      env: 'waterproof-3g9f7h9kdb626bb3'
    });
    
    const db = app.database();
    
    const { userId, phone, name, department, role, operatorId, operatorName } = event;
    
    console.log('参数:', { userId, phone, name, department, role, operatorId, operatorName });
    
    if (!userId || !phone || !name) {
      return {
        code: 400,
        message: '缺少必要参数'
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
    
    const updateData = {
      phone,
      name,
      department: department || '',
      role: roleArray,
      updatedAt: new Date().getTime()
    };
    
    console.log('更新数据:', JSON.stringify(updateData));
    
    const updateResult = await db.collection('managers').doc(userId).update(updateData);
    console.log('更新结果:', JSON.stringify(updateResult));
    
    await saveOperationLog(db, operatorId || 'system', operatorName || '系统', 'update_user', userId, existingUser.name, {
      before: { name: existingUser.name, phone: existingUser.phone, department: existingUser.department, role: existingUser.role },
      after: { name, phone, department: department || '', role: roleArray }
    });
    
    return {
      code: 200,
      message: '用户更新成功',
      data: updateResult
    };
    
  } catch (err) {
    console.error('更新失败:', err.message);
    console.error('错误堆栈:', err.stack);
    return {
      code: 500,
      message: '更新用户失败: ' + err.message,
      error: err.stack
    };
  }
};