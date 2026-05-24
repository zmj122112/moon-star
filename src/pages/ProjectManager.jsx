import { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, Form, Input, message, Space, Typography, Row, Col, Spin } from 'antd';
import { SearchOutlined, EyeOutlined, DollarOutlined } from '@ant-design/icons';
import { db } from '../cloudbase';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/Layout';

const { Title, Text } = Typography;

const STATUS_MAP = {
  '10': { color: 'orange', label: '待接单' },
  '20': { color: 'cyan', label: '待勘测' },
  '30': { color: 'gold', label: '待报价' },
  '40': { color: 'lime', label: '待确认报价' },
  '45': { color: 'magenta', label: '待派工' },
  '50': { color: 'blue', label: '施工准备' },
  '60': { color: 'purple', label: '施工中' },
  '65': { color: 'volcano', label: '重新报价' },
  '70': { color: 'geekblue', label: '待验收' },
  '80': { color: 'red', label: '待支付' },
  '90': { color: 'green', label: '已结单' },
};

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

function ProjectManager() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchForm] = Form.useForm();
  const [managers, setManagers] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchManagers = async () => {
    try {
      const res = await db.collection('managers').get();
      let data = [];
      if (res && res.data) {
        data = Array.isArray(res.data) ? res.data : [];
      }
      setManagers(data.map(m => ({ value: m._id, label: m.name })));
    } catch (err) {
      console.error('获取项目经理列表失败:', err);
    }
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        fetchProjects(user);
        fetchManagers();
      } catch (e) {
        console.error('解析用户信息失败:', e);
        message.error('获取用户信息失败');
      }
    } else {
      message.error('未登录或登录已过期');
      navigate('/');
    }
  }, []);

  const fetchProjects = async (user) => {
    setLoading(true);
    try {
      const userId = user?.id || user?._id || user?.userId || user?.user_id || user?.phone || '';
      const userRoles = user?.role || [];
      const isManagement = Array.isArray(userRoles) 
        ? userRoles.some(r => String(r).includes('management') || String(r).includes('公司管理层'))
        : String(userRoles).includes('management') || String(userRoles).includes('公司管理层');
      const isAdmin = Array.isArray(userRoles) 
        ? userRoles.some(r => String(r).includes('admin') || String(r).includes('管理员'))
        : String(userRoles).includes('admin') || String(userRoles).includes('管理员');

      let res;
      if (isManagement || isAdmin) {
        res = await db.collection('workorders')
          .orderBy('createdAt', 'desc')
          .get();
      } else {
        if (!userId) {
          message.error('无法获取用户ID');
          return;
        }
        res = await db.collection('workorders')
          .where({ manager_id: userId })
          .orderBy('createdAt', 'desc')
          .get();
      }

      let data = [];
      if (res && res.data) {
        data = Array.isArray(res.data) ? res.data : [];
      }

      setProjects(data);
    } catch (err) {
      console.error('获取项目列表失败:', err);
      message.error('获取项目列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (values) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      fetchProjects(user);
    }
  };

  const handleViewDetail = (record) => {
    navigate(`/project-manager/order/${record._id}`);
  };

  const handleQuote = (record) => {
    navigate(`/project-manager/order/${record._id}`);
  };

  const columns = [
    {
      title: '工单编号',
      dataIndex: 'order_no',
      key: 'order_no',
      width: 180,
      ellipsis: false,
      render: (order_no) => order_no || '-',
    },
    {
      title: '联系人',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
    },
    {
      title: '项目经理',
      dataIndex: 'manager_id',
      key: 'manager_id',
      width: 120,
      render: (managerId) => {
        if (!managerId) return '-';
        const manager = managers.find(m => m.value === managerId);
        return manager ? manager.label : managerId;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const info = STATUS_MAP[String(status)] || { label: status, color: 'gray' };
        return <Tag color={info.color}>{info.label}</Tag>;
      },
    },
    {
      title: '总价',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 100,
      render: (price, record) => {
        const displayPrice = record.final_price || price || 0;
        return `¥${displayPrice.toFixed(2)}`;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
            style={{ color: PRIMARY_COLOR }}
          >
            查看
          </Button>
          {String(record.status) === '30' && (
            <Button
              type="primary"
              size="small"
              icon={<DollarOutlined />}
              onClick={() => handleQuote(record)}
            >
              报价
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const renderMobileCard = (record) => {
    const statusStr = String(record.status);
    const statusInfo = STATUS_MAP[statusStr] || { color: 'gray', label: record.status };
    const manager = managers.find(m => m.value === record.manager_id);
    const managerName = manager ? manager.label : (record.manager_id || '-');
    const displayPrice = record.final_price || record.total_price || 0;
    const canQuote = statusStr === '30';

    return (
      <Card 
        key={record._id} 
        style={{ 
          marginBottom: '12px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}
        hoverable
        onClick={() => handleViewDetail(record)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <div style={{ 
              fontSize: '15px', 
              fontWeight: '600', 
              color: TEXT_COLOR,
              marginBottom: '4px'
            }}>
              {record.order_no || '-'}
            </div>
            <div style={{ fontSize: '14px', color: TEXT_COLOR }}>{record.name}</div>
          </div>
          <Tag color={statusInfo.color} style={{ fontSize: '12px', padding: '2px 8px' }}>
            {statusInfo.label}
          </Tag>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '8px 16px',
          fontSize: '13px',
          color: TEXT_SECONDARY
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>📞</span>
            <span>{record.phone || '-'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>👤</span>
            <span>{managerName}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>💰</span>
            <span style={{ color: PRIMARY_COLOR, fontWeight: '500' }}>¥{displayPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '12px', 
          paddingTop: '12px', 
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end'
        }}>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetail(record);
            }}
            style={{ 
              backgroundColor: PRIMARY_COLOR,
              borderColor: PRIMARY_COLOR,
              borderRadius: '6px',
              height: '36px',
              padding: '0 20px'
            }}
          >
            查看详情
          </Button>
          {canQuote && (
            <Button
              type="primary"
              size="small"
              icon={<DollarOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleQuote(record);
              }}
              style={{ 
                backgroundColor: '#f59e0b',
                borderColor: '#f59e0b',
                borderRadius: '6px',
                height: '36px',
                padding: '0 20px'
              }}
            >
              报价
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <AppLayout>
      <div style={{ padding: isMobile ? '16px' : '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>项目经理</h2>
        <Card 
          style={{ 
            marginBottom: '16px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
          }}
        >
          {isMobile ? (
            <Form
              form={searchForm}
              onFinish={handleSearch}
              layout="vertical"
            >
              <Form.Item name="name">
                <Input
                  placeholder="联系人姓名"
                  prefix={<SearchOutlined style={{ color: TEXT_SECONDARY }} />}
                  style={{ 
                    width: '100%',
                    borderRadius: '6px',
                    height: '44px',
                    borderColor: '#e2e8f0',
                    fontSize: '15px'
                  }}
                />
              </Form.Item>
              <Form.Item name="phone">
                <Input
                  placeholder="联系电话"
                  style={{ 
                    width: '100%',
                    borderRadius: '6px',
                    height: '44px',
                    borderColor: '#e2e8f0',
                    fontSize: '15px'
                  }}
                />
              </Form.Item>
              <Space style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={{ 
                    flex: 1,
                    backgroundColor: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    borderRadius: '6px',
                    height: '44px',
                    fontSize: '15px'
                  }}
                >
                  查询
                </Button>
                <Button 
                  style={{ 
                    flex: 1,
                    borderRadius: '6px',
                    height: '44px',
                    fontSize: '15px'
                  }} 
                  onClick={() => {
                    searchForm.resetFields();
                    const userStr = localStorage.getItem('user');
                    if (userStr) {
                      fetchProjects(JSON.parse(userStr));
                    }
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form>
          ) : (
            <Form
              form={searchForm}
              onFinish={handleSearch}
              layout="inline"
            >
              <Row gutter={16} align="middle">
                <Col style={{ flex: 1, textAlign: 'right' }}>
                  <span style={{ color: TEXT_SECONDARY, fontSize: '14px' }}>
                    共 {projects.length} 个项目
                  </span>
                </Col>
                <Col>
                  <Form.Item name="name">
                    <Input
                      placeholder="联系人姓名"
                      prefix={<SearchOutlined style={{ color: TEXT_SECONDARY }} />}
                      style={{ 
                        width: 220,
                        borderRadius: '6px',
                        height: '38px',
                        borderColor: '#e2e8f0'
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="phone">
                    <Input
                      placeholder="联系电话"
                      style={{ 
                        width: 160,
                        borderRadius: '6px',
                        height: '38px',
                        borderColor: '#e2e8f0'
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    style={{ 
                      backgroundColor: PRIMARY_COLOR,
                      borderColor: PRIMARY_COLOR,
                      borderRadius: '6px',
                      height: '38px',
                      padding: '0 24px',
                      boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
                    }}
                    hoverStyle={{ 
                      backgroundColor: PRIMARY_HOVER,
                      borderColor: PRIMARY_HOVER,
                      boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
                    }}
                  >
                    查询
                  </Button>
                  <Button 
                    style={{ 
                      marginLeft: '8px',
                      borderRadius: '6px',
                      height: '38px',
                      padding: '0 24px'
                    }} 
                    onClick={() => {
                      searchForm.resetFields();
                      const userStr = localStorage.getItem('user');
                      if (userStr) {
                        fetchProjects(JSON.parse(userStr));
                      }
                    }}
                  >
                    重置
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Card>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <Spin size="large" tip="加载中..." />
          </div>
        ) : isMobile ? (
          <div>
            {projects.map(renderMobileCard)}
            {projects.length === 0 && (
              <Card style={{ 
                borderRadius: '8px',
                textAlign: 'center',
                padding: '40px'
              }}>
                <p style={{ color: TEXT_SECONDARY }}>暂无数据</p>
              </Card>
            )}
          </div>
        ) : (
          <Card 
            style={{ 
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
            }}
          >
            <Table
              columns={columns}
              dataSource={projects.map((item, index) => ({ ...item, key: item._id || index }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'],
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              }}
              bordered={false}
              rowKey="_id"
              scroll={{ x: 1200 }}
            />
          </Card>
        )}
      </div>
    </AppLayout>
  );
}

export default ProjectManager;