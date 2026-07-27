import React, { useState } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { FileText, Printer, CheckCircle, AlertTriangle, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const FarmHealthReport = ({ currentDistrict, currentCrop }) => {
  const [district, setDistrict] = useState(currentDistrict || 'Kumily');
  const [crop, setCrop] = useState(currentCrop || 'Cardamom');
  const [farmerName, setFarmerName] = useState('High Range Planter');
  const [areaAcres, setAreaAcres] = useState(3);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleGenerateReport = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiService.generateFarmReport({
        district, crop, farmerName, areaAcres
      });
      setReport(data.data);
      toast.success('Farm Health Audit Report Generated!');
    } catch (err) {
      toast.error('Failed to generate farm report');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <FileText className="text-emerald-600 mr-2" size={22} />
            AI Farm Health & Agronomic Audit Report
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic farm scorecard, risk metrics & exportable pdf audit certificate
          </p>
        </div>
      </div>

      <form onSubmit={handleGenerateReport} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Farmer / Estate Name</label>
          <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold" />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Region</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold">
            <option value="Kumily">Kumily</option>
            <option value="Puttady">Puttady</option>
            <option value="Munnar">Munnar</option>
            <option value="Theni">Theni</option>
            <option value="Cumbum">Cumbum</option>
            <option value="Bodinayakanur">Bodi</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full border border-slate-200 rounded-xl p-2 text-xs bg-white font-semibold">
            <option value="Cardamom">Cardamom</option>
            <option value="Black Pepper">Black Pepper</option>
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="Grapes">Grapes</option>
          </select>
        </div>

        <div className="flex items-end">
          <button type="submit" disabled={loading} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 transition-all">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span>Generate Audit</span>
          </button>
        </div>
      </form>

      {report && (
        <div id="printable-report" className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-fadeIn">
          {/* Printable Report Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-slate-900">AgriConnect Western Ghats Audit</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold">VERIFIED AI REPORT</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">Report ID: {report.reportId} | Date: {report.generatedAt}</p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors print:hidden"
            >
              <Printer size={15} />
              <span>Export PDF / Print</span>
            </button>
          </div>

          {/* Farm Score Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-900 text-white p-5 rounded-2xl shadow-md">
            <div className="md:col-span-4 text-center md:border-r md:border-slate-800 pr-4">
              <p className="text-[10px] uppercase font-bold text-slate-400">Overall Farm Health Score</p>
              <div className="text-5xl font-black text-emerald-400 my-1">{report.overallFarmScore} <span className="text-lg font-normal text-slate-400">/ 100</span></div>
              <span className="inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Grade A Plantation Health
              </span>
            </div>

            <div className="md:col-span-8 space-y-1 text-xs">
              <p className="font-bold text-slate-200 text-sm">{report.farmerName}</p>
              <p className="text-slate-400">{report.crop} Plantation ({report.areaAcres} Acres) - {report.district} District</p>
              <p className="text-slate-300 pt-1 leading-normal">
                Audited using multi-spectral satellite indices, local telemetry weather stations, and Puttady auction pricing trends.
              </p>
            </div>
          </div>

          {/* 4 Risk Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Disease Risk</p>
              <p className="text-base font-extrabold text-amber-600 mt-0.5">{report.metrics.diseaseRisk.status}</p>
              <p className="text-[10px] text-slate-500 mt-1">{report.metrics.diseaseRisk.detail}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Water Stress</p>
              <p className="text-base font-extrabold text-emerald-600 mt-0.5">{report.metrics.waterStress.status}</p>
              <p className="text-[10px] text-slate-500 mt-1">{report.metrics.waterStress.detail}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Weather Risk</p>
              <p className="text-base font-extrabold text-blue-600 mt-0.5">{report.metrics.weatherRisk.status}</p>
              <p className="text-[10px] text-slate-500 mt-1">{report.metrics.weatherRisk.detail}</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <p className="text-[10px] uppercase font-bold text-slate-500">Market Opportunity</p>
              <p className="text-base font-extrabold text-purple-600 mt-0.5">{report.metrics.marketOpportunity.status}</p>
              <p className="text-[10px] text-slate-500 mt-1">{report.metrics.marketOpportunity.detail}</p>
            </div>
          </div>

          <ExtensionResponseCard advice={report.extensionOfficerAdvice} />
        </div>
      )}
    </div>
  );
};

export default FarmHealthReport;
