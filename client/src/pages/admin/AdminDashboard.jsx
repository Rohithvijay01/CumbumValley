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
    { label: 'Total Revenue', value: '₹2.4M', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50 border border-emerald-100' },
    { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-700', bg: 'bg-blue-50 border border-blue-100' },
    { label: 'Active Vendors', value: '840', icon: Store, color: 'text-emerald-700', bg: 'bg-emerald-50 border border-emerald-100' },
    { label: 'Pending Approvals', value: '12', icon: UserCheck, color: 'text-amber-700', bg: 'bg-amber-50 border border-amber-100' },
    { label: 'Total Products', value: '3,210', icon: Package, color: 'text-indigo-700', bg: 'bg-indigo-50 border border-indigo-100' },
    { label: 'Total Orders', value: '45.2K', icon: ShoppingCart, color: 'text-slate-700', bg: 'bg-slate-100 border border-slate-200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6 border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
        <p className="text-slate-500 mt-1 text-sm">Platform-wide statistics and management.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-md p-4 border border-slate-200 shadow-sm flex flex-col items-start justify-between">
            <div className={`${stat.bg} p-2 rounded mb-3`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{stat.label}</p>
              <p className="mt-1 text-xl font-mono font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white rounded-md p-5 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">User Growth</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700, fontFamily: 'monospace'}} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Bar dataKey="customers" fill="#047857" radius={[2, 2, 0, 0]} name="Customers" />
                <Bar dataKey="vendors" fill="#84cc16" radius={[2, 2, 0, 0]} name="Vendors" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-md border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center p-5 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center">
              <Activity className="mr-2 h-4 w-4 text-amber-600" />
              Pending Approvals
            </h2>
            <span className="bg-amber-100 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">12 New</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-slate-200 rounded p-4 hover:border-slate-300 transition-colors bg-slate-50">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                     <img src={`https://ui-avatars.com/api/?name=Farm+${i}&background=f8fafc&color=0f172a`} alt="farm" className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate tracking-tight">Highland Organics {i}</p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider truncate">Idukki District</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 flex justify-center items-center py-1.5 bg-white border border-emerald-300 text-emerald-700 rounded hover:bg-emerald-50 hover:border-emerald-500 text-xs font-bold uppercase tracking-wider transition-colors">
                    <CheckCircle size={14} className="mr-1" /> Approve
                  </button>
                  <button className="flex-1 flex justify-center items-center py-1.5 bg-white border border-red-300 text-red-700 rounded hover:bg-red-50 hover:border-red-500 text-xs font-bold uppercase tracking-wider transition-colors">
                    <XCircle size={14} className="mr-1" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-slate-100">
            <Link to="/admin/auctions" className="block text-center w-full py-2 bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-wider hover:bg-slate-200 rounded transition-colors">
              View All Requests & Live Auctions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
