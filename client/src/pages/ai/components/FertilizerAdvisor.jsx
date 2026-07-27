import React, { useState } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { FlaskConical, Leaf, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const FertilizerAdvisor = ({ currentCrop }) => {
  const [crop, setCrop] = useState(currentCrop || 'Cardamom');
  const [ageYears, setAgeYears] = useState(4);
  const [soilType, setSoilType] = useState('Loamy High-Range Forest Soil');
  const [rainfall, setRainfall] = useState('High');
  const [areaAcres, setAreaAcres] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fertilizerData, setFertilizerData] = useState(null);

  const handleRecommend = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiService.getFertilizerAdvice({
        crop, ageYears, soilType, rainfall, areaAcres
      });
      setFertilizerData(data.data);
      toast.success('Fertilizer formulation ready!');
    } catch (err) {
      toast.error('Failed to calculate fertilizer dose');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <FlaskConical className="text-emerald-600 mr-2" size={22} />
            AI Fertilizer & Soil Nutrition Advisor
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            NPK calculation & organic compost formulation for Western Ghats soils
          </p>
        </div>
      </div>

      <form onSubmit={handleRecommend} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
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
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Soil Type</label>
          <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white">
            <option value="Loamy High-Range Forest Soil">Loamy High-Range</option>
            <option value="Red Laterite Hill Soil">Red Laterite</option>
            <option value="Sandy Clay Loam">Sandy Clay Loam</option>
            <option value="Alluvial Valley Soil">Alluvial Valley</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Rainfall Zone</label>
          <select value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white">
            <option value="High">High (&gt;2500mm)</option>
            <option value="Moderate">Moderate (1500-2500mm)</option>
            <option value="Low">Low (&lt;1500mm)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Area (Acres)</label>
          <input type="number" min="0.5" step="0.5" value={areaAcres} onChange={(e) => setAreaAcres(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold" />
        </div>

        <div className="flex items-end">
          <button type="submit" disabled={loading} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition-all">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>Calculate Doses</span>
          </button>
        </div>
      </form>

      {fertilizerData && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Chemical Formulation */}
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                🧪 Recommended Inorganic Formula
              </span>
              <h4 className="text-sm font-extrabold text-blue-900 mt-1">{fertilizerData.recommendedChemical.name}</h4>
              <p className="text-slate-700 font-semibold">Total Quantity: {fertilizerData.recommendedChemical.quantityPerAcre}</p>
              <p className="text-slate-600">{fertilizerData.recommendedChemical.splitDoses}</p>
              <p className="text-blue-800 font-bold">Estimated Cost: {fertilizerData.recommendedChemical.costEstimate}</p>
            </div>

            {/* Organic Alternative */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                🌱 Recommended Bio-Organic Formulation
              </span>
              <h4 className="text-sm font-extrabold text-emerald-900 mt-1">{fertilizerData.organicAlternative.name}</h4>
              <p className="text-slate-700 font-semibold">Total Quantity: {fertilizerData.organicAlternative.quantityPerAcre}</p>
              <p className="text-slate-600">{fertilizerData.organicAlternative.benefits}</p>
              <p className="text-emerald-800 font-bold">Estimated Cost: {fertilizerData.organicAlternative.costEstimate}</p>
            </div>
          </div>

          <ExtensionResponseCard advice={fertilizerData.extensionOfficerAdvice} />
        </div>
      )}
    </div>
  );
};

export default FertilizerAdvisor;
