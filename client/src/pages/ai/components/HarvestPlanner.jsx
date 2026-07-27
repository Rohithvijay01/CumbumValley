import React, { useState } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { Calendar, DollarSign, Award, Warehouse, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const HarvestPlanner = ({ currentCrop }) => {
  const [crop, setCrop] = useState(currentCrop || 'Cardamom');
  const [areaAcres, setAreaAcres] = useState(2);
  const [expectedYieldKg, setExpectedYieldKg] = useState(350);
  const [pricePerKg, setPricePerKg] = useState(2450);
  const [loading, setLoading] = useState(false);
  const [harvestData, setHarvestData] = useState(null);

  const handlePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiService.getHarvestPlan({
        crop, areaAcres, expectedYieldKg, pricePerKg
      });
      setHarvestData(data.data);
      toast.success('Harvest strategy calculated!');
    } catch (err) {
      toast.error('Failed to calculate harvest plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Calendar className="text-emerald-600 mr-2" size={22} />
            AI Harvest & Revenue Planner
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Optimal picking windows, quality grading & curing/storage guidance
          </p>
        </div>
      </div>

      <form onSubmit={handlePlan} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold">
            <option value="Cardamom">Cardamom</option>
            <option value="Black Pepper">Black Pepper</option>
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="Grapes">Grapes</option>
            <option value="Banana">Banana</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Plot Area (Acres)</label>
          <input type="number" min="0.5" step="0.5" value={areaAcres} onChange={(e) => setAreaAcres(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold" />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Est. Yield / Acre (kg)</label>
          <input type="number" min="10" value={expectedYieldKg} onChange={(e) => setExpectedYieldKg(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold" />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Est. Market Rate (₹/kg)</label>
          <input type="number" min="10" value={pricePerKg} onChange={(e) => setPricePerKg(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold" />
        </div>

        <div className="sm:col-span-4">
          <button type="submit" disabled={loading} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>Calculate Harvest Revenue & Schedule</span>
          </button>
        </div>
      </form>

      {harvestData && (
        <div className="space-y-6 animate-fadeIn">
          {/* Revenue & Yield Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
              <p className="text-[10px] uppercase font-bold text-slate-400">Projected Gross Revenue</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{harvestData.expectedRevenue}</p>
              <p className="text-[10px] text-slate-400 mt-1">{areaAcres} Acres @ ₹{pricePerKg}/kg</p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-emerald-800">Total Expected Yield</p>
              <p className="text-2xl font-extrabold text-emerald-900 mt-1">{harvestData.expectedYieldTotal}</p>
              <p className="text-[10px] text-emerald-700 mt-1 font-semibold">{harvestData.pickingInterval}</p>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-blue-800">AI Quality Score</p>
              <p className="text-2xl font-extrabold text-blue-900 mt-1">{harvestData.qualityScore}</p>
              <p className="text-[10px] text-blue-700 mt-1 font-semibold">Ideal Window: {harvestData.idealHarvestDate}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center">
              <Warehouse size={15} className="mr-1.5 text-slate-600" /> Curing & Storage Recommendation
            </h4>
            <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">{harvestData.storageAdvice}</p>
          </div>

          <ExtensionResponseCard advice={harvestData.extensionOfficerAdvice} />
        </div>
      )}
    </div>
  );
};

export default HarvestPlanner;
