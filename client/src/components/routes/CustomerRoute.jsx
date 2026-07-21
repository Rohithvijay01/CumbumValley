import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CustomerRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }
  
  // Customers, Vendors (who inherit customer capabilities), and Admins are authorized
  const role = userInfo.role;
  if (role === 'Customer' || role === 'Buyer' || role === 'Vendor' || role === 'Farmer' || role === 'Admin') {
    return children;
  }
  
  return <Navigate to="/unauthorized" replace />;
};

export default CustomerRoute;
