import { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Space } from 'antd';
import { LockOutlined, UserOutlined, SaveOutlined } from '@ant-design/icons';
import cloudbase from '@cloudbase/js-sdk';
import AppLayout from '../components/Layout';

const { Title, Text } = Typography;

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

const app = cloudbase.init({
  env: 'waterproof-3g9f7h9kdb626bb3'
});

function ProfileSettings({ onPasswordChanged }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form] = Form.useForm();

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await app.callFunction({
        name: 'change-password',
        data: {
          userId: user?.userId,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword
        }
      });

      if (result.result.code === 200) {
        setSuccess('密码修改成功！');
        form.resetFields();
        
        const updatedUser = { ...user, needChangePassword: false };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        if (onPasswordChanged) {
          onPasswordChanged();
        }
      } else {
        setError(result.result.message || '修改失败');
      }
    } catch (err) {
      setError(err.message || '修改失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Text type="warning">请先登录</Text>
      </div>
    );
  }

  return (
    <AppLayout>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '0', color: TEXT_COLOR }}>个人设置</Title>
        </div>

        {user?.needChangePassword && (
          <div style={{ 
            backgroundColor: '#fee2e2', 
            borderLeft: '4px solid #ef4444', 
            padding: '12px 16px', 
            marginBottom: '24px',
            borderRadius: '0 8px 8px 0'
          }}>
            <p style={{ margin: '0', color: '#dc2626', fontSize: '14px', fontWeight: '500' }}>
              <strong>安全提示：</strong>您正在使用初始密码登录，请立即修改密码以保障账户安全。
            </p>
          </div>
        )}

        <Card style={{ borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)', maxWidth: '500px' }}>
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              backgroundColor: PRIMARY_COLOR,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UserOutlined style={{ color: '#fff', fontSize: '24px' }} />
            </div>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: '600', color: TEXT_COLOR }}>
                {user.name}
              </p>
              <p style={{ margin: '0', fontSize: '14px', color: TEXT_SECONDARY }}>
                {user.phone}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />
        )}

        {success && (
          <Alert message={success} type="success" showIcon style={{ marginBottom: '16px' }} />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[
              { required: true, message: '请输入当前密码' },
              { min: 6, message: '密码长度不能少于6位' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: TEXT_SECONDARY }} />}
              placeholder="请输入当前密码"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度不能少于6位' },
              { pattern: /^(?=.*[a-zA-Z])(?=.*\d)/, message: '密码需包含字母和数字' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: TEXT_SECONDARY }} />}
              placeholder="请输入新密码（至少6位，包含字母和数字）"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: TEXT_SECONDARY }} />}
              placeholder="请再次输入新密码"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0', textAlign: 'right' }}>
            <Space>
              <Button
                onClick={() => form.resetFields()}
                style={{ borderRadius: '8px' }}
              >
                重置
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<SaveOutlined />}
                style={{ 
                  backgroundColor: PRIMARY_COLOR,
                  borderColor: PRIMARY_COLOR,
                  borderRadius: '8px'
                }}
                hoverStyle={{ backgroundColor: PRIMARY_HOVER, borderColor: PRIMARY_HOVER }}
              >
                保存修改
              </Button>
            </Space>
          </Form.Item>
        </Form>
        </Card>
      </div>
    </AppLayout>
  );
}

export default ProfileSettings;