const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: process.env.TCB_ENV_ID || 'waterproof-3g9f7h9kdb626bb3'
});

const db = app.database();

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

const validateOperator = async (operatorId, operatorToken) => {
  if (!operatorToken) return { ok: true, operator: null };

  const result = await db.collection('managers').doc(operatorId).get();
  const operator = Array.isArray(result.data) ? result.data[0] : result.data;
  if (!operator || operator.token !== operatorToken) {
    return { ok: false, code: 401, message: '登录已过期，请重新登录' };
  }

  const canOperate = parseRoles(operator.role).some(role =>
    role.includes('admin') || role.includes('管理员') ||
    role.includes('management') || role.includes('公司管理层')
  );

  if (!canOperate) {
    return { ok: false, code: 403, message: '无权限执行运维退回' };
  }

  return { ok: true, operator };
};

exports.main = async (event, context) => {
  try {
    const {
      orderId,
      targetStatus,
      reason,
      operatorId,
      operatorName,
      operatorToken
    } = event;

    if (!orderId || !targetStatus || !reason || !String(reason).trim()) {
      return {
        code: 400,
        success: false,
        message: '工单、退回节点和退回原因均为必填'
      };
    }

    const authResult = await validateOperator(operatorId, operatorToken);
    if (!authResult.ok) {
      return {
        code: authResult.code,
        success: false,
        message: authResult.message
      };
    }

    const orderResult = await db.collection('workorders').doc(orderId).get();
    const order = Array.isArray(orderResult.data) ? orderResult.data[0] : orderResult.data;
    if (!order) {
      return {
        code: 404,
        success: false,
        message: '工单不存在'
      };
    }

    const now = Date.now();
    const fromStatus = String(order.status || '');
    const toStatus = String(targetStatus);
    const trimmedReason = String(reason).trim();
    const actualOperatorName = operatorName || authResult.operator?.name || '运维管理员';

    const updateResult = await db.collection('workorders').doc(orderId).update({
      status: toStatus,
      rollback_at: now,
      rollback_from_status: fromStatus,
      rollback_to_status: toStatus,
      rollback_reason: trimmedReason,
      rollback_by: operatorId || '',
      rollback_by_name: actualOperatorName,
      updatedAt: now
    });

    await db.collection('wo_records').add({
      order_id: orderId,
      record_type: 'rollback',
      creator_role: 'admin',
      creator_name: actualOperatorName,
      creator_id: operatorId || '',
      content: `运维退回：从状态 ${fromStatus || '-'} 退回到 ${toStatus}。原因：${trimmedReason}`,
      rollback_from_status: fromStatus,
      rollback_to_status: toStatus,
      rollback_reason: trimmedReason,
      createdAt: now,
      updatedAt: now
    });

    return {
      code: 200,
      success: true,
      message: '退回成功',
      data: updateResult
    };
  } catch (error) {
    console.error('退回失败:', error);
    return {
      code: 500,
      success: false,
      message: error.message || '退回失败'
    };
  }
};
