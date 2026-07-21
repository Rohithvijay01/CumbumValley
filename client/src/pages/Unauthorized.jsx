import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldAlert, ArrowLeft, LayoutDashboard, Home, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Unauthorized = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (!userInfo) return '/login';
    if (userInfo.role === 'Admin') return '/admin/dashboard';
    if (userInfo.role === 'Vendor' || userInfo.role === 'Farmer') return '/vendor/dashboard';
    return '/customer/dashboard';
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-100 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="mx-auto w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-red-100">
          <ShieldAlert size={40} />
        </div>

        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
          403 Access Denied
        </span>

        <h1 className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">
          Unauthorized Privilege Area
        </h1>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          Your current account role <span className="font-bold text-gray-800">({userInfo?.role || 'Guest'})</span> does not have authorization to access this page or resource.
        </p>

        <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left text-xs text-gray-600 space-y-1.5">
          <div className="flex items-center space-x-2 text-gray-700 font-bold">
            <Lock size={14} className="text-red-500" />
            <span>Role-Based Access System Enforced</span>
          </div>
          <p className="text-gray-500">If you believe this is an error, please contact your AgriConnect platform administrator or log in with an authorized role.</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft size={16} className="mr-1.5" /> Go Back
          </button>
          
          <Link
            to={getDashboardLink()}
            className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center"
          >
            <LayoutDashboard size={16} className="mr-1.5" /> My Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
