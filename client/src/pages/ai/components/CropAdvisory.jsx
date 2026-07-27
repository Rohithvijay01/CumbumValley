import React, { useState } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { Target, Calendar, AlertCircle, CheckSquare, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const CropAdvisory = ({ currentDistrict, currentCrop }) => {
  const [district, setDistrict] = useState(currentDistrict || 'Kumily');
  const [crop, setCrop] = useState(currentCrop || 'Cardamom');
  const [ageYears, setAgeYears] = useState(3);
  const [areaAcres, setAreaAcres] = useState(2);
  const [problem, setProblem] = useState('Yellowing of leaves & slow sucker growth');
  const [loading, setLoading] = useState(false);
  const [advisoryData, setAdvisoryData] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiService.getCropAdvisory({
        district, crop, ageYears, areaAcres, problem
      });
      setAdvisoryData(data.data);
      toast.success('Custom Advisory Generated!');
    } catch (err) {
      toast.error('Failed to generate crop advisory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Target className="text-emerald-600 mr-2" size={22} />
            AI Precision Crop Advisory Generator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tailored daily, weekly and monthly action plans for Western Ghats high-range plots
          </p>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Region</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-semibold bg-white">
            <option value="Kumily">Kumily</option>
            <option value="Puttady">Puttady</option>
            <option value="Munnar">Munnar</option>
            <option value="Kattappana">Kattappana</option>
            <option value="Theni">Theni</option>
            <option value="Cumbum">Cumbum</option>
            <option value="Bodinayakanur">Bodinayakanur</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-semibold bg-white">
            <option value="Cardamom">Cardamom</option>
            <option value="Black Pepper">Black Pepper</option>
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="Grapes">Grapes</option>
            <option value="Banana">Banana</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Plant Age (Years)</label>
          <input type="number" min="1" max="25" value={ageYears} onChange={(e) => setAgeYears(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs font-semibold bg-white" />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Plot Area (Acres)</label>
          <input type="number" min="0.5" step="0.5" value={areaAcres} onChange={(e) => setAreaAcres(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs font-semibold bg-white" />
        </div>

        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Current Problem / Issue</label>
          <input type="text" placeholder="e.g. Yellowing of leaves, slow tiller growth, thrips infestation..." value={problem} onChange={(e) => setProblem(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white" />
        </div>

        <div className="md:col-span-1 flex items-end">
          <button type="submit" disabled={loading} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>Generate Plan</span>
          </button>
        </div>
      </form>

      {advisoryData && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 space-y-2">
              <h4 className="font-bold text-emerald-900 uppercase text-[11px] flex items-center">
                <CheckSquare size={14} className="mr-1 text-emerald-600" /> Daily Care Routine
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                {advisoryData.dailyAdvice.map((item, idx) => (
                  <li key={idx} className="leading-tight">{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 space-y-2">
              <h4 className="font-bold text-blue-900 uppercase text-[11px] flex items-center">
                <Calendar size={14} className="mr-1 text-blue-600" /> Weekly Protocol
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                {advisoryData.weeklyAdvice.map((item, idx) => (
                  <li key={idx} className="leading-tight">{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-2">
              <h4 className="font-bold text-purple-900 uppercase text-[11px] flex items-center">
                <Target size={14} className="mr-1 text-purple-600" /> Monthly Schedule
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                {advisoryData.monthlyPlan.map((item, idx) => (
                  <li key={idx} className="leading-tight">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <ExtensionResponseCard advice={advisoryData.extensionOfficerAdvice} />
        </div>
      )}
    </div>
  );
};

export default CropAdvisory;
