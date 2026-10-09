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
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-slate-900 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Create Account</h2>
            <p className="text-xs text-slate-400 mt-0.5">Join CumbumValley Marketplace</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <UserPlus size={18} />
          </div>
        </div>
        
        <form onSubmit={submitHandler} className="px-6 py-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center">
              <User size={12} className="mr-1.5 text-emerald-600 dark:text-emerald-400" /> Full Name / Company
            </label>
            <input
              type="text"
              name="name"
              required
              className="block w-full border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rohith V / High Range Spices"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center">
              <Mail size={12} className="mr-1.5 text-emerald-600 dark:text-emerald-400" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="block w-full border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center">
              <Lock size={12} className="mr-1.5 text-emerald-600 dark:text-emerald-400" /> Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength="6"
              className="block w-full border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center">
              <Briefcase size={12} className="mr-1.5 text-emerald-600 dark:text-emerald-400" /> I am joining as
            </label>
            <select
              name="role"
              className="block w-full border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Buyer">Buyer / Customer</option>
              <option value="Farmer">Farmer / Producer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer mt-2"
          >
            Create Account <ArrowRight size={14} className="ml-1.5" />
          </button>
        </form>
        
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Already registered?{' '}
            <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
