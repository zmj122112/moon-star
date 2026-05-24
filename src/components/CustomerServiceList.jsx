import { useState, useEffect } from 'react';
import { 
  Table, 
  Input, 
  Select, 
  Button, 
  Form, 
  Typography, 
  Tag, 
  Spin, 
  Alert,
  Row,
  Col,
  Card,
  Space
} from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { db } from '../cloudbase';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

function CustomerServiceList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  const statusMap = {
    '10': { color: 'orange', label: '待接单' },
    '20': { color: 'cyan', label: '待勘测' },
    '30': { color: 'gold', label: '待报价' },
    '40': { color: 'lime', label: '待确认报价' },
    '45': { color: 'magenta', label: '待派工' },
    '50': { color: 'blue', label: '待进场' },
    '60': { color: 'purple', label: '施工中' },
    '65': { color: 'volcano', label: '重新报价' },
    '70': { color: 'geekblue', label: '待验收' },
    '80': { color: 'red', label: '待支付' },
    '90': { color: 'green', label: '已结单' },
  };

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

  const fetchWorkOrders = async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      let query = db.collection('workorders');
      
      const name = filters?.name?.trim();
      const phone = filters?.phone?.trim();
      const status = filters?.status;
      
      let whereObj = {};
      
      if (name && name.length > 0) {
        whereObj.name = db.RegExp({
          regexp: name,
          options: 'i'
        });
      }
      if (phone && phone.length > 0) {
        whereObj.phone = db.RegExp({
          regexp: phone,
          options: 'i'
        });
      }
      if (status && status !== 'all') {
        whereObj.status = status;
      }
      
      if (Object.keys(whereObj).length > 0) {
        query = query.where(whereObj);
      }
      
      const res = await query.orderBy('createdAt', 'desc').get();
      setData(res.data);
    } catch (err) {
      setError(err.message || '获取工单数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkOrders();
    fetchManagers();
  }, []);

  const handleSearch = (values) => {
    const validFilters = {};
    if (values?.name?.trim()) {
      validFilters.name = values.name.trim();
    }
    if (values?.phone?.trim()) {
      validFilters.phone = values.phone.trim();
    }
    if (values?.status && values.status !== 'all') {
      validFilters.status = values.status;
    }
    fetchWorkOrders(validFilters);
  };

  const handleReset = () => {
    searchForm.resetFields();
    fetchWorkOrders();
  };

  const handleViewDetail = (record) => {
    navigate(`/admin/order/${record._id}`);
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
        const statusStr = String(status);
        const item = statusMap[statusStr] || { color: 'gray', label: status };
        return <Tag color={item.color}>{item.label}</Tag>;
      },
    },
    {
      title: '总价',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 100,
      render: (price) => {
        if (price) {
          return <span style={{ color: PRIMARY_COLOR, fontWeight: '500' }}>¥{price.toFixed(2)}</span>;
        }
        return '-';
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetail(record)}
          style={{ 
            color: PRIMARY_COLOR,
            padding: '4px 12px'
          }}
          hoverStyle={{ 
            color: PRIMARY_HOVER,
            textDecoration: 'underline'
          }}
        >
          查看
        </Button>
      ),
    },
  ];

  const renderMobileCard = (record) => {
    const statusStr = String(record.status);
    const statusInfo = statusMap[statusStr] || { color: 'gray', label: record.status };
    const manager = managers.find(m => m.value === record.manager_id);
    const managerName = manager ? manager.label : (record.manager_id || '-');
    const price = record.total_price;

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
            <span style={{ color: PRIMARY_COLOR, fontWeight: '500' }}>
              {price ? `¥${price.toFixed(2)}` : '-'}
            </span>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '12px', 
          paddingTop: '12px', 
          borderTop: '1px solid #f1f5f9',
          textAlign: 'right'
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
        </div>
      </Card>
    );
  };

  return (
    <div>
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
            <Form.Item name="status">
              <Select
                placeholder="选择状态"
                style={{ 
                  width: '100%',
                  borderRadius: '6px',
                  height: '44px'
                }}
              >
                <Option value="all">全部</Option>
                <Option value="10">待接单</Option>
                <Option value="20">待勘测</Option>
                <Option value="30">待报价</Option>
                <Option value="40">待确认报价</Option>
                <Option value="45">待派工</Option>
                <Option value="50">施工准备</Option>
                <Option value="60">施工中</Option>
                <Option value="70">待验收</Option>
                <Option value="80">待支付</Option>
                <Option value="90">已结单</Option>
              </Select>
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
                  fontSize: '15px',
                  boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)'
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
                onClick={handleReset}
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
                  共 {data.length} 条记录
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
                <Form.Item name="status">
                  <Select
                    placeholder="选择状态"
                    style={{ 
                      width: 130,
                      borderRadius: '6px',
                      height: '38px'
                    }}
                  >
                    <Option value="all">全部</Option>
                    <Option value="10">待接单</Option>
                    <Option value="20">待勘测</Option>
                    <Option value="30">待报价</Option>
                    <Option value="40">待确认报价</Option>
                    <Option value="45">待派工</Option>
                    <Option value="50">施工准备</Option>
                    <Option value="60">施工中</Option>
                    <Option value="70">待验收</Option>
                    <Option value="80">待支付</Option>
                    <Option value="90">已结单</Option>
                  </Select>
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
                  onClick={handleReset}
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
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : isMobile ? (
        <div>
          {data.map(renderMobileCard)}
          {data.length === 0 && (
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
            dataSource={data.map((item, index) => ({ ...item, key: item._id || index }))}
            columns={columns}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50'],
              showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
            }}
            bordered={false}
            rowKey="_id"
            style={{ marginTop: '0' }}
          />
        </Card>
      )}
    </div>
  );
}

export default CustomerServiceList;