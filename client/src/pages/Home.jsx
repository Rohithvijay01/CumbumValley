import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, Sprout, ArrowRight, Store, Cpu, Sparkles } from 'lucide-react';
import BlockchainTraceabilityModal from '../components/BlockchainTraceabilityModal';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/products');
    }
  };
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary-950 text-white rounded-b-[2rem] sm:rounded-b-[3rem] shadow-xl">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-500 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-accent blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
          <span className="inline-flex items-center space-x-2 bg-primary-900/50 backdrop-blur-sm border border-primary-800 px-3 py-1 rounded-full text-primary-200 text-sm font-medium mb-6">
            <Sprout size={16} />
            <span>Empowering Western Ghats Farmers</span>
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight mb-6 max-w-4xl">
            Fresh from the Farms to <span className="text-primary-400">Your Doorstep</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mb-10 leading-relaxed font-light">
            Discover premium spices, coffee, tea, and fresh produce directly from farmers in Theni and Idukki. No middlemen, just pure quality.
          </p>

          {/* Search Bar / CTA */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl bg-white rounded-2xl p-2 flex shadow-2xl items-center ring-4 ring-primary-900/60 focus-within:ring-primary-400 transition-all">
            <div className="pl-4 text-gray-400">
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder="Search for cardamom, coffee, honey..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 outline-none text-gray-900 text-lg bg-transparent placeholder:text-gray-400 font-medium"
            />
            <button type="submit" className="bg-primary-600 hover:bg-primary-700 active:scale-95 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md flex-shrink-0">
              Search
            </button>
          </form>
          
          <div className="mt-8 flex items-center space-x-6 text-sm text-primary-200">
            <span className="flex items-center space-x-1.5"><MapPin size={16}/><span>Theni & Idukki</span></span>
            <span className="flex items-center space-x-1.5"><ShieldCheck size={16}/><span>Verified Sellers</span></span>
          </div>
        </div>
      </section>

      {/* Categories / Quick Links */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">Explore Categories</h2>
            <p className="text-muted-foreground mt-2">Find exactly what you need from our local producers</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center space-x-1 text-primary-600 font-medium hover:text-primary-700 transition-colors">
            <span>View all</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Spices', color: 'bg-amber-100', text: 'text-amber-700' },
            { name: 'Coffee & Tea', color: 'bg-brown-100', text: 'text-orange-900' },
            { name: 'Fresh Fruits', color: 'bg-green-100', text: 'text-green-700' },
            { name: 'Honey & Oils', color: 'bg-yellow-100', text: 'text-yellow-700' },
          ].map((category, idx) => (
            <Link key={idx} to="/products" className="group rounded-2xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary-200 bg-white flex flex-col items-center justify-center text-center">
              <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${category.color} ${category.text} group-hover:scale-110 transition-transform duration-300`}>
                <Sprout size={32} />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">{category.name}</h3>
            </Link>
          ))}
        </div>
        <Link to="/products" className="sm:hidden mt-6 flex items-center justify-center space-x-1 text-primary-600 font-medium hover:text-primary-700 transition-colors">
          <span>View all products</span>
          <ArrowRight size={18} />
        </Link>
      </section>
      
      {/* Value Proposition */}
      <section className="bg-primary-50 py-20 border-y border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Why Choose AgriConnect?</h2>
            <p className="text-muted-foreground text-lg">We bridge the gap between hard-working farmers and quality-conscious buyers.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center flex flex-col items-center">
              <div className="bg-primary-100 text-primary-700 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified 2030 Quality</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Every farmer batch is logged to Polygon AgriNet smart contracts for soil-to-table traceability.</p>
              <BlockchainTraceabilityModal />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center">
              <div className="bg-accent/10 text-accent w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Direct from Source</h3>
              <p className="text-muted-foreground leading-relaxed">Produce comes straight from the farms of Theni and Idukki to your doorstep, minimizing transit time.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border text-center">
              <div className="bg-secondary/10 text-secondary w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Store size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fair Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">By removing middlemen, farmers get better margins and buyers get high-quality products at fair prices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

