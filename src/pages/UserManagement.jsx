import { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Form, 
  Input, 
  Select, 
  Table, 
  Tag, 
  Modal, 
  Spin, 
  Alert,
  Row,
  Col
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { cloudbase, db } from '../cloudbase';
import AppLayout from '../components/Layout';
import { ROLE_OPTIONS, getRoleOption } from '../config/business';
import { withOperator } from '../utils/auth';

const { Title, Text } = Typography;
const { Option } = Select;

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

function UserManagement() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchRole, setSearchRole] = useState('');
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('当前用户:', user);
      } catch (err) {
        console.error('解析用户信息失败:', err);
      }
    }
  }, []);

  const showModal = () => {
    console.log('showModal called');
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('isModalVisible 变化:', isModalVisible);
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalVisible]);

  const handleAddUser = async (values) => {
    setSubmitting(true);
    setError('');
    
    try {
      const { phone, name, department, role } = values;
      
      console.log('开始创建用户:', values);
      
      const result = await cloudbase.callFunction({
        name: 'create-user',
        data: withOperator({
          phone,
          name,
          department: department || '',
          role: Array.isArray(role) ? role.join(',') : role
        })
      });
      
      console.log('云函数返回结果:', result);
      
      if (result.result.code === 200) {
        setIsModalVisible(false);
        form.resetFields();
        fetchUsers();
      } else {
        setError(result.result.message);
      }
      
    } catch (err) {
      console.error('创建用户失败:', err);
      setError('创建用户失败: ' + (err.message || '未知错误'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await cloudbase.callFunction({
            name: 'delete-user',
            data: withOperator({ userId })
          });
          
          if (result.result.code === 200) {
            Modal.success({ title: '删除成功', content: result.result.message });
            fetchUsers();
          } else {
            Modal.error({ title: '删除失败', content: result.result.message });
          }
        } catch (err) {
          console.error('删除用户失败:', err.message);
          Modal.error({ title: '删除失败', content: err.message });
        }
      }
    });
  };

  const handleViewUser = (user) => {
    setViewUser(user);
    setIsViewModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    editForm.setFieldsValue({
      name: user.name,
      phone: user.phone,
      department: user.department || '',
      role: typeof user.role === 'string' ? user.role.split(',') : user.role
    });
    setIsEditModalVisible(true);
  };

  const handleUpdateUser = async (values) => {
    setSubmitting(true);
    setError('');
    
    try {
      const { phone, name, department, role } = values;
      
      const result = await cloudbase.callFunction({
        name: 'update-user',
        data: withOperator({
          userId: editUser._id,
          phone,
          name,
          department: department || '',
          role: Array.isArray(role) ? role.join(',') : role
        })
      });
      
      if (result.result.code === 200) {
        setIsEditModalVisible(false);
        editForm.resetFields();
        fetchUsers();
      } else {
        setError(result.result.message);
      }
    } catch (err) {
      console.error('更新用户失败:', err);
      setError('更新用户失败: ' + (err.message || '未知错误'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSearch = () => {
    fetchUsers();
  };

  const handleResetSearch = () => {
    setSearchName('');
    setSearchPhone('');
    setSearchRole('');
    fetchUsers();
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let query = db.collection('managers');
      const whereConditions = {};
      
      if (searchName) {
        whereConditions.name = db.RegExp({ regexp: searchName, options: 'i' });
      }
      if (searchPhone) {
        whereConditions.phone = db.RegExp({ regexp: searchPhone, options: 'i' });
      }
      if (searchRole) {
        whereConditions.role = db.RegExp({ regexp: searchRole, options: 'i' });
      }
      
      if (Object.keys(whereConditions).length > 0) {
        query = query.where(whereConditions);
      }
      
      const res = await query.orderBy('createdAt', 'desc').get();
      const data = res.data || [];
      setUsers(data);
    } catch (err) {
      console.error('获取用户列表失败:', err);
      setError('获取用户列表失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (userId, phone) => {
    Modal.confirm({
      title: '恢复初始密码',
      content: `确定要将该用户的密码恢复为初始密码（手机号后六位：${phone.slice(-6)}）吗？用户下次登录时将强制修改密码。`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await cloudbase.callFunction({
            name: 'reset-password',
            data: withOperator({ userId })
          });
          
          if (result.result.code === 200) {
            Modal.success({ title: '操作成功', content: result.result.message });
            fetchUsers();
          } else {
            Modal.error({ title: '操作失败', content: result.result.message });
          }
        } catch (err) {
          console.error('恢复密码失败:', err);
          Modal.error({ title: '操作失败', content: err.message });
        }
      }
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 140,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      width: 120,
      render: (dept) => dept || '-',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 180,
      render: (role) => {
        if (!role) return '-';
        const roles = typeof role === 'string' ? role.split(',') : (Array.isArray(role) ? role : [role]);
        return (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {roles.map((r) => {
              const roleInfo = getRoleOption(r);
              return roleInfo ? (
                <Tag key={r} color={roleInfo.color}>{roleInfo.label}</Tag>
              ) : (
                <Tag key={r} color="gray">{r}</Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (time) => time ? new Date(time).toLocaleString('zh-CN') : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 280,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px', whiteSpace: 'nowrap' }}>
          <Button
            type="link"
            icon={<EyeOutlined />}
            style={{ color: PRIMARY_COLOR, padding: '4px 6px', fontSize: '12px' }}
            onClick={() => handleViewUser(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            style={{ color: PRIMARY_COLOR, padding: '4px 6px', fontSize: '12px' }}
            onClick={() => handleEditUser(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            icon={<ReloadOutlined />}
            style={{ color: '#f59e0b', padding: '4px 6px', fontSize: '12px' }}
            onClick={() => handleResetPassword(record._id, record.phone)}
          >
            恢复密码
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record._id)}
            style={{ padding: '4px 6px', fontSize: '12px' }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Title level={2} style={{ marginBottom: '0', color: TEXT_COLOR }}>用户管理</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          style={{ 
            backgroundColor: PRIMARY_COLOR,
            borderColor: PRIMARY_COLOR,
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
          }}
          hoverStyle={{ backgroundColor: PRIMARY_HOVER, borderColor: PRIMARY_HOVER }}
        >
          新增用户
        </Button>
      </div>

      {error && (
        <Alert message={error} type="error" showIcon style={{ marginBottom: '24px' }} />
      )}

      <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Input
            placeholder="按姓名搜索"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: '200px', borderRadius: '8px' }}
            onPressEnter={handleSearch}
          />
          <Input
            placeholder="按手机号搜索"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            style={{ width: '200px', borderRadius: '8px' }}
            onPressEnter={handleSearch}
          />
          <Select
            placeholder="按角色筛选"
            value={searchRole}
            onChange={setSearchRole}
            style={{ width: '150px', borderRadius: '8px' }}
          >
            {ROLE_OPTIONS.map(role => (
              <Option key={role.value} value={role.value}>
                {role.label}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            onClick={handleSearch}
            style={{ 
              backgroundColor: PRIMARY_COLOR,
              borderColor: PRIMARY_COLOR,
              borderRadius: '8px'
            }}
            hoverStyle={{ backgroundColor: PRIMARY_HOVER, borderColor: PRIMARY_HOVER }}
          >
            查询
          </Button>
          <Button
            onClick={handleResetSearch}
            style={{ borderRadius: '8px' }}
          >
            重置
          </Button>
        </div>
      </Card>

      <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Spin size="large" tip="加载中..." />
          </div>
        ) : (
          <Table
            dataSource={users.map((item, index) => ({ ...item, key: item._id || index }))}
            columns={columns}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            }}
            bordered={false}
            rowKey="_id"
          />
        )}
      </Card>

      {isModalVisible && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 9999
        }} onClick={() => setIsModalVisible(false)}>
          <div style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            width: '500px',
            maxWidth: '90%',
            margin: '20px',
            position: 'relative',
            zIndex: 10000,
            overflow: 'visible'
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: TEXT_COLOR }}>新增用户</h2>
            
            {error && (
              <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />
            )}
            
            <div style={{ 
              backgroundColor: '#fef3c7', 
              borderLeft: '4px solid #f59e0b', 
              padding: '12px 16px', 
              marginBottom: '16px',
              borderRadius: '0 8px 8px 0'
            }}>
              <p style={{ margin: '0', color: '#92400e', fontSize: '14px' }}>
                <strong>提示：</strong>新用户的默认密码为手机号后六位，首次登录后需强制修改密码。
              </p>
            </div>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddUser}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                  >
                    <Input
                      placeholder="请输入姓名"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                    ]}
                  >
                    <Input
                      placeholder="请输入手机号"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="department"
                    label="部门"
                  >
                    <Input
                      placeholder="请输入部门（选填）"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="角色"
                    rules={[{ required: true, message: '请选择角色' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="请选择角色（可多选）"
                      style={{ width: '100%', borderRadius: '8px' }}
                    >
                      {ROLE_OPTIONS.map(role => (
                        <Option key={role.value} value={role.value}>
                          {role.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <Button
                  onClick={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                    setError('');
                  }}
                  style={{ borderRadius: '8px' }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  style={{ 
                    backgroundColor: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    borderRadius: '8px'
                  }}
                  hoverStyle={{ backgroundColor: PRIMARY_HOVER, borderColor: PRIMARY_HOVER }}
                >
                  确定创建
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}

      {isViewModalVisible && viewUser && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 9999
        }} onClick={() => setIsViewModalVisible(false)}>
          <div style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            width: '500px',
            maxWidth: '90%',
            margin: '20px',
            position: 'relative',
            zIndex: 10000
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: TEXT_COLOR }}>查看用户信息</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ color: TEXT_SECONDARY }}>姓名：</Text>
              <Text>{viewUser.name || '-'}</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ color: TEXT_SECONDARY }}>手机号：</Text>
              <Text>{viewUser.phone || '-'}</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ color: TEXT_SECONDARY }}>部门：</Text>
              <Text>{viewUser.department || '-'}</Text>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Text strong style={{ color: TEXT_SECONDARY }}>角色：</Text>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {(() => {
                  let roles = [];
                  if (typeof viewUser.role === 'string') {
                    roles = viewUser.role.split(',');
                  } else if (Array.isArray(viewUser.role)) {
                    roles = viewUser.role;
                  }
                  if (roles.length === 0) return <Text>-</Text>;
                  return roles.map((r) => {
                    const roleInfo = getRoleOption(r);
                    return roleInfo ? (
                      <Tag key={r} color={roleInfo.color}>{roleInfo.label}</Tag>
                    ) : (
                      <Tag key={r} color="gray">{r}</Tag>
                    );
                  });
                })()}
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <Text strong style={{ color: TEXT_SECONDARY }}>创建时间：</Text>
              <Text>{viewUser.createdAt ? new Date(viewUser.createdAt).toLocaleString('zh-CN') : '-'}</Text>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => setIsViewModalVisible(false)}
                style={{ borderRadius: '8px' }}
              >
                关闭
              </Button>
            </div>
          </div>
        </div>
      )}

      {isEditModalVisible && editUser && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 9999
        }} onClick={() => setIsEditModalVisible(false)}>
          <div style={{ 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            width: '500px',
            maxWidth: '90%',
            margin: '20px',
            position: 'relative',
            zIndex: 10000
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: TEXT_COLOR }}>编辑用户</h2>
            
            <Form
              form={editForm}
              layout="vertical"
              onFinish={handleUpdateUser}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true, message: '请输入姓名' }]}
                  >
                    <Input
                      placeholder="请输入姓名"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="手机号"
                    rules={[
                      { required: true, message: '请输入手机号' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                    ]}
                  >
                    <Input
                      placeholder="请输入手机号"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="department"
                    label="部门"
                  >
                    <Input
                      placeholder="请输入部门（选填）"
                      style={{ borderRadius: '8px' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="角色"
                    rules={[{ required: true, message: '请选择角色' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="请选择角色（可多选）"
                      style={{ width: '100%', borderRadius: '8px' }}
                    >
                      {ROLE_OPTIONS.map(role => (
                        <Option key={role.value} value={role.value}>
                          {role.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <Button
                  onClick={() => {
                    setIsEditModalVisible(false);
                    editForm.resetFields();
                  }}
                  style={{ borderRadius: '8px' }}
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  style={{ 
                    backgroundColor: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    borderRadius: '8px'
                  }}
                  hoverStyle={{ backgroundColor: PRIMARY_HOVER, borderColor: PRIMARY_HOVER }}
                >
                  保存修改
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

export default UserManagement;
