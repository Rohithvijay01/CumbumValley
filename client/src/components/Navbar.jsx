import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { 
  Leaf, Search, Bell, Heart, ShoppingCart, MessageSquare, 
  User, LayoutDashboard, Settings, LogOut, Package, Moon, Sun
} from 'lucide-react';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('#profile-menu')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!userInfo) return '/login';
    if (userInfo.role === 'Admin') return '/admin/dashboard';
    if (userInfo.role === 'Vendor') return '/vendor/dashboard';
    return '/customer/dashboard';
  };

  const getProfileLink = () => {
    if (!userInfo) return '/login';
    if (userInfo.role === 'Admin') return '/admin/dashboard';
    if (userInfo.role === 'Vendor') return '/vendor/profile';
    return '/customer/profile';
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-soft transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary-100 text-primary-700 p-2 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <Leaf size={24} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-display font-bold text-gray-900 tracking-tight group-hover:text-primary-700 transition-colors">
                AgriConnect
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all duration-300"
                placeholder="Search for organic spices, fruits, vegetables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          
          {/* Right Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Common Icons */}
            <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors hidden sm:block">
              <Moon size={20} />
            </button>
            <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors hidden sm:block px-2">
              Marketplace
            </Link>

            {userInfo && (userInfo.role === 'Vendor' || userInfo.role === 'Farmer') && (
              <Link to="/create-product" className="bg-primary-50 text-primary-700 hover:bg-primary-100 px-3.5 py-2 rounded-xl text-xs font-bold transition-all hidden md:flex items-center space-x-1">
                <span>+ List Produce</span>
              </Link>
            )}

            {userInfo ? (
              <>
                {/* Icons available to Customers & Vendors (who inherit customer capabilities) */}
                {(userInfo.role === 'Customer' || userInfo.role === 'Buyer' || userInfo.role === 'Vendor' || userInfo.role === 'Farmer') && (
                  <>
                    <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors relative">
                      <Heart size={20} />
                    </button>
                    <Link to="/checkout" className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors relative">
                      <ShoppingCart size={20} />
                      <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                        2
                      </span>
                    </Link>
                  </>
                )}
                
                <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors hidden sm:block">
                  <MessageSquare size={20} />
                </button>

                {/* Profile Dropdown */}
                <div className="relative ml-2" id="profile-menu">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-400 p-[2px] shadow-sm">
                      <div className="h-full w-full rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=f0fdf4&color=15803d`} 
                          alt="avatar" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-2xl shadow-soft bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 py-1 transition-all">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name}</p>
                        <p className="text-xs text-primary-600 font-bold capitalize truncate">{userInfo.role}</p>
                      </div>
                      
                      <div className="py-1">
                        <Link to={getDashboardLink()} className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                          <LayoutDashboard className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                          Dashboard
                        </Link>
                        <Link to={getProfileLink()} className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                          <User className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                          Profile
                        </Link>

                        {(userInfo.role === 'Customer' || userInfo.role === 'Buyer' || userInfo.role === 'Vendor' || userInfo.role === 'Farmer') && (
                          <Link to="/my-orders" className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                            <Package className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                            My Orders
                          </Link>
                        )}

                        <Link to="/settings" className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700">
                          <Settings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                          Settings
                        </Link>
                      </div>
                      
                      <div className="py-1">
                        <button 
                          onClick={handleLogout}
                          className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="mr-3 h-4 w-4 text-red-500" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 ml-2">
                <Link to="/login" className="text-gray-600 hover:text-primary-700 font-medium text-sm transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-primary-600 text-white hover:bg-primary-700 px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
