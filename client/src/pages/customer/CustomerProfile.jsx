import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  User, Mail, Phone, MapPin, Map, Bell, 
  Shield, CreditCard, Download, Trash2, Edit3 
} from 'lucide-react';

const CustomerProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover Banner & Profile */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200 mb-6 overflow-hidden flex flex-col md:flex-row md:items-center p-6 md:p-8 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-6 flex-1">
          <div className="relative group">
            <div className="h-20 w-20 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || 'User')}&background=f8fafc&color=0f172a&size=100`} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{userInfo?.name}</h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-1">Customer Account</p>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <button className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded border border-emerald-800 hover:bg-emerald-600 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-md shadow-sm border border-slate-200 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-slate-100 text-slate-900 border border-slate-200' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <tab.icon size={14} className={activeTab === tab.id ? 'text-slate-700' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'personal' && (
            <div className="bg-white rounded-md shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 border-b border-slate-100 pb-2">Personal Details</h2>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                      </div>
                      <input type="text" defaultValue={userInfo?.name} className="pl-9 block w-full border border-slate-300 rounded bg-white py-2 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-mono transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <input type="email" defaultValue={userInfo?.email} className="pl-9 block w-full border border-slate-300 rounded bg-white py-2 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-mono transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-400" />
                      </div>
                      <input type="tel" placeholder="+91 98765 43210" className="pl-9 block w-full border border-slate-300 rounded bg-white py-2 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-mono transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">District</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Map className="h-4 w-4 text-slate-400" />
                      </div>
                      <select className="pl-9 block w-full border border-slate-300 rounded bg-white py-2 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm font-mono transition-colors">
                        <option>Theni</option>
                        <option>Idukki</option>
                        <option>Madurai</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Other tabs can go here */}
          {activeTab !== 'personal' && (
            <div className="bg-white rounded-md shadow-sm border border-slate-200 p-12 text-center">
              <div className="mx-auto w-12 h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Module Under Construction</h3>
              <p className="mt-1 text-xs text-slate-500">This section will be available soon.</p>
            </div>
          )}

          {/* Danger Zone */}
          <div className="mt-6 bg-white rounded-md p-6 border border-red-200 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-700 mb-2 border-b border-red-100 pb-2">Danger Zone</h3>
            <p className="text-xs text-red-600/80 mb-4 font-mono">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="flex items-center px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded hover:bg-red-100 transition-colors text-xs font-bold uppercase tracking-wider">
              <Trash2 size={14} className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
