import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import API from '../services/api';
import toast from 'react-hot-toast';
import { UserPlus, User, Mail, Lock, Briefcase, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Buyer', // default role
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      dispatch(setCredentials(res.data.data));
      toast.success('System registration successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="bg-slate-900 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Entity Registration</h2>
          <UserPlus size={16} className="text-emerald-500" />
        </div>
        
        <form onSubmit={submitHandler} className="px-6 py-6 space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <User size={12} className="mr-1" /> Legal Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name / Company"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <Mail size={12} className="mr-1" /> Contact Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              value={formData.email}
              onChange={handleChange}
              placeholder="operator@agriconnect.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <Lock size={12} className="mr-1" /> Access Token (Password)
            </label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center">
              <Briefcase size={12} className="mr-1" /> Entity Role
            </label>
            <select
              name="role"
              className="block w-full border border-slate-300 rounded px-3 py-2 text-sm font-mono focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Buyer">Institutional Buyer</option>
              <option value="Farmer">Verified Producer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border border-emerald-800 rounded text-[11px] font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 transition-colors"
          >
            Register Entity <ArrowRight size={14} className="ml-1.5" />
          </button>
        </form>
        
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[11px] font-mono text-slate-600">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-700 font-bold hover:underline">
              System Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
