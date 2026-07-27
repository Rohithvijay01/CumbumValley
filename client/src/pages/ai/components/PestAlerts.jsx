import React, { useState, useEffect } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { AlertOctagon, Bug, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PestAlerts = () => {
  const [loading, setLoading] = useState(true);
  const [pestData, setPestData] = useState(null);

  useEffect(() => {
    const fetchPestAlerts = async () => {
      try {
        const data = await aiService.getPestAlerts();
        setPestData(data);
      } catch (err) {
        toast.error('Failed to load pest outbreak alerts');
      } finally {
        setLoading(false);
      }
    };
    fetchPestAlerts();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <AlertOctagon className="text-red-600 mr-2" size={22} />
            Western Ghats Pest Outbreak Warnings
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Active pest pressure, high-risk zones & intervention protocols
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 text-slate-500">
          <Loader2 size={32} className="animate-spin mb-2 text-red-600" />
          <p className="text-xs font-bold uppercase">Scanning regional pest surveillance network...</p>
        </div>
      ) : pestData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pestData.data.map((alert) => (
              <div key={alert.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                      {alert.riskLevel} RISK
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">{alert.targetCrop}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 flex items-center">
                    <Bug size={16} className="mr-1.5 text-amber-600" /> {alert.pestName}
                  </h4>

                  <p className="text-xs text-slate-600 mt-2">
                    <span className="font-bold">Affected Districts:</span> {alert.affectedDistricts.join(', ')}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    <span className="font-bold">Symptoms:</span> {alert.symptoms}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] space-y-1">
                  <p className="font-bold text-emerald-800">🌱 Organic Control:</p>
                  <p className="text-slate-600">{alert.organicAlternative}</p>
                  <p className="font-bold text-blue-800 mt-1">🧪 Chemical Spray:</p>
                  <p className="text-slate-600">{alert.recommendedChemical}</p>
                </div>
              </div>
            ))}
          </div>

          <ExtensionResponseCard advice={pestData.extensionOfficerAdvice} />
        </div>
      ) : null}
    </div>
  );
};

export default PestAlerts;
