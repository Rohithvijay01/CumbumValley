import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? children : <Navigate to="/login" replace />;
};

import CustomerRoute from './components/routes/CustomerRoute';
import VendorRoute from './components/routes/VendorRoute';
import AdminRoute from './components/routes/AdminRoute';

import CustomerDashboard from './pages/customer/CustomerDashboard';
import CustomerProfile from './pages/customer/CustomerProfile';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorProfile from './pages/vendor/VendorProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';

// A dynamic router for the generic /dashboard and /profile links
const DynamicDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) return <Navigate to="/login" replace />;
  if (userInfo.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
  if (userInfo.role === 'Vendor') return <Navigate to="/vendor/dashboard" replace />;
  return <Navigate to="/customer/dashboard" replace />;
};

const DynamicProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) return <Navigate to="/login" replace />;
  if (userInfo.role === 'Admin') return <Navigate to="/admin/dashboard" replace />; // Admin profile can just be dashboard for now, or add AdminProfile
  if (userInfo.role === 'Vendor') return <Navigate to="/vendor/profile" replace />;
  return <Navigate to="/customer/profile" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          
          {/* Dynamic redirectors */}
          <Route path="dashboard" element={<DynamicDashboard />} />
          <Route path="profile" element={<DynamicProfile />} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Customer Routes */}
          <Route path="customer/dashboard" element={<CustomerRoute><CustomerDashboard /></CustomerRoute>} />
          <Route path="customer/profile" element={<CustomerRoute><CustomerProfile /></CustomerRoute>} />
          <Route path="checkout" element={<CustomerRoute><Checkout /></CustomerRoute>} />
          <Route path="my-orders" element={<CustomerRoute><MyOrders /></CustomerRoute>} />

          {/* Vendor Routes */}
          <Route path="vendor/dashboard" element={<VendorRoute><VendorDashboard /></VendorRoute>} />
          <Route path="vendor/profile" element={<VendorRoute><VendorProfile /></VendorRoute>} />
          <Route path="create-product" element={<VendorRoute><CreateProduct /></VendorRoute>} />
          
          {/* Admin Routes */}
          <Route path="admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
