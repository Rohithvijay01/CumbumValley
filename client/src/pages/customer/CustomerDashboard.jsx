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
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-slate-700', bg: 'bg-slate-100 border border-slate-200' },
    { label: 'Wishlist', value: '5', icon: Heart, color: 'text-slate-700', bg: 'bg-slate-100 border border-slate-200' },
    { label: 'Saved Addresses', value: '2', icon: MapPin, color: 'text-slate-700', bg: 'bg-slate-100 border border-slate-200' },
    { label: 'Loyalty Points', value: '450', icon: Award, color: 'text-emerald-700', bg: 'bg-emerald-50 border border-emerald-100' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome & Profile Section */}
      <div className="bg-white rounded-md p-6 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-5">
          <div className="h-16 w-16 rounded bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || 'User')}&background=f8fafc&color=0f172a&size=100`} 
              alt="avatar" 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Welcome back, {userInfo?.name}
            </h1>
            <div className="mt-1 flex items-center space-x-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
              <span className="flex items-center">
                <MapPin size={12} className="mr-1" />
                Theni, Tamil Nadu
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">Gold Tier</span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex-shrink-0">
          <Link to="/customer/profile" className="inline-flex justify-center items-center px-4 py-2 border border-slate-300 text-xs font-bold uppercase tracking-wider rounded text-slate-700 bg-white hover:bg-slate-50 transition-colors">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-md p-4 border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{stat.label}</p>
              <p className="mt-1 text-xl font-mono font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className={`p-2 rounded ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Orders */}
          <div className="bg-white rounded-md border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center">
                <Package className="mr-2 h-4 w-4 text-emerald-700" />
                Recent Orders
              </h2>
              <Link to="/my-orders" className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-800 flex items-center">
                View all <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Dummy Order 1 */}
              <div className="border border-slate-200 rounded p-4 hover:border-slate-300 transition-colors bg-slate-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Order #ORD-8439</span>
                    <p className="text-sm font-bold text-slate-900 mt-1 tracking-tight">Organic Cardamom & 2 more items</p>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 border border-blue-200 text-blue-800">
                    On the way
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center font-mono"><Clock size={12} className="mr-1" /> Arriving Today</span>
                  <span className="font-mono font-bold text-slate-900">₹1,250</span>
                </div>
              </div>

              {/* Dummy Order 2 */}
              <div className="border border-slate-200 rounded p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Order #ORD-7102</span>
                    <p className="text-sm font-bold text-slate-900 mt-1 tracking-tight">Fresh Farm Vegetables</p>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600">
                    Delivered
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center font-mono"><Clock size={12} className="mr-1" /> Delivered on Oct 12</span>
                  <span className="font-mono font-bold text-slate-900">₹450</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          
          {/* Recommendations */}
          <div className="bg-white rounded-md p-5 border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-emerald-700" />
              Seasonal Picks
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden">
                  <img src="/images/products/green-cardamom.jpg" alt="Cardamom" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate tracking-tight">Premium Idukki Cardamom</p>
                  <p className="text-xs font-mono font-bold text-emerald-700">₹2,800/kg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded bg-slate-100 border border-slate-200 flex-shrink-0 overflow-hidden">
                  <img src="/images/products/cumbum-grapes.jpg" alt="Grapes" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate tracking-tight">Fresh Cumbum Grapes</p>
                  <p className="text-xs font-mono font-bold text-emerald-700">₹80/kg</p>
                </div>
              </div>
            </div>
            <Link to="/products" className="mt-5 w-full flex justify-center py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded hover:bg-slate-200 text-xs font-bold uppercase tracking-wider transition-colors">
              Explore Marketplace
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
