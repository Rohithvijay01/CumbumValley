import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Toaster } from 'react-hot-toast';
import { Leaf, Store, LogIn, UserPlus, LogOut, LayoutDashboard, PlusCircle, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import AgriAiAdvisorModal from '../components/AgriAiAdvisorModal';

const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link 
      to={to} 
      className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive(to) 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
      }`}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <Toaster position="top-right" />

      {/* Global 2030 AI Assistant Floating Trigger */}
      <AgriAiAdvisorModal />

      {/* Top Banner */}
      <div className="bg-primary-700 text-white text-xs py-1.5 px-4 text-center font-medium shadow-inner">
        Connecting Theni & Idukki Farmers Directly to You 🌿
      </div>

      <Navbar />

      <main className="flex-1 w-full mx-auto pb-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf size={24} className="text-primary-600" />
                <span className="text-xl font-display font-bold text-foreground">AgriConnect</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-sm">
                Empowering farmers in the Western Ghats region by connecting them directly with consumers. Fresh spices, coffee, and produce without middlemen.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/products" className="hover:text-primary-600 transition-colors">Marketplace</Link></li>
                <li><Link to="/about" className="hover:text-primary-600 transition-colors">Our Story</Link></li>
                <li><Link to="/farmers" className="hover:text-primary-600 transition-colors">Meet the Farmers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} AgriConnect. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with ❤️ for Theni & Idukki</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
