import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  DollarSign, Package, ShoppingCart, TrendingUp, 
  AlertTriangle, Users, Calendar, ChevronRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const VendorDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const stats = [
    { label: "Today's Sales", value: '₹12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Orders', value: '8', icon: ShoppingCart, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Low Stock Alerts', value: '3', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Total Products', value: '45', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">Vendor Analytics Dashboard</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link to="/create-product" className="px-4 py-2 bg-primary-600 text-white font-medium rounded-xl shadow-sm hover:bg-primary-700 transition-all">
            + Add Product
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="mt-2 text-3xl font-display font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">12%</span>
              <span className="text-gray-400 ml-2">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold text-gray-900">Revenue Overview</h2>
            <select aria-label="Revenue timeframe" className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 transition-colors">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#15803d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#15803d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#15803d" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold text-gray-900">Recent Orders</h2>
            <Link to="/vendor/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    M{i}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Muthu Kumar</p>
                    <p className="text-xs text-gray-500">2 mins ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹850</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
