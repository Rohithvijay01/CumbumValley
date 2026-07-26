import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Store, MapPin, Phone, Mail, Globe, Clock, ShieldCheck, Edit3, Image as ImageIcon
} from 'lucide-react';

const VendorProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Store Banner */}
      <div className="bg-white rounded-3xl shadow-soft border border-gray-100 mb-8 overflow-hidden">
        <div className="h-48 md:h-64 relative bg-gray-200">
          <img 
            src="/images/products/tea-leaves.jpg" 
            alt="Store Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-colors">
            <ImageIcon size={20} />
          </button>
        </div>
        
        <div className="px-6 sm:px-10 pb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative group">
              <div className="h-32 w-32 rounded-2xl bg-white p-1.5 shadow-lg relative z-10">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || 'Vendor')}&background=f0fdf4&color=15803d&size=200`} 
                  alt="Store Logo" 
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-primary-600 z-20 transition-colors">
                <Edit3 size={16} />
              </button>
            </div>
            
            <div className="text-center sm:text-left flex-1 pb-2">
              <h1 className="text-3xl font-display font-bold text-gray-900 flex items-center justify-center sm:justify-start">
                Green Valley Farms
                <ShieldCheck className="ml-2 text-blue-500" size={24} />
              </h1>
              <p className="text-gray-200 font-medium absolute top-[-40px] left-40 sm:static sm:text-gray-500 mt-1">
                Verified Vendor • Member since 2023
              </p>
            </div>
            
            <div className="pb-2 flex space-x-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2.5 bg-primary-50 text-primary-700 font-medium rounded-xl hover:bg-primary-100 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              {isEditing && (
                <button className="px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl shadow-sm hover:bg-primary-700 hover:shadow transition-all">
                  Save
                </button>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 max-w-3xl text-center sm:text-left">
            We are a 3rd generation farming family located in the heart of Idukki. We specialize in organic spices, particularly Cardamom and Black Pepper. All our products are hand-picked and sun-dried for the best quality and aroma.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Business Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Business Info</h2>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-600">
                <MapPin className="text-primary-600 flex-shrink-0 mt-0.5" size={18} />
                <span>142/B, Munnar Road, Nedumkandam, Idukki District, Kerala 685553</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="text-primary-600 flex-shrink-0" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="text-primary-600 flex-shrink-0" size={18} />
                <span>contact@greenvalley.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600">
                <Globe className="text-primary-600 flex-shrink-0" size={18} />
                <span>www.greenvalleyfarms.in</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-600 pt-4 border-t border-gray-100">
                <Clock className="text-primary-600 flex-shrink-0" size={18} />
                <div>
                  <p className="font-medium text-gray-900">Working Hours</p>
                  <p>Mon-Sat: 8:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Certifications</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="text-green-500" size={20} />
                  <span className="text-sm font-medium text-gray-900">Organic Farming Certificate</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Store className="text-blue-500" size={20} />
                  <span className="text-sm font-medium text-gray-900">FSSAI License</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <Store className="text-teal-500" size={20} />
                  <span className="text-sm font-medium text-gray-900">GST Registration</span>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Store Configuration */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-6">Store Configuration</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Delivery Radius (km)</label>
                  <input type="number" disabled={!isEditing} defaultValue={50} className="block w-full border-gray-200 rounded-xl bg-gray-50 py-2.5 px-4 focus:bg-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors disabled:opacity-70" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Minimum Order Value (₹)</label>
                  <input type="number" disabled={!isEditing} defaultValue={500} className="block w-full border-gray-200 rounded-xl bg-gray-50 py-2.5 px-4 focus:bg-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors disabled:opacity-70" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-4">
                  <input id="pickup" type="checkbox" disabled={!isEditing} defaultChecked className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                  <label htmlFor="pickup" className="ml-2 block text-sm font-medium text-gray-700">
                    Allow Direct Farm Pickup
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input id="vacation" type="checkbox" disabled={!isEditing} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                  <label htmlFor="vacation" className="ml-2 block text-sm font-medium text-gray-700">
                    Vacation Mode (Temporarily hide products from marketplace)
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-soft border border-gray-100">
            <h2 className="text-lg font-display font-bold text-gray-900 mb-6">Farm Images Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 group relative">
                <img src="/images/products/cardamom-plants.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Farm 1" />
                {isEditing && (
                  <button className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="aspect-square rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 group relative">
                <img src="/images/products/coffee-saplings.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Farm 2" />
                {isEditing && (
                  <button className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              
              {isEditing && (
                <div className="aspect-square rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:text-primary-600 hover:border-primary-400 hover:bg-primary-50 transition-colors cursor-pointer">
                  <ImageIcon size={28} className="mb-2" />
                  <span className="text-sm font-medium">Add Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
