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
      <section className="relative bg-slate-950 border-b border-slate-800 text-white overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity scale-105 transition-all duration-700 hover:scale-100"
          style={{ backgroundImage: `url('/images/cardamom_hero_bg.png'), url('/images/products/green-cardamom.jpg')` }}
        />
        
        {/* Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 flex flex-col items-start">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sprout size={14} className="text-emerald-400 animate-pulse" />
            <span>Western Ghats Agricultural Exchange</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-4xl text-white leading-tight">
            Wholesale Trading Terminal for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Premium Commodities</span>
          </h1>
          
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mb-8 font-mono leading-relaxed backdrop-blur-xs bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
            Direct market access to verified farmers in Theni and Idukki. Procure spices, coffee, tea, and produce with transparent pricing and blockchain traceability.
          </p>

          {/* Search Bar / CTA */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl flex items-center bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-2xl transition-all">
            <div className="pl-4 text-slate-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder="Search commodities (e.g., Cardamom 8mm, Robusta)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3.5 outline-none text-slate-100 text-sm bg-transparent placeholder:text-slate-500 font-mono"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-slate-950 font-extrabold px-6 py-3.5 border-l border-emerald-700 text-[11px] uppercase tracking-wider transition-all rounded-r-xl flex-shrink-0 cursor-pointer">
              Execute Search
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap items-center gap-6 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <MapPin size={14} className="text-emerald-400"/>
              <span>Theni & Idukki Zones</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <ShieldCheck size={14} className="text-emerald-400"/>
              <span>KYC Verified Sellers</span>
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-14 bg-slate-50/80 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                <Sparkles size={12} className="text-emerald-500 animate-pulse" />
                <span>Regional Commodities</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Commodity Indices</h2>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Browse active agricultural sectors and direct farm listings</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold uppercase tracking-wider hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group">
              <span>View All Sectors</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { name: 'Spices & Condiments', desc: 'Cardamom, Pepper, Clove', id: 'spices', icon: Sprout, gradient: 'from-emerald-500 to-teal-600' },
              { name: 'Coffee & Tea', desc: 'Robusta, Arabica, CTC', id: 'beverages', icon: Cpu, gradient: 'from-amber-500 to-orange-600' },
              { name: 'Fresh Produce', desc: 'Fruits, Vegetables, Tubers', id: 'produce', icon: Store, gradient: 'from-green-500 to-emerald-600' },
              { name: 'Honey & Oils', desc: 'Wild Honey, Coconut Oil', id: 'extracts', icon: ShieldCheck, gradient: 'from-cyan-500 to-blue-600' },
            ].map((category, idx) => {
              const Icon = category.icon;
              return (
                <Link 
                  key={idx} 
                  to="/products" 
                  className="group relative bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Animated Accent Border */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  
                  {/* Light Sweep Layer */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-100/30 dark:via-emerald-500/10 to-transparent pointer-events-none shine-sweep opacity-0 group-hover:opacity-100" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md group-hover:shadow-emerald-600/30 transition-all duration-300">
                      <Icon size={18} />
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:border-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-slate-800 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">
                      <ArrowRight size={14} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {category.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link to="/products" className="sm:hidden mt-6 flex items-center justify-center space-x-1 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider hover:text-emerald-800 transition-colors">
            <span>View All Sectors</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      
      {/* Value Proposition */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Enterprise Features</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Platform Infrastructure</h2>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">Enterprise-grade procurement and blockchain traceability features.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-2.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
              {/* Glowing Top Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-100/30 dark:via-emerald-500/10 to-transparent pointer-events-none shine-sweep opacity-0 group-hover:opacity-100" />

              <div className="flex flex-col items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200/80 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all duration-300">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                  Immutable Traceability
                </h3>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                  Transaction data and quality metrics are anchored to Polygon AgriNet smart contracts for verifiable supply chain audits.
                </p>
                <BlockchainTraceabilityModal />
              </div>
            </div>
            
            <div className="group relative border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-2.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-teal-100/30 dark:via-emerald-500/10 to-transparent pointer-events-none shine-sweep opacity-0 group-hover:opacity-100" />

              <div className="flex flex-col items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200/80 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-teal-600/30 transition-all duration-300">
                  <MapPin size={22} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 group-hover:text-teal-800 dark:group-hover:text-emerald-400 transition-colors">
                  Direct Procurement
                </h3>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                  Disintermediate the supply chain. Connect directly with farm-gate operations in Western Ghats agricultural zones.
                </p>
              </div>
            </div>
            
            <div className="group relative border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-900 dark:to-slate-950 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-950/10 hover:-translate-y-2.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-emerald-100/30 dark:via-emerald-500/10 to-transparent pointer-events-none shine-sweep opacity-0 group-hover:opacity-100" />

              <div className="flex flex-col items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200/80 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-emerald-600/30 transition-all duration-300">
                  <Store size={22} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                  Market Efficiency
                </h3>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time price discovery and transparent bidding mechanics ensure optimal pricing for both growers and institutional buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

