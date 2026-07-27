import React, { useState } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { Upload, Camera, CheckCircle, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const DiseaseDetector = ({ currentCrop }) => {
  const [selectedCrop, setSelectedCrop] = useState(currentCrop || 'Cardamom');
  const [symptomText, setSymptomText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const imageUrls = files.map(file => URL.createObjectURL(file));
      setSelectedImages(imageUrls);
      toast.success(`${files.length} plant image(s) attached for AI scanning`);
    }
  };

  const handleCameraCapture = () => {
    // Simulated camera capture image
    setSelectedImages(['https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&q=80&w=400']);
    toast.success('Camera snapshot captured successfully!');
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await aiService.detectDisease({
        crop: selectedCrop,
        symptom: symptomText,
        imageName: selectedImages.length > 0 ? 'plant_scan.jpg' : 'symptom_report'
      });
      setResult(data.data);
      toast.success('AI Diagnosis Complete!');
    } catch (err) {
      toast.error('Failed to run disease analysis');
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
            <Sparkles className="text-emerald-600 mr-2" size={22} />
            AI Plant Disease Detection
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify pathogens, fungal rots & leaf blights with Western Ghats diagnostic models
          </p>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          Cardamom, Pepper, Tea & Grapes AI
        </span>
      </div>

      <form onSubmit={handleAnalyze} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Column */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select Crop Type
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            >
              <option value="Cardamom">Cardamom (Katte & Azhukal Focus)</option>
              <option value="Black Pepper">Black Pepper (Quick Wilt Focus)</option>
              <option value="Tea">Tea (Blister Blight Focus)</option>
              <option value="Coffee">Coffee (Rust & Dieback Focus)</option>
              <option value="Grapes">Grapes (Downy Mildew Focus)</option>
              <option value="Banana">Banana (Sigatoka Leaf Spot Focus)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Symptom Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Yellow leaves, dark lesions on capsules, wilting vine base..."
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          {/* Image & Camera Upload Zone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Attach Leaf / Plant Photos
            </label>

            <div className="flex items-center space-x-3">
              <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-center">
                <Upload size={20} className="text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-700">Upload Images</span>
                <span className="text-[10px] text-slate-400">Multiple JPG / PNG</span>
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>

              <button
                type="button"
                onClick={handleCameraCapture}
                className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-center"
              >
                <Camera size={20} className="text-slate-400 mb-1" />
                <span className="text-xs font-bold text-slate-700">Live Camera</span>
                <span className="text-[10px] text-slate-400">Snap Photo</span>
              </button>
            </div>

            {/* Thumbnail Preview */}
            {selectedImages.length > 0 && (
              <div className="mt-3 flex items-center space-x-2 overflow-x-auto pb-2">
                {selectedImages.map((src, idx) => (
                  <img key={idx} src={src} alt="plant sample" className="w-14 h-14 object-cover rounded-xl border border-slate-300 shadow-sm" />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            <span>{loading ? 'Analyzing Plant Pathogen...' : 'Run AI Diagnostic Scan'}</span>
          </button>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-6">
          {!result ? (
            <div className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50/50">
              <ShieldCheck size={48} className="mb-3 text-slate-300" />
              <p className="font-bold text-slate-700 text-sm">No Active Scan</p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Upload leaf or fruit photos to generate diagnosis, treatment options & recovery timeline.
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              {/* Main Diagnosis Card */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">{result.crop} Pathogen Result</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {result.confidenceScore}% AI Match
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">{result.diseaseName}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Affected Area: <span className="text-slate-200 font-semibold">{result.affectedArea}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-800/80 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Severity</p>
                    <p className="text-red-400 font-bold">{result.severity}</p>
                  </div>
                  <div className="bg-slate-800/80 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Recovery Time</p>
                    <p className="text-amber-300 font-bold">{result.estimatedRecoveryTime}</p>
                  </div>
                </div>
              </div>

              {/* Treatment Tabs */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div>
                  <p className="font-bold text-emerald-800 uppercase text-[10px] tracking-wider mb-1">🌱 Organic Remedy</p>
                  <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 leading-normal">{result.organicTreatment}</p>
                </div>

                <div>
                  <p className="font-bold text-blue-800 uppercase text-[10px] tracking-wider mb-1">🧪 Chemical Intervention</p>
                  <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 leading-normal">{result.chemicalTreatment}</p>
                </div>

                <div>
                  <p className="font-bold text-slate-700 uppercase text-[10px] tracking-wider mb-1">🛡️ Preventive Protocol</p>
                  <p className="text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 leading-normal">{result.prevention}</p>
                </div>
              </div>

              <ExtensionResponseCard advice={result.extensionOfficerAdvice} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default DiseaseDetector;
