import React, { useState, useEffect } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { Landmark, FileText, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const GovernmentSchemes = () => {
  const [loading, setLoading] = useState(true);
  const [schemesData, setSchemesData] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const data = await aiService.getGovSchemes();
        setSchemesData(data);
      } catch (err) {
        toast.error('Failed to load government schemes');
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Landmark className="text-emerald-600 mr-2" size={22} />
            Tamil Nadu & Kerala Government Agricultural Schemes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Spices Board replanting grants, horticulture subsidies & mechanization support
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-48 text-slate-500">
          <Loader2 size={32} className="animate-spin mb-2 text-emerald-600" />
          <p className="text-xs font-bold uppercase">Loading TN & Kerala subsidy database...</p>
        </div>
      ) : schemesData ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {schemesData.data.map((scheme) => (
              <div key={scheme.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {scheme.state}
                    </span>
                    <span className="text-[10px] font-bold text-blue-700">{scheme.subsidyAmount}</span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{scheme.title}</h4>

                  <p className="text-slate-600 mt-2">
                    <span className="font-bold text-slate-800">Eligibility:</span> {scheme.eligibility}
                  </p>

                  <p className="text-slate-600 mt-1">
                    <span className="font-bold text-slate-800">Benefits:</span> {scheme.benefits}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div>
                    <p className="font-bold text-slate-800 text-[10px] uppercase">Required Documents:</p>
                    <ul className="list-disc list-inside text-[10px] text-slate-500 mt-0.5 space-y-0.5">
                      {scheme.requiredDocuments.map((doc, idx) => (
                        <li key={idx}>{doc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <p className="font-bold text-emerald-800 text-[10px] uppercase">How to Apply:</p>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-normal">{scheme.howToApply}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ExtensionResponseCard advice={schemesData.extensionOfficerAdvice} />
        </div>
      ) : null}
    </div>
  );
};

export default GovernmentSchemes;
