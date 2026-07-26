import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  Store, MapPin, Phone, Mail, Globe, Clock, ShieldCheck, Edit3, Image as ImageIcon, Trash2
} from 'lucide-react';

const VendorProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Store Banner */}
      <div className="bg-white rounded-md shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div className="h-32 md:h-48 relative bg-slate-900">
          <img 
            src="/images/products/tea-leaves.jpg" 
            alt="Store Banner" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <button className="absolute top-4 right-4 p-1.5 bg-slate-800/80 rounded border border-slate-700 text-white hover:bg-slate-700 transition-colors">
            <ImageIcon size={16} />
          </button>
          
          <div className="absolute bottom-0 left-0 w-full px-6 py-4 flex items-end justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded bg-white p-0.5 shadow-sm">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo?.name || 'Vendor')}&background=f8fafc&color=0f172a&size=100`} 
                  alt="Store Logo" 
                  className="h-full w-full rounded object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center tracking-tight">
                  Green Valley Farms
                  <ShieldCheck className="ml-2 text-emerald-400" size={20} />
                </h1>
                <p className="text-slate-300 text-xs font-mono mt-0.5 uppercase tracking-wider">
                  Verified Vendor • Since 2023
                </p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-slate-700 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button className="px-4 py-1.5 bg-emerald-600 border border-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-emerald-500 transition-colors">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-200">
          <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
            We are a 3rd generation farming family located in the heart of Idukki. We specialize in organic spices, particularly Cardamom and Black Pepper. All our products are hand-picked and sun-dried for the best quality and aroma.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Business Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-md p-5 border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Business Info</h2>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-slate-600">
                <MapPin className="text-slate-400 flex-shrink-0 mt-0.5" size={16} />
                <span>142/B, Munnar Road, Nedumkandam, Idukki District, Kerala 685553</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-600">
                <Phone className="text-slate-400 flex-shrink-0" size={16} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-600">
                <Mail className="text-slate-400 flex-shrink-0" size={16} />
                <span>contact@greenvalley.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-600">
                <Globe className="text-slate-400 flex-shrink-0" size={16} />
                <span>www.greenvalleyfarms.in</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-slate-600 pt-3 border-t border-slate-100">
                <Clock className="text-slate-400 flex-shrink-0" size={16} />
                <div>
                  <p className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-0.5">Working Hours</p>
                  <p className="font-mono text-xs">Mon-Sat: 8:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-md p-5 border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Certifications</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="text-emerald-600" size={16} />
                  <span className="text-sm font-bold text-slate-700">Organic Farming</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded uppercase tracking-wider">Verified</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded">
                <div className="flex items-center space-x-3">
                  <Store className="text-blue-600" size={16} />
                  <span className="text-sm font-bold text-slate-700">FSSAI License</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded uppercase tracking-wider">Verified</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded">
                <div className="flex items-center space-x-3">
                  <Store className="text-slate-600" size={16} />
                  <span className="text-sm font-bold text-slate-700">GST Registration</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded uppercase tracking-wider">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Store Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-md p-5 border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Store Configuration</h2>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Delivery Radius (km)</label>
                  <input type="number" disabled={!isEditing} defaultValue={50} className="block w-full border border-slate-300 rounded bg-white py-2 px-3 font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Min Order (₹)</label>
                  <input type="number" disabled={!isEditing} defaultValue={500} className="block w-full border border-slate-300 rounded bg-white py-2 px-3 font-mono text-sm focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors disabled:bg-slate-50 disabled:text-slate-500" />
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center mb-3">
                  <input id="pickup" type="checkbox" disabled={!isEditing} defaultChecked className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded disabled:opacity-50" />
                  <label htmlFor="pickup" className="ml-2 block text-sm font-bold text-slate-700">
                    Allow Direct Farm Pickup
                  </label>
                </div>
                <div className="flex items-center mb-1">
                  <input id="vacation" type="checkbox" disabled={!isEditing} className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded disabled:opacity-50" />
                  <label htmlFor="vacation" className="ml-2 block text-sm font-bold text-slate-700">
                    Vacation Mode (Hide products)
                  </label>
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-md p-5 border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Farm Images Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="aspect-square rounded bg-slate-100 overflow-hidden border border-slate-200 group relative">
                <img src="/images/products/cardamom-plants.jpg" className="w-full h-full object-cover" alt="Farm 1" />
                {isEditing && (
                  <button className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              <div className="aspect-square rounded bg-slate-100 overflow-hidden border border-slate-200 group relative">
                <img src="/images/products/coffee-saplings.jpg" className="w-full h-full object-cover" alt="Farm 2" />
                {isEditing && (
                  <button className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              
              {isEditing && (
                <div className="aspect-square rounded bg-slate-50 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-700 hover:border-emerald-500 hover:bg-emerald-50 transition-colors cursor-pointer">
                  <ImageIcon size={24} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Add Image</span>
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
