import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import cloudbase from '@cloudbase/js-sdk';
import { useNavigate } from 'react-router-dom';
import { CLOUDBASE_ENV_ID } from '../config/env';

const { Title, Text } = Typography;

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

const app = cloudbase.init({
  env: CLOUDBASE_ENV_ID
});

function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initLoading, setInitLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await app.auth({ persistence: 'local' }).signInAnonymously();
        console.log('匿名登录成功');
      } catch (e) {
        console.log('匿名登录失败:', e.message);
      } finally {
        setInitLoading(false);
      }
    };
    initAuth();
  }, []);

  const onFinish = async (values) => {
    if (initLoading) {
      setError('系统初始化中，请稍后');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      console.log('登录参数:', values);
      
      const result = await app.callFunction({
        name: 'login',
        data: {
          phone: values.username,
          password: values.password
        }
      });

      console.log('云函数返回:', result);

      if (!result || !result.result) {
        setError('云函数调用失败，请稍后重试');
        return;
      }

      if (result.result.code === 200) {
        localStorage.setItem('user', JSON.stringify(result.result.data));
        localStorage.setItem('token', result.result.data.token);
        
        if (result.result.data.needChangePassword) {
          navigate('/profile');
        } else {
          navigate('/admin');
        }
      } else {
        setError(result.result.message || '登录失败');
      }
    } catch (err) {
      console.error('登录错误:', err);
      setError(err.message || '登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  const cardPadding = isMobile ? '16px' : '24px';
  const inputHeight = isMobile ? '50px' : '44px';
  const buttonHeight = isMobile ? '50px' : '44px';
  const buttonFontSize = isMobile ? '16px' : '15px';
  const logoSize = isMobile ? '64px' : '72px';
  const titleSize = isMobile ? '18px' : '20px';

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '16px' : '20px',
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: '420px', 
          borderRadius: isMobile ? '16px' : '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: 'none',
          overflow: 'hidden'
        }}
        className="login-card"
      >
        <div style={{ 
          padding: cardPadding,
          textAlign: 'center',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: cardPadding
        }}>
          <img 
            src="/logo.png" 
            alt="月星防水" 
            style={{ 
              width: logoSize, 
              height: logoSize, 
              borderRadius: '12px',
              objectFit: 'cover',
              marginBottom: '12px'
            }}
          />
          <Title level={3} style={{ color: TEXT_COLOR, marginBottom: '8px', fontSize: titleSize, fontWeight: '600' }}>
            月星防水
          </Title>
          <Text style={{ color: TEXT_SECONDARY, fontSize: isMobile ? '14px' : '14px' }}>
            企业管理平台
          </Text>
        </div>

        <div style={{ padding: `0 ${isMobile ? '20px' : '32px'} ${cardPadding}` }}>
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              style={{ marginBottom: '20px' }}
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              label="手机号"
              rules={[
                { required: true, message: '请输入手机号' }
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input 
                prefix={<UserOutlined style={{ color: TEXT_SECONDARY, fontSize: '16px' }} />}
                placeholder="请输入手机号"
                style={{ 
                  borderRadius: '8px',
                  height: inputHeight,
                  borderColor: '#e2e8f0',
                  transition: 'all 0.2s ease',
                  fontSize: '15px'
                }}
                focusStyle={{ 
                  borderColor: PRIMARY_COLOR,
                  boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码长度不能少于6位' }
              ]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: TEXT_SECONDARY, fontSize: '16px' }} />}
                placeholder="请输入密码"
                style={{ 
                  borderRadius: '8px',
                  height: inputHeight,
                  borderColor: '#e2e8f0',
                  transition: 'all 0.2s ease',
                  fontSize: '15px'
                }}
                focusStyle={{ 
                  borderColor: PRIMARY_COLOR,
                  boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`
                }}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: '0', marginTop: '8px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  style={{ 
                    width: '100%', 
                    height: buttonHeight,
                    borderRadius: '8px',
                    backgroundColor: PRIMARY_COLOR,
                    borderColor: PRIMARY_COLOR,
                    fontWeight: '500',
                    fontSize: buttonFontSize,
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                    transition: 'all 0.2s ease'
                  }}
                  hoverStyle={{ 
                    backgroundColor: PRIMARY_HOVER,
                    borderColor: PRIMARY_HOVER,
                    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)'
                  }}
                >
                  {loading ? '登录中...' : '登 录'}
                </Button>
              </Space>
            </Form.Item>
          </Form>

          <div style={{ 
            marginTop: isMobile ? '24px' : '28px', 
            textAlign: 'center',
            color: TEXT_SECONDARY,
            fontSize: '12px'
          }}>
            © 2024 月星防水 · 月星牌 · 版权所有
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
