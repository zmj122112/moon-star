import { useState, useEffect } from 'react';
import { Table, Spin, Alert, Tag } from 'antd';
import { db } from '../cloudbase';
import { getStatusInfo } from '../config/business';

function WorkOrderList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await db.collection('workorders').limit(10).get();
      setData(res.data);
    } catch (err) {
      setError(err.message || '获取工单数据失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'order_no',
      key: 'order_no',
      width: 200,
      ellipsis: false,
      render: (order_no) => order_no || '-',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 120,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
      width: 100,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const item = getStatusInfo(status);
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150,
      render: (time) => {
        if (time && time.toDate) {
          return time.toDate().toLocaleString('zh-CN');
        }
        return time;
      },
    },
  ];

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Table
          dataSource={data.map((item, index) => ({ ...item, key: index }))}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          bordered
          style={{ marginTop: '16px' }}
        />
      )}
    </div>
  );
}

export default WorkOrderList;
