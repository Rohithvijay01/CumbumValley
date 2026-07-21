import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  
  if (userInfo.role === 'Admin') {
    return children;
  }
  
  // Unauthorized users trying to access Admin console get redirected to /unauthorized
  return <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;
