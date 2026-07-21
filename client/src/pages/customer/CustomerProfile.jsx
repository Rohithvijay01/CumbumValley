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
      <div className="bg-white rounded-3xl shadow-soft border border-gray-100 mb-8 overflow-hidden">
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary-600 to-secondary-500 relative">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          {/* Farm-themed overlay pattern could go here */}
        </div>
        
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full bg-white p-1.5 shadow-lg relative z-10">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || 'User')}&background=f0fdf4&color=15803d&size=200`} 
                  alt="Profile" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-primary-600 z-20 transition-colors">
                <Edit3 size={16} />
              </button>
            </div>
            
            <div className="text-center sm:text-left flex-1 pb-2">
              <h1 className="text-3xl font-display font-bold text-gray-900">{userInfo?.name}</h1>
              <p className="text-gray-500 font-medium">Customer Account</p>
            </div>
            
            <div className="pb-2">
              <button className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl shadow-sm hover:bg-primary-700 hover:shadow transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'personal' && (
            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-6">Personal Details</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="text" defaultValue={userInfo?.name} className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 py-2.5 focus:bg-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="email" defaultValue={userInfo?.email} className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 py-2.5 focus:bg-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input type="tel" placeholder="+91 98765 43210" className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 py-2.5 focus:bg-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Map className="h-5 w-5 text-gray-400" />
                      </div>
                      <select className="pl-10 block w-full border-gray-200 rounded-xl bg-gray-50 py-2.5 focus:bg-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors">
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
            <div className="bg-white rounded-3xl shadow-soft border border-gray-100 p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Module Under Construction</h3>
              <p className="mt-2 text-sm text-gray-500">This section will be available soon.</p>
            </div>
          )}

          {/* Danger Zone */}
          <div className="mt-8 bg-red-50 rounded-3xl p-6 border border-red-100">
            <h3 className="text-lg font-bold text-red-800 mb-2">Danger Zone</h3>
            <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="flex items-center px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium shadow-sm">
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
