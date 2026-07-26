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
      <section className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col items-start">
          <div className="inline-flex items-center space-x-2 bg-slate-800 border border-slate-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-6">
            <Sprout size={12} className="text-emerald-500" />
            <span>Western Ghats Agricultural Exchange</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-slate-50">
            Wholesale Trading Terminal for <span className="text-emerald-500">Premium Commodities</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mb-8 font-mono">
            Direct market access to verified farmers in Theni and Idukki. Procure spices, coffee, tea, and produce with transparent pricing and blockchain traceability.
          </p>

          {/* Search Bar / CTA */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl flex items-center bg-slate-950 border border-slate-700 rounded focus-within:border-emerald-500 transition-colors">
            <div className="pl-4 text-slate-500">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search commodities (e.g., Cardamom 8mm, Robusta)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 outline-none text-slate-200 text-sm bg-transparent placeholder:text-slate-600 font-mono"
            />
            <button type="submit" className="bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white px-6 py-3 border-l border-emerald-800 text-[11px] font-bold uppercase tracking-wider transition-colors flex-shrink-0">
              Execute Search
            </button>
          </form>
          
          <div className="mt-8 flex items-center space-x-6 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5"><MapPin size={14} className="text-emerald-500"/><span>Theni & Idukki Zones</span></span>
            <span className="flex items-center space-x-1.5"><ShieldCheck size={14} className="text-emerald-500"/><span>KYC Verified Sellers</span></span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Commodity Indices</h2>
              <p className="text-xs font-mono text-slate-500 mt-1">Browse market sectors and active listings</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center space-x-1 text-emerald-700 text-[11px] font-bold uppercase tracking-wider hover:text-emerald-800 transition-colors">
              <span>View All Sectors</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Spices & Condiments', desc: 'Cardamom, Pepper, Clove', id: 'spices' },
              { name: 'Coffee & Tea', desc: 'Robusta, Arabica, CTC', id: 'beverages' },
              { name: 'Fresh Produce', desc: 'Fruits, Vegetables, Tubers', id: 'produce' },
              { name: 'Honey & Oils', desc: 'Wild Honey, Coconut Oil', id: 'extracts' },
            ].map((category, idx) => (
              <Link key={idx} to="/products" className="group bg-white border border-slate-200 rounded p-4 hover:border-emerald-500 transition-colors flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-slate-700 group-hover:text-emerald-600 transition-colors">
                    <Sprout size={18} />
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">{category.name}</h3>
                <p className="text-[11px] font-mono text-slate-500">{category.desc}</p>
              </Link>
            ))}
          </div>
          <Link to="/products" className="sm:hidden mt-6 flex items-center justify-center space-x-1 text-emerald-700 text-[11px] font-bold uppercase tracking-wider hover:text-emerald-800 transition-colors">
            <span>View All Sectors</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      
      {/* Value Proposition */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Platform Infrastructure</h2>
            <p className="text-xs font-mono text-slate-500">Enterprise-grade procurement and traceability features.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded p-5 bg-slate-50 flex flex-col items-start">
              <div className="text-emerald-600 mb-4 bg-emerald-100 p-2 rounded">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Immutable Traceability</h3>
              <p className="text-[11px] font-mono text-slate-600 leading-relaxed mb-4 flex-grow">Transaction data and quality metrics are anchored to Polygon AgriNet smart contracts for verifiable supply chain audits.</p>
              <BlockchainTraceabilityModal />
            </div>
            
            <div className="border border-slate-200 rounded p-5 bg-slate-50 flex flex-col items-start">
              <div className="text-emerald-600 mb-4 bg-emerald-100 p-2 rounded">
                <MapPin size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Direct Procurement</h3>
              <p className="text-[11px] font-mono text-slate-600 leading-relaxed">Disintermediate the supply chain. Connect directly with farm-gate operations in Western Ghats agricultural zones.</p>
            </div>
            
            <div className="border border-slate-200 rounded p-5 bg-slate-50 flex flex-col items-start">
              <div className="text-emerald-600 mb-4 bg-emerald-100 p-2 rounded">
                <Store size={20} />
              </div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Market Efficiency</h3>
              <p className="text-[11px] font-mono text-slate-600 leading-relaxed">Real-time price discovery and transparent bidding mechanics ensure optimal pricing for both growers and institutional buyers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

