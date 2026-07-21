import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cpu, MapPin, Thermometer, Droplets, Leaf, X, ExternalLink, Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const BlockchainTraceabilityModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const hash = '0x8f4b29a1e3092c45d8b7a1024391c52089ef71c3';

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success('Smart Contract Hash Copied! 🔗');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Banner / Button Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center space-x-2 bg-slate-900 text-emerald-400 hover:bg-slate-800 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
      >
        <ShieldCheck size={16} className="text-emerald-400" />
        <span>Inspect Blockchain Batch Ledger</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/60">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center">
                      AgriChain 2030 Smart Contract Ledger
                    </h3>
                    <p className="text-xs text-slate-400">Immutable Soil-to-Table Provenance Verification</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
                {/* Contract Hash */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="truncate pr-4">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Polygon AgriNet Contract Hash</p>
                    <p className="text-xs font-mono text-emerald-400 truncate mt-0.5">{hash}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-900 rounded-xl border border-slate-800 transition-colors"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Provenance Steps */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Batch Provenance Audit</h4>
                  
                  <div className="space-y-3 relative pl-6 border-l-2 border-emerald-500/30">
                    <div className="relative">
                      <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                      <p className="text-xs font-bold text-white">Harvested at Nedumkandam, Idukki</p>
                      <p className="text-[11px] text-slate-400">GPS: 9.8512° N, 77.1421° E • Soil Moisture: 68%</p>
                    </div>

                    <div className="relative pt-2">
                      <span className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-cyan-500 border-2 border-slate-900"></span>
                      <p className="text-xs font-bold text-white">IoT Cold-Chain Storage Logged</p>
                      <p className="text-[11px] text-slate-400">Temperature: 18.2°C • Humidity: 55% • Humidity Sensor #490</p>
                    </div>

                    <div className="relative pt-2">
                      <span className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-amber-500 border-2 border-slate-900"></span>
                      <p className="text-xs font-bold text-white">Organic Quality Verified by Spices Board</p>
                      <p className="text-[11px] text-slate-400">Certificate #IND-2030-9940 • Zero Chemical Residue</p>
                    </div>
                  </div>
                </div>

                {/* Carbon Offset */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Leaf className="text-emerald-400" size={20} />
                    <div>
                      <p className="text-xs font-bold text-slate-200">Direct Farm Carbon Offset</p>
                      <p className="text-[11px] text-slate-400">Skipping middlemen saved 14.8 kg CO₂ emissions for this batch.</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-xl">
                    +15 EcoCredits
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlockchainTraceabilityModal;
