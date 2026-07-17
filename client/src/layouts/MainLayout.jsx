import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-right" />
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                AgriConnect
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/products" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Marketplace</Link>
              {userInfo ? (
                <>
                  {userInfo.role === 'Farmer' && (
                    <Link to="/create-product" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">List Product</Link>
                  )}
                  {userInfo.role === 'Buyer' && (
                    <Link to="/my-orders" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">My Orders</Link>
                  )}
                  <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  <Link to="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AgriConnect. Supporting Theni & Idukki Farmers.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
