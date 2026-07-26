import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { 
  Search, Bell, ShoppingCart, MessageSquare, 
  User, LayoutDashboard, Settings, LogOut, Package 
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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-xl font-display font-bold text-slate-900 tracking-tight">
                AgriConnect
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-sm bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors"
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
          
          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            
            <Link to="/products" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors hidden sm:block px-2">
              Marketplace
            </Link>
            <Link to="/auctions" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors hidden sm:block px-2">
              Live Bidding
            </Link>

            {userInfo && (userInfo.role === 'Vendor' || userInfo.role === 'Farmer') && (
              <Link to="/create-product" className="bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 px-3 py-1.5 rounded-md text-xs font-bold transition-colors hidden md:flex items-center">
                List Produce
              </Link>
            )}

            {userInfo ? (
              <>
                {(userInfo.role === 'Customer' || userInfo.role === 'Buyer' || userInfo.role === 'Vendor' || userInfo.role === 'Farmer') && (
                  <Link to="/checkout" className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors relative">
                    <ShoppingCart size={18} />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                      2
                    </span>
                  </Link>
                )}
                
                <button className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors relative">
                  <Bell size={18} />
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative ml-2" id="profile-menu">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full border border-slate-300 overflow-hidden bg-slate-100 flex items-center justify-center">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=f8fafc&color=0f172a`} 
                        alt="avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-sm bg-white border border-slate-200 divide-y divide-slate-100 py-1 z-50">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-slate-900 truncate">{userInfo.name}</p>
                        <p className="text-xs text-slate-500 font-medium capitalize truncate">{userInfo.role}</p>
                      </div>
                      
                      <div className="py-1">
                        <Link to={getDashboardLink()} className="group flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <LayoutDashboard className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                          Dashboard
                        </Link>
                        <Link to={getProfileLink()} className="group flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <User className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                          Profile
                        </Link>

                        {(userInfo.role === 'Customer' || userInfo.role === 'Buyer' || userInfo.role === 'Vendor' || userInfo.role === 'Farmer') && (
                          <Link to="/my-orders" className="group flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                            <Package className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                            My Orders
                          </Link>
                        )}

                        <Link to="/settings" className="group flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <Settings className="mr-3 h-4 w-4 text-slate-400 group-hover:text-slate-600" />
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
                <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-primary-700 text-white hover:bg-primary-800 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors">
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
