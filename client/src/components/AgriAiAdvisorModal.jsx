import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, X, TrendingUp, Cpu, Leaf, ShieldAlert, 
  CheckCircle2, Camera, Upload, Volume2, ArrowUpRight, Zap 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const priceForecastData = [
  { day: 'Day 1', cardamom: 3100, pepper: 650, coffee: 420 },
  { day: 'Day 5', cardamom: 3180, pepper: 660, coffee: 430 },
  { day: 'Day 10', cardamom: 3250, pepper: 675, coffee: 445 },
  { day: 'Day 15', cardamom: 3390, pepper: 690, coffee: 460 },
  { day: 'Day 20', cardamom: 3450, pepper: 710, coffee: 475 },
  { day: 'Day 25', cardamom: 3520, pepper: 725, coffee: 490 },
  { day: 'Day 30', cardamom: 3600, pepper: 740, coffee: 510 },
];

const AgriAiAdvisorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('forecast');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleRunScan = () => {
    setScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setScanning(false);
      setScanResult({
        crop: 'Green Cardamom Leaf (Idukki High-Altitude Variety)',
        healthScore: 96,
        status: 'Optimal Health',
        nitrogenLevel: 'Ideal (1.4%)',
        moisture: '68% (Target Range)',
        recommendation: 'No fungal blight detected. Next organic neem oil spray recommended in 12 days.',
      });
      toast.success('AI Crop Diagnostic Scan Complete! 🌿');
    }, 1200);
  };

  return (
    <>
      {/* Floating AI Button (Bottom Right) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white px-4 py-3 rounded-full shadow-2xl shadow-emerald-500/40 border border-emerald-400/30 cursor-pointer group"
      >
        <div className="relative">
          <Bot size={22} className="text-emerald-100 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-300"></span>
          </span>
        </div>
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline-block pr-1">
          AI AGRI-ADVISOR
        </span>
        <Sparkles size={14} className="text-yellow-300 animate-pulse" />
      </motion.button>

      {/* Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                    <Bot size={28} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-display font-bold text-white">AgriBrain AI Assistant</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                        V4.8 NEURAL
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Autonomous Agricultural Intelligence for Theni & Idukki Farmers
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-950/50 px-6 pt-2">
                {[
                  { id: 'forecast', label: 'AI Price Predictor', icon: TrendingUp },
                  { id: 'cropScan', label: 'AI Crop Health Diagnostic', icon: Cpu },
                  { id: 'voice', label: 'Voice AI Command', icon: Volume2 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
                        isActive
                          ? 'border-emerald-400 text-emerald-400 bg-slate-900/60'
                          : 'border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Tab 1: AI Price Forecast */}
                {activeTab === 'forecast' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-sm font-bold text-slate-200">30-Day Predictive Market Price Curve</h3>
                        <p className="text-xs text-slate-400">Deep learning predictions based on climate trends & regional supply data.</p>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/50">
                        +16.1% Expected Surge
                      </span>
                    </div>

                    <div className="h-64 w-full bg-slate-950/60 rounded-2xl p-4 border border-slate-800">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={priceForecastData}>
                          <defs>
                            <linearGradient id="cardamomGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                          <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                          <Tooltip contentStyle={{ background: '#0F172A', borderColor: '#334155', borderRadius: '12px' }} />
                          <Area type="monotone" dataKey="cardamom" stroke="#10B981" strokeWidth={3} fill="url(#cardamomGrad)" name="Cardamom (₹/kg)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Cardamom Peak</p>
                        <p className="text-sm font-bold text-emerald-400 mt-1">₹3,600 / kg</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Black Pepper Peak</p>
                        <p className="text-sm font-bold text-cyan-400 mt-1">₹740 / kg</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800">
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Coffee Bean Peak</p>
                        <p className="text-sm font-bold text-amber-400 mt-1">₹510 / kg</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: AI Crop Scan */}
                {activeTab === 'cropScan' && (
                  <div className="space-y-6">
                    <div className="text-center py-6 bg-slate-950/60 rounded-2xl border-2 border-dashed border-slate-800 relative">
                      <Camera className="mx-auto h-10 w-10 text-emerald-400 mb-2" />
                      <p className="text-sm font-bold text-slate-200">AI Computer Vision Leaf Diagnostic</p>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                        Upload or capture a photo of your crop leaf for instant neural disease diagnosis & soil nutrient analysis.
                      </p>
                      <button
                        onClick={handleRunScan}
                        disabled={scanning}
                        className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
                      >
                        {scanning ? 'Analyzing Crop DNA & Fungal Patterns...' : 'Run Simulated AI Leaf Scan'}
                      </button>
                    </div>

                    {scanResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="text-emerald-400" size={18} />
                            <span className="text-sm font-bold text-emerald-300">{scanResult.crop}</span>
                          </div>
                          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                            Score: {scanResult.healthScore}%
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{scanResult.recommendation}</p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Tab 3: Voice AI */}
                {activeTab === 'voice' && (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-pulse">
                      <Volume2 size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100">AgriConnect Voice Assistant</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Speak in Tamil, Malayalam, or English to query local market prices or order organic supplies.
                    </p>
                    <button
                      onClick={() => toast.success('Listening... "Enna Cardamom price in Idukki today?"')}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-xs rounded-2xl shadow-xl hover:scale-105 transition-all"
                    >
                      Start Voice Assistant
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AgriAiAdvisorModal;
