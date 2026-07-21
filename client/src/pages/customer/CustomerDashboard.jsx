import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Heart, MapPin, Award, 
  Package, TrendingUp, Clock, ChevronRight
} from 'lucide-react';

const CustomerDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const quickStats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Wishlist', value: '5', icon: Heart, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Saved Addresses', value: '2', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Loyalty Points', value: '450', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome & Profile Section */}
      <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-400 p-[3px] shadow-md flex-shrink-0">
            <div className="h-full w-full rounded-full bg-white overflow-hidden border-2 border-white">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || 'User')}&background=f0fdf4&color=15803d&size=200`} 
                alt="avatar" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Welcome back, {userInfo?.name}! 👋
            </h1>
            <p className="text-gray-500 mt-1 flex items-center justify-center md:justify-start">
              <MapPin size={16} className="mr-1" />
              Theni, Tamil Nadu
            </p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Member since 2024
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Gold Tier
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto">
            <Link to="/customer/profile" className="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-200 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-display font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Orders */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-gray-900 flex items-center">
                <Package className="mr-2 h-5 w-5 text-primary-600" />
                Recent Orders
              </h2>
              <Link to="/my-orders" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                View all <ChevronRight size={16} />
              </Link>
            </div>
            
            <div className="space-y-4">
              {/* Dummy Order 1 */}
              <div className="border border-gray-100 rounded-2xl p-4 hover:border-primary-100 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Order #ORD-8439</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">Organic Cardamom & 2 more items</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    On the way
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center"><Clock size={14} className="mr-1" /> Arriving Today</span>
                  <span className="font-medium text-gray-900">₹1,250</span>
                </div>
              </div>

              {/* Dummy Order 2 */}
              <div className="border border-gray-100 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Order #ORD-7102</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">Fresh Farm Vegetables</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Delivered
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="flex items-center"><Clock size={14} className="mr-1" /> Delivered on Oct 12</span>
                  <span className="font-medium text-gray-900">₹450</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          
          {/* Recommendations */}
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <h2 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary-600" />
              Seasonal Picks
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img src="/images/products/green-cardamom.jpg" alt="Cardamom" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Premium Idukki Cardamom</p>
                  <p className="text-sm text-primary-600 font-bold">₹2,800/kg</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
                  <img src="/images/products/cumbum-grapes.jpg" alt="Grapes" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Fresh Cumbum Grapes</p>
                  <p className="text-sm text-primary-600 font-bold">₹80/kg</p>
                </div>
              </div>
            </div>
            <Link to="/products" className="mt-6 w-full flex justify-center py-2.5 border border-primary-200 text-primary-700 rounded-xl hover:bg-primary-50 font-medium text-sm transition-colors">
              Explore Marketplace
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
