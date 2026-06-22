import { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, Dropdown, Avatar, Space } from 'antd';
import { 
  LogoutOutlined, 
  HomeOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
  ProjectOutlined,
  BarChartOutlined,
  RollbackOutlined,
  MenuOutlined,
  XOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { APP_NAME, isDevEnv } from '../config/env';
import { MENU_ITEMS, hasAnyRole, parseRoles } from '../config/business';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const SIDER_BG = '#f8fafc';
const HEADER_BG = '#ffffff';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

const allMenuItems = [
  { ...MENU_ITEMS.find((item) => item.key === '/admin'), icon: <HomeOutlined /> },
  { ...MENU_ITEMS.find((item) => item.key === '/project-manager'), icon: <ProjectOutlined /> },
  { ...MENU_ITEMS.find((item) => item.key === '/dashboard'), icon: <BarChartOutlined /> },
  { ...MENU_ITEMS.find((item) => item.key === '/users'), icon: <UserOutlined /> },
  { ...MENU_ITEMS.find((item) => item.key === '/operations/rollback'), icon: <RollbackOutlined /> },
  { ...MENU_ITEMS.find((item) => item.key === '/profile'), icon: <UserOutlined /> },
  { ...MENU_ITEMS.find((item) => item.key === '/settings'), icon: <SettingOutlined /> },
];

function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('/admin');
  const [collapsed, setCollapsed] = useState(false);
  const [userRoles, setUserRoles] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserInfo(user);
        const roles = parseRoles(user.role);
        console.log('解析后的角色:', roles);
        setUserRoles(roles);
      } catch (e) {
        console.error('解析用户信息失败:', e);
      }
    }
  }, []);

  const menuItems = allMenuItems.filter(item => {
    if (item.key === '/profile') {
      return true;
    }
    return hasAnyRole(userRoles, item.roles);
  });

  useEffect(() => {
    if (userRoles.length === 0) {
      return;
    }
    
    const pathname = location.pathname;
    console.log('当前路径:', pathname);
    console.log('可用菜单:', menuItems.map(item => item.key));
    
    const matchedKey = menuItems.find(item => 
      pathname === item.key || pathname.startsWith(item.key + '/')
    )?.key;
    
    if (matchedKey) {
      console.log('匹配的菜单:', matchedKey);
      setSelectedKey(matchedKey);
      return;
    }
    
    const availableMenuKeys = menuItems.filter(item => item.key !== '/profile').map(item => item.key);
    const firstAvailableMenu = availableMenuKeys[0];
    
    if (firstAvailableMenu && firstAvailableMenu !== pathname) {
      console.log('当前路径无权限，重定向到:', firstAvailableMenu);
      navigate(firstAvailableMenu);
      setSelectedKey(firstAvailableMenu);
    }
  }, [location.pathname, userRoles]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
    setMobileMenuOpen(false);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人设置',
      onClick: handleGoToProfile,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key !== selectedKey) {
      navigate(key);
    }
    setMobileMenuOpen(false);
  };

  const bottomNavItems = menuItems.filter(item => 
    item.key !== '/profile' && item.key !== '/users' && item.key !== '/settings'
  );

  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
        <Header style={{ 
          background: HEADER_BG, 
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '56px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Button 
              type="text" 
              icon={mobileMenuOpen ? <XOutlined /> : <MenuOutlined />}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ padding: '8px' }}
            />
            <img 
              src="/logo.png" 
              alt="月星防水" 
              style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isDevEnv && (
              <span style={{ 
                background: '#ef4444', 
                color: '#fff', 
                fontSize: '10px', 
                padding: '2px 6px', 
                borderRadius: '4px',
                fontWeight: '500'
              }}>
                测试版
              </span>
            )}
            <Dropdown 
              menu={{ items: userMenuItems }}
              placement="bottomRight"
            >
              <Avatar 
                size={28} 
                style={{ backgroundColor: PRIMARY_COLOR, cursor: 'pointer' }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </div>
        </Header>

        {mobileMenuOpen && (
          <div style={{ 
            position: 'fixed', 
            top: '56px', 
            left: 0, 
            right: 0, 
            bottom: '56px', 
            background: '#fff', 
            zIndex: 99,
            overflowY: 'auto'
          }}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              style={{ height: '100%', borderRight: 0 }}
              onClick={handleMenuClick}
              items={menuItems.map(item => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
              }))}
            />
          </div>
        )}

        <Content style={{ padding: '16px', paddingBottom: '72px', background: '#f1f5f9', minHeight: 'calc(100vh - 56px)' }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '16px', 
            borderRadius: '8px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
          }}>
            {children}
          </div>
        </Content>

        <div style={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: '#fff', 
          borderTop: '1px solid #e2e8f0', 
          display: 'flex',
          zIndex: 100,
          boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.06)'
        }}>
          {bottomNavItems.map(item => (
            <button
              key={item.key}
              onClick={() => handleMenuClick({ key: item.key })}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 0',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                minHeight: '56px'
              }}
            >
              <span style={{ 
                fontSize: '20px',
                color: selectedKey === item.key ? PRIMARY_COLOR : TEXT_SECONDARY,
                marginBottom: '4px'
              }}>
                {item.icon}
              </span>
              <span style={{ 
                fontSize: '11px',
                color: selectedKey === item.key ? TEXT_COLOR : TEXT_SECONDARY
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Header style={{ 
        background: HEADER_BG, 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '64px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            src="/logo.png" 
            alt="月星防水" 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: TEXT_COLOR, fontSize: '16px', fontWeight: '600', lineHeight: '1.4' }}>
              {APP_NAME}
              </span>
              {isDevEnv && (
                <span style={{ 
                  background: '#ef4444', 
                  color: '#fff', 
                  fontSize: '10px', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: '500'
                }}>
                  测试版
                </span>
              )}
            </div>
            <span style={{ color: TEXT_SECONDARY, fontSize: '12px', lineHeight: '1.4' }}>Since 1947</span>
          </div>
        </div>
        <Dropdown 
          menu={{ items: userMenuItems }}
          placement="bottomRight"
        >
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s'
          }} 
          onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Avatar 
              size={32} 
              style={{ backgroundColor: PRIMARY_COLOR }}
              icon={<UserOutlined />}
            />
            <Space>
              <span style={{ color: TEXT_COLOR, fontSize: '14px' }}>{userInfo?.name || '用户'}</span>
              <DownOutlined style={{ color: TEXT_SECONDARY, fontSize: '12px' }} />
            </Space>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider 
          width={180} 
          collapsedWidth={64}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{ 
            background: SIDER_BG,
            boxShadow: '1px 0 3px rgba(0, 0, 0, 0.06)',
            position: 'sticky',
            top: '64px',
            height: 'calc(100vh - 64px)',
            borderRight: '1px solid #e2e8f0'
          }}
          theme="light"
        >
          <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
            {!collapsed && (
              <div>
                <Title level={5} style={{ color: TEXT_COLOR, marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                  月星防水
                </Title>
                <span style={{ color: TEXT_SECONDARY, fontSize: '12px' }}>月星牌</span>
              </div>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            defaultSelectedKeys={['/admin']}
            style={{ 
              height: 'calc(100% - 65px)', 
              borderRight: 0, 
              background: SIDER_BG,
              paddingTop: '8px'
            }}
            theme="light"
            onClick={handleMenuClick}
            items={menuItems.map(item => ({
              key: item.key,
              icon: (
                <span style={{ 
                  color: selectedKey === item.key ? PRIMARY_COLOR : TEXT_SECONDARY,
                  fontSize: '16px'
                }}>
                  {item.icon}
                </span>
              ),
              label: (
                <span style={{ 
                  color: selectedKey === item.key ? TEXT_COLOR : TEXT_SECONDARY,
                  fontSize: '14px',
                  fontWeight: selectedKey === item.key ? '500' : '400'
                }}>
                  {item.label}
                </span>
              ),
              style: {
                margin: '2px 12px',
                borderRadius: '8px',
                backgroundColor: selectedKey === item.key ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s ease'
              }
            }))}
          />
        </Sider>
        <Content style={{ padding: '24px', background: '#f1f5f9', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ 
            background: '#ffffff', 
            padding: '24px', 
            minHeight: 'calc(100vh - 130px)', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)'
          }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
