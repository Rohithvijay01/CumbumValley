import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const VendorRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  
  const role = userInfo.role;
  if (role === 'Vendor' || role === 'Farmer' || role === 'Admin') {
    return children;
  }
  
  // Customers or unauthorized roles attempting vendor routes get redirected to /unauthorized
  return <Navigate to="/unauthorized" replace />;
};

export default VendorRoute;
