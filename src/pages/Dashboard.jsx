import { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Tag, Progress, message, Spin, Select, DatePicker, Button, Space } from 'antd';
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  ArrowUpOutlined,
  PieChartOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { db } from '../cloudbase';
import AppLayout from '../components/Layout';
import ResponsiveTable from '../components/ResponsiveTable';

const { RangePicker } = DatePicker;

const STATUS_MAP = {
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

const COLOR_MAP = {
  orange: '#f97316',
  cyan: '#06b6d4',
  gold: '#f59e0b',
  lime: '#84cc16',
  magenta: '#ec4899',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  volcano: '#f59e0b',
  geekblue: '#3b82f6',
  red: '#ef4444',
  green: '#22c55e',
  default: '#6b7280',
};

const PRIMARY_COLOR = '#2563eb';

const getTagColor = (colorName) => {
  return COLOR_MAP[colorName] || COLOR_MAP.default;
};

const timeRangeOptions = [
  { value: 'today', label: '今日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' },
  { value: 'lastMonth', label: '上一月' },
  { value: 'year', label: '今年' },
  { value: 'lastYear', label: '上一年' },
  { value: 'custom', label: '自定义' },
];

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    avgCompletionRate: 0,
  });
  const [statusStats, setStatusStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [managerStats, setManagerStats] = useState([]);
  const [timeRange, setTimeRange] = useState('year');
  const [customDateRange, setCustomDateRange] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDateRange = () => {
    const now = new Date();
    let startDate, endDate;

    switch (timeRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case 'week':
        const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 1);
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
        break;
      case 'lastYear':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'custom':
        if (customDateRange && customDateRange.length === 2) {
          startDate = customDateRange[0] instanceof Date ? customDateRange[0] : new Date(customDateRange[0].valueOf());
          const endDateValue = customDateRange[1] instanceof Date ? customDateRange[1].getTime() : customDateRange[1].valueOf();
          endDate = new Date(endDateValue + 24 * 60 * 60 * 1000);
        } else {
          startDate = new Date(now.getFullYear(), 0, 1);
          endDate = new Date(now.getFullYear() + 1, 0, 1);
        }
        break;
      default:
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear() + 1, 0, 1);
    }

    return { startDate, endDate };
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange();
      const startTime = startDate.getTime();
      const endTime = endDate.getTime();

      const [ordersRes, usersRes, managersRes] = await Promise.all([
        db.collection('workorders').where({
          createdAt: db.command.gte(startTime).and(db.command.lt(endTime))
        }).get(),
        db.collection('users').get(),
        db.collection('managers').get(),
      ]);

      const orders = ordersRes?.data || [];
      const users = usersRes?.data || [];
      const managers = managersRes?.data || [];

      const managerNameMap = {};
      managers.forEach(m => {
        managerNameMap[m._id] = m.name;
      });

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total_price || 0), 0);
      const completedOrders = orders.filter(o => o.status === '90').length;
      const avgCompletionRate = totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;
      const totalCustomers = new Set(orders.map(o => o.phone)).size;

      setStats({
        totalOrders,
        totalRevenue,
        totalCustomers,
        avgCompletionRate,
      });

      const statusCounts = {};
      Object.keys(STATUS_MAP).forEach(status => {
        statusCounts[status] = orders.filter(o => o.status === status).length;
      });
      setStatusStats(Object.entries(statusCounts).map(([status, count]) => ({
        status,
        label: STATUS_MAP[status]?.label || status,
        color: STATUS_MAP[status]?.color || 'default',
        count,
        percentage: totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0,
      })));

      const recent = orders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);
      setRecentOrders(recent);

      const managerMap = {};
      orders.forEach(order => {
        const managerId = order.manager_id;
        if (!managerMap[managerId]) {
          const managerName = managerNameMap[managerId] || order.manager_name || '未分配';
          managerMap[managerId] = { count: 0, revenue: 0, name: managerName };
        }
        managerMap[managerId].count++;
        managerMap[managerId].revenue += order.total_price || 0;
      });
      const managerList = Object.values(managerMap)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
      setManagerStats(managerList);

    } catch (err) {
      console.error('获取统计数据失败:', err);
      message.error('获取统计数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [timeRange, customDateRange]);

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    if (value !== 'custom') {
      setCustomDateRange(null);
    }
  };

  const handleCustomDateChange = (dates) => {
    setCustomDateRange(dates);
    if (dates && dates.length === 2) {
      setTimeRange('custom');
    }
  };

  const topCards = [
    {
      title: '工单总数',
      value: stats.totalOrders,
      icon: <ShoppingCartOutlined style={{ color: PRIMARY_COLOR, fontSize: '24px' }} />,
      suffix: '单',
      bgColor: '#eff6ff',
    },
    {
      title: '总营业额',
      value: stats.totalRevenue.toFixed(2),
      icon: <DollarOutlined style={{ color: '#22c55e', fontSize: '24px' }} />,
      prefix: '¥',
      bgColor: '#ecfdf5',
    },
    {
      title: '服务客户',
      value: stats.totalCustomers,
      icon: <UserOutlined style={{ color: '#3b82f6', fontSize: '24px' }} />,
      suffix: '位',
      bgColor: '#f0f9ff',
    },
    {
      title: '完成率',
      value: stats.avgCompletionRate,
      icon: <ArrowUpOutlined style={{ color: '#f59e0b', fontSize: '24px' }} />,
      suffix: '%',
      bgColor: '#fffbeb',
    },
  ];

  const recentOrdersColumns = [
    {
      title: '工单编号',
      dataIndex: 'order_no',
      key: 'order_no',
      width: 180,
      render: (text) => text || '-',
    },
    {
      title: '联系人',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
    },
    {
      title: '项目经理',
      dataIndex: 'manager_name',
      key: 'manager_name',
      width: 120,
      render: (text) => text || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => {
        const info = STATUS_MAP[status];
        return info ? <Tag color={info.color}>{info.label}</Tag> : status;
      },
    },
    {
      title: '总价',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 100,
      render: (price) => `¥${(price || 0).toFixed(2)}`,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (time) => time ? new Date(time).toLocaleString('zh-CN') : '-',
    },
  ];

  return (
    <AppLayout>
      <Spin spinning={loading}>
        <div style={{ padding: '0 16px', margin: '-16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>统计中心</h1>
            <p style={{ color: '#64748b', marginTop: '8px' }}>实时监控业务数据，助力科学决策</p>
            
            <div style={{ marginTop: '16px' }}>
              <Space style={{ width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CalendarOutlined style={{ color: '#64748b' }} />
                  <Select
                    value={timeRange}
                    onChange={handleTimeRangeChange}
                    options={timeRangeOptions}
                    style={{ width: isMobile ? '100%' : 140 }}
                    size="middle"
                  />
                </div>
                {timeRange === 'custom' && (
                  <RangePicker
                    value={customDateRange}
                    onChange={handleCustomDateChange}
                    style={{ width: isMobile ? '100%' : 280 }}
                    size="middle"
                  />
                )}
              </Space>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {topCards.map((card, index) => (
              <Card key={index} style={{ borderRadius: '12px', backgroundColor: card.bgColor, border: 'none', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {card.icon}
                  </div>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '2px' }}>{card.title}</p>
                    <Statistic
                      value={card.value}
                      prefix={card.prefix}
                      suffix={card.suffix}
                      style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <Card title="工单状态分布" style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {statusStats.map((item) => (
                  <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '70px', fontSize: '13px', color: '#475569' }}>{item.label}</span>
                    <div style={{ flex: 1, height: '20px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${item.percentage}%`,
                          backgroundColor: getTagColor(item.color),
                          borderRadius: '10px',
                          transition: 'width 0.3s',
                        }}
                      />
                    </div>
                    <span style={{ width: '70px', textAlign: 'right', fontSize: '13px', color: '#64748b' }}>
                      {item.count}单
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="项目经理业绩排行" style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {managerStats.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : index === 2 ? '#d97706' : '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: index < 3 ? '#fff' : '#64748b',
                    }}>
                      {index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#1e293b' }}>{item.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748b' }}>{item.count} 个项目</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '16px', fontWeight: 'bold', color: PRIMARY_COLOR }}>
                        ¥{item.revenue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="最新工单" style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)' }}>
            <ResponsiveTable
              dataSource={recentOrders.map((item, index) => ({ ...item, key: item._id || index }))}
              columns={recentOrdersColumns}
              pagination={false}
            />
          </Card>
        </div>
      </Spin>
    </AppLayout>
  );
}

export default Dashboard;