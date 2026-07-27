import React from 'react';
import { ShieldAlert, AlertTriangle, Info, DollarSign, TrendingUp, CheckCircle2 } from 'lucide-react';

const ExtensionResponseCard = ({ advice }) => {
  if (!advice) return null;

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
      case 'critical':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      default:
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    }
  };

  return (
    <div className="mt-6 bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4 font-sans relative overflow-hidden">
      {/* Officer Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            🌿
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Extension Officer Directive</h4>
            <p className="text-[10px] text-slate-400">Western Ghats Agriculture Department Format</p>
          </div>
        </div>

        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadge(advice.priorityLevel)}`}>
          {advice.priorityLevel || 'Medium'} Priority
        </span>
      </div>

      {/* Summary */}
      <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
        <p className="text-xs font-semibold text-slate-200 leading-relaxed">
          📌 <span className="font-bold text-white">Summary:</span> {advice.summary}
        </p>
      </div>

      {/* Explanation */}
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center">
          <Info size={12} className="mr-1.5 text-blue-400" /> Agronomic Rationale
        </p>
        <p className="text-xs text-slate-300 leading-normal pl-4 border-l-2 border-slate-700">
          {advice.explanation}
        </p>
      </div>

      {/* Recommended Action */}
      <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
        <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center mb-1">
          <CheckCircle2 size={13} className="mr-1.5 text-emerald-400" /> Action Protocol
        </p>
        <p className="text-xs font-medium text-emerald-100">
          {advice.recommendedAction}
        </p>
      </div>

      {/* Cost & Benefit Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40 flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <DollarSign size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Estimated Cost</p>
            <p className="text-xs font-bold text-amber-300">{advice.estimatedCost || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40 flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <TrendingUp size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Expected Benefit</p>
            <p className="text-xs font-bold text-emerald-300">{advice.expectedBenefit || 'Higher Yield'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionResponseCard;
