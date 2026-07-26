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
    { label: "Today's Sales", value: '₹12,450', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-100' },
    { label: 'Pending Orders', value: '8', icon: ShoppingCart, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-100' },
    { label: 'Low Stock Alerts', value: '3', icon: AlertTriangle, color: 'text-red-700', bg: 'bg-red-50 border-red-100' },
    { label: 'Total Products', value: '45', icon: Package, color: 'text-slate-700', bg: 'bg-slate-100 border-slate-200' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vendor Analytics</h1>
          <p className="text-slate-500 mt-1 text-sm">Overview of your marketplace performance.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link to="/create-product" className="px-4 py-2 bg-emerald-700 text-white text-sm font-bold rounded-md hover:bg-emerald-800 transition-colors border border-emerald-800">
            + Add Product
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-md p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-mono font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-2 rounded border ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold">
              <TrendingUp className="h-3 w-3 text-emerald-600 mr-1" />
              <span className="text-emerald-700">12%</span>
              <span className="text-slate-400 ml-1.5 uppercase tracking-wider">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-md p-5 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Revenue Overview</h2>
            <select aria-label="Revenue timeframe" className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block p-1.5 transition-colors uppercase tracking-wider">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#047857" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700, fontFamily: 'monospace'}} dx={-10} />
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#047857" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-md border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 flex justify-between items-center border-b border-slate-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Recent Orders</h2>
            <Link to="/vendor/orders" className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 uppercase tracking-wider flex items-center">
              View all <ChevronRight size={12} className="ml-0.5" />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-bold text-slate-900">Muthu Kumar</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">2 mins ago</p>
                    </td>
                    <td className="p-4 text-right">
                      <p className="text-sm font-bold font-mono text-slate-900 mb-1">₹850</p>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
