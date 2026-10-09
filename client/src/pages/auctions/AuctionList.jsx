import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import auctionService from '../../services/auctionService';
import { Timer, Gavel, Package, Search, Filter, ShieldCheck, MapPin, Sparkles, Flame, CheckCircle2, ArrowRight, Activity, Cpu } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cardamom', 'Black Pepper', 'Coffee & Tea', 'Spices'];

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await auctionService.getAuctions();
        setAuctions(data);
        setFilteredAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  useEffect(() => {
    let result = auctions;

    if (selectedCategory !== 'All') {
      result = result.filter(a => 
        a.productName.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        a.lotNumber.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(a =>
        a.productName.toLowerCase().includes(term) ||
        a.lotNumber.toLowerCase().includes(term) ||
        (a.farmLocation && a.farmLocation.toLowerCase().includes(term))
      );
    }

    setFilteredAuctions(result);
  }, [searchTerm, selectedCategory, auctions]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-emerald-600 border-l-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Connecting to Western Ghats Live Trading Floor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Dark High-Tech Hero Header */}
      <div className="relative bg-slate-950 text-white border-b border-slate-800 overflow-hidden">
        {/* Background Radial Light Effect */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>🔴 Live e-Auction Trading Floor Active</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                High-Range <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">Commodity Bidding</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-3 leading-relaxed font-mono">
                Direct transparent bidding for premium Spices Board & APMC verified cardamom, black pepper, coffee, and tea lots from Bodinayakanur, Puttady, Kumily, and Munnar estates.
              </p>
            </div>

            {/* Trading Telemetry Counter Box */}
            <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-800 space-y-3 min-w-[280px] shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center">
                  <Activity size={13} className="text-emerald-400 mr-1.5" /> Active Lots
                </span>
                <span className="text-lg font-black text-emerald-400 font-mono">{auctions.length} LOTS</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <p className="text-slate-500 text-[9px] uppercase font-bold">Settlement</p>
                  <p className="font-bold text-slate-200 mt-0.5">Smart Contract</p>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <p className="text-slate-500 text-[9px] uppercase font-bold">Regulation</p>
                  <p className="font-bold text-emerald-400 mt-0.5">Spices Board</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category & Search Filter Bar */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex-shrink-0 transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                      : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {cat === 'All' ? '⚡ All Commodity Lots' : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search lot number or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Auction Lots Grid Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuctions.map((auction) => {
            const currentHighest = auction.currentHighestBid ? auction.currentHighestBid.amount : auction.basePrice;
            const imageSrc = auction.images && auction.images.length > 0 ? auction.images[0] : '/images/products/green-cardamom.jpg';

            return (
              <div
                key={auction._id}
                className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:shadow-emerald-950/15 hover:-translate-y-2 hover:border-emerald-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Glowing Top Accent Border */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />

                {/* Produce Photo Banner with Badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={imageSrc}
                    alt={auction.productName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-red-500/90 backdrop-blur-md text-white shadow-md border border-red-400/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      <span>Live Bidding</span>
                    </span>

                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/90 backdrop-blur-md text-slate-950 shadow-md">
                      {auction.qualityGrade || 'Grade A+'}
                    </span>
                  </div>

                  {/* Lot Number & Location on Image Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 z-10">
                    <div className="flex items-center text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      <MapPin size={12} className="mr-1 text-emerald-400" />
                      <span>{auction.farmLocation || 'High Range Estate'}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-white line-clamp-1 leading-tight group-hover:text-emerald-300 transition-colors">
                      {auction.productName}
                    </h3>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Lot Info Bar */}
                  <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-3">
                    <span className="font-mono text-slate-500 text-[11px]">
                      LOT: <strong className="text-slate-800 font-extrabold">{auction.lotNumber}</strong>
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {auction.farmer?.name || 'Verified Grower'}
                    </span>
                  </div>

                  {/* Quality Parameter Telemetry Chips */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 text-[10px] font-mono">
                    <div className="text-center">
                      <p className="text-slate-400 uppercase font-bold text-[9px]">Quantity</p>
                      <p className="font-extrabold text-slate-900 mt-0.5">{auction.quantity} kg</p>
                    </div>
                    <div className="text-center border-x border-slate-200 px-1">
                      <p className="text-slate-400 uppercase font-bold text-[9px]">Moisture</p>
                      <p className="font-extrabold text-emerald-700 mt-0.5">{auction.moisture || 10}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 uppercase font-bold text-[9px]">Aroma</p>
                      <p className="font-extrabold text-slate-900 mt-0.5 line-clamp-1">{auction.aroma || 'Rich'}</p>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl text-xs">
                    <span className="text-slate-600 text-[11px] font-bold flex items-center">
                      <Timer size={14} className="mr-1.5 text-amber-600 animate-pulse" /> Time Remaining:
                    </span>
                    <span className="font-mono font-black text-amber-700 text-xs">
                      {formatDistanceToNow(new Date(auction.endTime))}
                    </span>
                  </div>

                  {/* Pricing Footer */}
                  <div className="pt-2 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">Current Highest Bid</p>
                      <div className="flex items-baseline space-x-1 mt-0.5">
                        <span className="text-2xl font-black font-mono text-emerald-700 tracking-tight">₹{currentHighest}</span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">/kg</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">Base: ₹{auction.basePrice}/kg</p>
                    </div>

                    <Link
                      to={`/auctions/${auction._id}`}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-700/20 hover:scale-[1.03] transition-all flex items-center space-x-1.5 group/btn cursor-pointer"
                    >
                      <Gavel size={14} />
                      <span>Enter Room</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAuctions.length === 0 && (
          <div className="py-16 text-center border-2 border-dashed border-slate-300 rounded-3xl bg-white shadow-sm max-w-xl mx-auto my-12 p-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Gavel size={32} />
            </div>
            <h3 className="text-base font-extrabold text-slate-800">No Auction Lots Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-mono">
              There are no active auctions matching your selected category or search filter right now.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionList;
