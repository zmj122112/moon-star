import { useState } from 'react';
import { Modal, Button, Alert, Space } from 'antd';
import { RefreshCwOutlined } from '@ant-design/icons';
import { cloudbase } from '../cloudbase';
import { withOperator } from '../utils/auth';

const PRIMARY_COLOR = '#2563eb';
const PRIMARY_HOVER = '#1d4ed8';
const TEXT_COLOR = '#1e293b';
const TEXT_SECONDARY = '#64748b';

function ResetPasswordModal({ userId, phone, onSuccess, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await cloudbase.callFunction({
        name: 'reset-password',
        data: withOperator({ userId })
      });

      if (res.result.code === 200) {
        setResult(res.result.data);
      } else {
        setError(res.result.message || '重置失败');
      }
    } catch (err) {
      setError(err.message || '重置失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="重置密码"
      visible={true}
      onCancel={onCancel}
      footer={null}
      width={400}
    >
      {error && (
        <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />
      )}

      {result ? (
        <div>
          <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', marginBottom: '16px' }}>
            <p style={{ margin: '0 0 8px', color: '#166534', fontWeight: '600' }}>密码重置成功！</p>
            <p style={{ margin: '0', color: '#15803d', fontSize: '14px' }}>
              新密码为：<strong>{result.defaultPassword}</strong>
            </p>
            <p style={{ margin: '8px 0 0', color: '#15803d', fontSize: '12px' }}>
              用户下次登录时需要强制修改密码
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onSuccess} style={{ borderRadius: '8px' }}>
              确定
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: '16px', color: TEXT_COLOR }}>
            确定要重置用户 <strong>{phone}</strong> 的密码吗？
          </p>
          <p style={{ marginBottom: '16px', color: TEXT_SECONDARY, fontSize: '14px' }}>
            重置后，密码将恢复为手机号后六位，用户下次登录时需要强制修改密码。
          </p>
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={onCancel} style={{ borderRadius: '8px' }}>
                取消
              </Button>
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                icon={<RefreshCwOutlined />}
                style={{ 
                  backgroundColor: PRIMARY_COLOR,
                  borderColor: PRIMARY_COLOR,
                  borderRadius: '8px'
                }}
                hoverStyle={{ backgroundColor: PRIMARY_HOVER, borderColor: PRIMARY_HOVER }}
              >
                确认重置
              </Button>
            </Space>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ResetPasswordModal;
