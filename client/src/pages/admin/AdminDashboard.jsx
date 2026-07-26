import React from 'react';
import { 
  Users, Store, UserCheck, Package, 
  ShoppingCart, DollarSign, Activity, CheckCircle, XCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Jan', vendors: 40, customers: 240 },
  { name: 'Feb', vendors: 30, customers: 139 },
  { name: 'Mar', vendors: 20, customers: 980 },
  { name: 'Apr', vendors: 27, customers: 390 },
  { name: 'May', vendors: 18, customers: 480 },
  { name: 'Jun', vendors: 23, customers: 380 },
  { name: 'Jul', vendors: 34, customers: 430 },
];

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: '₹2.4M', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Vendors', value: '840', icon: Store, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Approvals', value: '12', icon: UserCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Total Products', value: '3,210', icon: Package, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Orders', value: '45.2K', icon: ShoppingCart, color: 'text-pink-600', bg: 'bg-pink-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 mt-1">Platform-wide statistics and management.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-display font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold text-gray-900">User Growth</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="customers" fill="#15803d" radius={[4, 4, 0, 0]} name="Customers" />
                <Bar dataKey="vendors" fill="#84cc16" radius={[4, 4, 0, 0]} name="Vendors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-display font-bold text-gray-900 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-orange-500" />
              Pending Approvals
            </h2>
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">12 New</span>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-4 hover:border-primary-100 transition-colors">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                     <img src={`https://ui-avatars.com/api/?name=Farm+${i}&background=f3f4f6&color=4b5563`} alt="farm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">Highland Organics {i}</p>
                    <p className="text-xs text-gray-500 truncate">Idukki District</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button className="flex-1 flex justify-center items-center py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 text-sm font-medium transition-colors">
                    <CheckCircle size={16} className="mr-1.5" /> Approve
                  </button>
                  <button className="flex-1 flex justify-center items-center py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 text-sm font-medium transition-colors">
                    <XCircle size={16} className="mr-1.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <Link to="/admin/auctions" className="block text-center w-full mt-4 py-2.5 text-primary-600 font-medium text-sm hover:bg-primary-50 rounded-xl transition-colors">
            View All Requests & Live Auctions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
