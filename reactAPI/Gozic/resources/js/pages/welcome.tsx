import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginPage from '../pages/auth/Login'; 
import AdminDashboard from './auth/AdminDashboard'; 
import UpdateUserPage from './auth/AdminUpdateUsers';
import DeleteUsers from './auth/AdminDeleteUsers';
import Register from './auth/Register';
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute';
import UsersDashboard from '@/pages/Users/UsersDashboard';

const Welcome = () => {
  return (
    <Router> 
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/AdminDashboard"
            element={
              <PrivateRoute roleRequired="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/UserDashboard" element={<UsersDashboard />} />
          <Route path="/update/:id" element={<UpdateUserPage />} />
          <Route path="/delete/:id" element={<DeleteUsers />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default Welcome;
