import { HashRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Login from './pages/Login';
import Admin from './pages/Admin';
import WorkOrderDetail from './pages/WorkOrderDetail';
import UserManagement from './pages/UserManagement';
import ProfileSettings from './pages/ProfileSettings';
import ProjectManager from './pages/ProjectManager';
import ProjectManagerDetail from './pages/ProjectManagerDetail';
import Dashboard from './pages/Dashboard';
import OperationRollback from './pages/OperationRollback';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/admin/order/:id" element={
            <ProtectedRoute>
              <WorkOrderDetail />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          } />
          <Route path="/project-manager" element={
            <ProtectedRoute>
              <ProjectManager />
            </ProtectedRoute>
          } />
          <Route path="/project-manager/order/:id" element={
            <ProtectedRoute>
              <ProjectManagerDetail />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/operations/rollback" element={
            <ProtectedRoute>
              <OperationRollback />
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </ConfigProvider>
  );
}

export default App;
