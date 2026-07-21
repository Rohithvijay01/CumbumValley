import React, { useState, useEffect } from 'react';
import { Radio, TrendingUp, Clock, Gavel, Sparkles, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const LiveAuctionTicker = () => {
  const [auctions, setAuctions] = useState([
    {
      id: 'AUC-8091',
      crop: 'Idukki 8mm Green Cardamom',
      location: 'Spices Board Auction Centre, Nedumkandam',
      currentBid: 3250,
      unit: 'kg',
      bidsCount: 48,
      timeLeft: 124, // seconds
      status: 'LIVE',
    },
    {
      id: 'AUC-8092',
      crop: 'Bodinayakanur Black Pepper (MG1 Grade)',
      location: 'Theni Commodity Exchange',
      currentBid: 680,
      unit: 'kg',
      bidsCount: 32,
      timeLeft: 340,
      status: 'LIVE',
    },
    {
      id: 'AUC-8093',
      crop: 'Munnar Organic Orthodox Tea Batch #4',
      location: 'Tea Trade Centre, Idukki',
      currentBid: 410,
      unit: 'kg',
      bidsCount: 19,
      timeLeft: 512,
      status: 'LIVE',
    },
  ]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions((prev) =>
        prev.map((auc) => ({
          ...auc,
          timeLeft: auc.timeLeft > 0 ? auc.timeLeft - 1 : 600,
          currentBid: Math.random() > 0.7 ? auc.currentBid + 10 : auc.currentBid,
          bidsCount: Math.random() > 0.7 ? auc.bidsCount + 1 : auc.bidsCount,
        }))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const rotate = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % auctions.length);
    }, 6000);
    return () => clearInterval(rotate);
  }, [auctions.length]);

  const current = auctions[activeIdx];

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlaceBid = (cropName, currentPrice) => {
    const newBid = currentPrice + 20;
    toast.success(`Smart Bid Placed: ₹${newBid}/kg for ${cropName}! 🚀`, {
      style: {
        borderRadius: '16px',
        background: '#0F172A',
        color: '#38BDF8',
        border: '1px solid #1E293B',
      },
    });
  };

  return (
    <div className="bg-slate-900 text-slate-100 py-2.5 px-4 shadow-lg border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Indicator */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="flex items-center space-x-1.5 bg-red-500/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-full text-xs font-extrabold tracking-wider animate-pulse">
            <Radio size={12} className="text-red-400 animate-ping" />
            <span>2030 LIVE E-AUCTION</span>
          </span>
          <span className="hidden lg:inline-flex items-center text-xs text-slate-400 font-medium">
            <Sparkles size={12} className="text-amber-400 mr-1" />
            Theni & Idukki Direct Commodity Exchange
          </span>
        </div>

        {/* Center Live Ticker Item */}
        <div className="flex items-center space-x-4 text-xs md:text-sm font-medium overflow-hidden">
          <span className="text-slate-300 font-bold truncate max-w-[200px] sm:max-w-xs">
            {current.crop}
          </span>
          <span className="text-emerald-400 font-extrabold text-sm flex items-center">
            <TrendingUp size={14} className="mr-1 text-emerald-400" />
            ₹{current.currentBid} / {current.unit}
          </span>
          <span className="text-slate-400 hidden sm:inline-block">
            {current.bidsCount} Bids
          </span>
          <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded-md font-mono text-xs flex items-center">
            <Clock size={12} className="mr-1" />
            {formatTime(current.timeLeft)}
          </span>
        </div>

        {/* Right Quick Action */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => handlePlaceBid(current.crop, current.currentBid)}
            className="inline-flex items-center px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs shadow-md hover:from-emerald-400 hover:to-teal-400 active:scale-95 transition-all"
          >
            <Gavel size={12} className="mr-1" />
            Place Smart Bid (+₹20)
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionTicker;
