import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/');
        return;
      }
      
      try {
        const parsedUser = JSON.parse(user);
        if (!parsedUser || !parsedUser.name || !parsedUser.role) {
          localStorage.removeItem('user');
          navigate('/');
        }
      } catch {
        localStorage.removeItem('user');
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  const user = localStorage.getItem('user');
  if (!user) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;