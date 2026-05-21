import { useEffect } from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import CustomerServiceList from '../components/CustomerServiceList';
import AppLayout from '../components/Layout';

const { Title } = Typography;

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.needChangePassword) {
        navigate('/profile');
      }
    }
  }, [navigate]);

  return (
    <AppLayout>
      <Title level={2}>客服项目</Title>
      <CustomerServiceList />
    </AppLayout>
  );
}

export default Admin;
