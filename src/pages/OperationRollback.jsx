import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag, Typography, message } from 'antd';
import { RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import AppLayout from '../components/Layout';
import { cloudbase, db } from '../cloudbase';
import { STATUS_MAP, getStatusInfo } from '../config/business';
import { withOperator } from '../utils/auth';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PRIMARY_COLOR = '#2563eb';
const TEXT_SECONDARY = '#64748b';

const rollbackStatusOptions = Object.entries(STATUS_MAP)
  .filter(([status]) => !['10', '90'].includes(status))
  .map(([value, item]) => ({ value, label: item.label }));

function OperationRollback() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rollbackOpen, setRollbackOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [searchForm] = Form.useForm();
  const [rollbackForm] = Form.useForm();

  const fetchOrders = async (filters = {}) => {
    setLoading(true);
    try {
      let query = db.collection('workorders');
      const where = {};

      if (filters.keyword) {
        const keywordRegExp = db.RegExp({
          regexp: filters.keyword,
          options: 'i'
        });
        where.order_no = keywordRegExp;
      }

      if (filters.phone) {
        where.phone = db.RegExp({
          regexp: filters.phone,
          options: 'i'
        });
      }

      if (filters.status && filters.status !== 'all') {
        where.status = filters.status;
      }

      if (Object.keys(where).length > 0) {
        query = query.where(where);
      }

      const res = await query.orderBy('createdAt', 'desc').limit(100).get();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('获取工单失败:', error);
      message.error('获取工单失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSearch = (values) => {
    fetchOrders({
      keyword: values.keyword?.trim(),
      phone: values.phone?.trim(),
      status: values.status
    });
  };

  const openRollback = (order) => {
    setSelectedOrder(order);
    rollbackForm.setFieldsValue({
      targetStatus: '',
      reason: ''
    });
    setRollbackOpen(true);
  };

  const handleRollback = async (values) => {
    if (!selectedOrder) return;

    setSubmitting(true);
    try {
      const result = await cloudbase.callFunction({
        name: 'rollback-workorder',
        data: withOperator({
          orderId: selectedOrder._id,
          targetStatus: values.targetStatus,
          reason: values.reason
        })
      });

      if (result.result?.success) {
        message.success('退回成功');
        setRollbackOpen(false);
        setSelectedOrder(null);
        fetchOrders(searchForm.getFieldsValue());
      } else {
        message.error(result.result?.message || '退回失败');
      }
    } catch (error) {
      console.error('退回失败:', error);
      message.error(error.message || '退回失败');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'order_no',
      key: 'order_no',
      width: 180,
      render: (value, record) => value || record._id
    },
    {
      title: '联系人',
      dataIndex: 'name',
      key: 'name',
      width: 120
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 140
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const info = getStatusInfo(status);
        return <Tag color={info.color}>{info.label}</Tag>;
      }
    },
    {
      title: '上次退回',
      key: 'rollback',
      width: 220,
      render: (_, record) => {
        if (!record.rollback_at) return <Text style={{ color: TEXT_SECONDARY }}>-</Text>;
        const toStatus = getStatusInfo(record.rollback_to_status);
        return (
          <div>
            <Tag color="red">退回到{toStatus.label}</Tag>
            <div style={{ color: TEXT_SECONDARY, fontSize: '12px', marginTop: 4 }}>
              {new Date(record.rollback_at).toLocaleString('zh-CN')}
            </div>
          </div>
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          icon={<RollbackOutlined />}
          onClick={() => openRollback(record)}
          style={{ color: PRIMARY_COLOR }}
        >
          退回
        </Button>
      )
    }
  ];

  return (
    <AppLayout>
      <Title level={2}>运维退回</Title>
      <Card style={{ marginBottom: 16, borderRadius: 8 }}>
        <Form form={searchForm} layout="inline" onFinish={handleSearch}>
          <Form.Item name="keyword">
            <Input placeholder="工单编号" prefix={<SearchOutlined />} style={{ width: 220 }} />
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="联系电话" style={{ width: 180 }} />
          </Form.Item>
          <Form.Item name="status">
            <Select placeholder="状态" style={{ width: 160 }} allowClear>
              <Select.Option value="all">全部状态</Select.Option>
              {Object.entries(STATUS_MAP).map(([value, item]) => (
                <Select.Option key={value} value={value}>{item.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button onClick={() => {
              searchForm.resetFields();
              fetchOrders();
            }}>
              重置
            </Button>
          </Space>
        </Form>
      </Card>

      <Card style={{ borderRadius: 8 }}>
        <Table
          rowKey="_id"
          loading={loading}
          dataSource={orders}
          columns={columns}
          scroll={{ x: 900 }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="运维退回"
        open={rollbackOpen}
        onCancel={() => setRollbackOpen(false)}
        footer={null}
        destroyOnClose
      >
        {selectedOrder && (
          <div style={{ marginBottom: 16, color: TEXT_SECONDARY }}>
            当前工单：{selectedOrder.order_no || selectedOrder._id}，当前状态：
            <Tag color={getStatusInfo(selectedOrder.status).color} style={{ marginLeft: 8 }}>
              {getStatusInfo(selectedOrder.status).label}
            </Tag>
          </div>
        )}
        <Form form={rollbackForm} layout="vertical" onFinish={handleRollback}>
          <Form.Item
            name="targetStatus"
            label="退回到节点"
            rules={[{ required: true, message: '请选择退回节点' }]}
          >
            <Select placeholder="请选择退回节点">
              {rollbackStatusOptions.map((item) => (
                <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="reason"
            label="退回原因"
            rules={[
              { required: true, message: '请填写退回原因' },
              { min: 5, message: '退回原因至少 5 个字' }
            ]}
          >
            <TextArea rows={4} placeholder="请详细说明为什么需要退回，便于后续追溯" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setRollbackOpen(false)}>取消</Button>
              <Button type="primary" htmlType="submit" loading={submitting} danger>
                确认退回
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </AppLayout>
  );
}

export default OperationRollback;
