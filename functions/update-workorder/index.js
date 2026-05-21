const cloudbase = require('@cloudbase/node-sdk');

const app = cloudbase.init({
  env: process.env.TCB_ENV_ID
});

const db = app.database();

exports.main = async (event, context) => {
  try {
    const { orderId, status, total_price, visit_time, manager_id } = event;
    
    console.log('接收到更新请求:', { orderId, status, total_price, visit_time, manager_id });
    
    const checkResult = await db.collection('workorders').where({
      _id: orderId
    }).get();
    console.log('查询结果:', checkResult);
    
    if (!checkResult.data || checkResult.data.length === 0) {
      return {
        success: false,
        message: '未找到对应的工单'
      };
    }
    
    const updateData = {};
    if (status !== undefined) {
      updateData.status = status;
    }
    if (total_price !== undefined) {
      updateData.total_price = total_price;
    }
    if (visit_time !== undefined) {
      updateData.visit_time = visit_time;
    }
    if (manager_id !== undefined) {
      updateData.manager_id = manager_id;
    }
    
    console.log('更新数据:', updateData);
    
    const result = await db.collection('workorders').where({
      _id: orderId
    }).update(updateData);
    
    console.log('更新结果:', result);
    
    return {
      success: result.updated > 0,
      message: result.updated > 0 ? '更新成功' : '更新失败',
      data: result
    };
  } catch (error) {
    console.error('更新失败:', error);
    return {
      success: false,
      message: error.message || '更新失败'
    };
  }
};