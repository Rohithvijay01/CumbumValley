import React, { useState } from 'react';
import { 
  Sparkles, CloudRain, TrendingUp, Target, Droplets, FlaskConical, 
  AlertOctagon, Calendar, Landmark, MessageSquare, FileText, BarChart3, 
  Globe, ShieldCheck, CheckCircle2, ChevronRight, Compass, MapPin
} from 'lucide-react';

import DiseaseDetector from './components/DiseaseDetector';
import WeatherIntelligence from './components/WeatherIntelligence';
import MarketPriceForecast from './components/MarketPriceForecast';
import CropAdvisory from './components/CropAdvisory';
import FertilizerAdvisor from './components/FertilizerAdvisor';
import PestAlerts from './components/PestAlerts';
import HarvestPlanner from './components/HarvestPlanner';
import GovernmentSchemes from './components/GovernmentSchemes';
import AIChat from './components/AIChat';
import FarmHealthReport from './components/FarmHealthReport';

const AgriConnectAIDashboard = () => {
  const [activeTab, setActiveTab] = useState('disease');
  const [selectedState, setSelectedState] = useState('Kerala');
  const [selectedDistrict, setSelectedDistrict] = useState('Kumily');
  const [selectedCrop, setSelectedCrop] = useState('Cardamom');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const districts = {
    'Kerala': ['Kumily', 'Puttady', 'Kattappana', 'Munnar', 'Devikulam', 'Nedumkandam', 'Udumbanchola', 'Peerumedu', 'Vandiperiyar'],
    'Tamil Nadu': ['Theni', 'Cumbum', 'Bodinayakanur', 'Chinnamanur', 'Periyakulam', 'Uthamapalayam']
  };

  const crops = ['Cardamom', 'Black Pepper', 'Tea', 'Coffee', 'Grapes', 'Banana', 'Ginger', 'Turmeric', 'Clove', 'Cinnamon'];

  const tools = [
    { id: 'disease', title: 'Plant Disease Detection', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50', desc: 'Identify pathogens with image scan' },
    { id: 'weather', title: 'Weather Intelligence', icon: CloudRain, color: 'text-blue-600 bg-blue-50', desc: 'Microclimate telemetry & spray timing' },
    { id: 'market', title: 'Market Price Forecast', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50', desc: 'Puttady & Bodi auction trend prediction' },
    { id: 'advisory', title: 'Crop Advisory', icon: Target, color: 'text-purple-600 bg-purple-50', desc: 'Precision daily & weekly action plans' },
    { id: 'fertilizer', title: 'Fertilizer Advisor', icon: FlaskConical, color: 'text-amber-600 bg-amber-50', desc: 'NPK & organic compost calculator' },
    { id: 'pest', title: 'Pest Alert', icon: AlertOctagon, color: 'text-red-600 bg-red-50', desc: 'Active regional outbreak warnings' },
    { id: 'harvest', title: 'Harvest Planner', icon: Calendar, color: 'text-emerald-600 bg-emerald-50', desc: 'Quality score & revenue estimation' },
    { id: 'schemes', title: 'Government Schemes', icon: Landmark, color: 'text-indigo-600 bg-indigo-50', desc: 'TN & Kerala subsidies & grants' },
    { id: 'chat', title: 'AI Extension Officer Chat', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50', desc: 'Voice, image & text multi-modal advisor' },
    { id: 'report', title: 'Farm Health Report', icon: FileText, color: 'text-slate-800 bg-slate-100', desc: 'Printable audit certificate & scorecard' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Hero Header */}
      <div className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 opacity-90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                <span>🌿 Western Ghats Agricultural Extension AI</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                AgriConnect AI Assistant
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
                Precision agronomic intelligence tailored exclusively for High-Range planters in Tamil Nadu (Theni, Cumbum, Bodi) and Kerala (Kumily, Puttady, Munnar, Nedumkandam).
              </p>
            </div>

            {/* Region Selector Bar */}
            <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 space-y-3 min-w-[280px]">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center">
                  <MapPin size={12} className="mr-1 text-emerald-400" /> State & District
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedDistrict(districts[e.target.value][0]);
                    }}
                    className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl p-2 focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Kerala">Kerala</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl p-2 focus:ring-1 focus:ring-emerald-500"
                  >
                    {districts[selectedState].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Crop Chips Bar */}
          <div className="mt-8 flex items-center space-x-2 overflow-x-auto pb-2 border-t border-slate-800/80 pt-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0 mr-2">Target Crops:</span>
            {crops.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCrop(c)}
                className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 transition-all ${
                  selectedCrop === c
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                    : 'bg-slate-800/60 text-slate-300 border border-slate-700 hover:bg-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Module Cards Carousel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'bg-white/70 border-slate-200 hover:border-emerald-300 hover:bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${t.color}`}>
                  <Icon size={18} />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{t.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tool Renderer */}
        <div className="transition-all duration-300">
          {activeTab === 'disease' && <DiseaseDetector currentCrop={selectedCrop} />}
          {activeTab === 'weather' && <WeatherIntelligence currentDistrict={selectedDistrict} />}
          {activeTab === 'market' && <MarketPriceForecast currentCrop={selectedCrop} />}
          {activeTab === 'advisory' && <CropAdvisory currentDistrict={selectedDistrict} currentCrop={selectedCrop} />}
          {activeTab === 'fertilizer' && <FertilizerAdvisor currentCrop={selectedCrop} />}
          {activeTab === 'pest' && <PestAlerts />}
          {activeTab === 'harvest' && <HarvestPlanner currentCrop={selectedCrop} />}
          {activeTab === 'schemes' && <GovernmentSchemes />}
          {activeTab === 'chat' && <AIChat currentDistrict={selectedDistrict} currentCrop={selectedCrop} />}
          {activeTab === 'report' && <FarmHealthReport currentDistrict={selectedDistrict} currentCrop={selectedCrop} />}
        </div>
      </div>

      {/* Floating AI Assistant Trigger Button */}
      <button
        onClick={() => setActiveTab('chat')}
        className="fixed bottom-6 right-6 z-50 bg-emerald-700 hover:bg-emerald-800 text-white p-4 rounded-full shadow-2xl flex items-center space-x-2 transition-all hover:scale-105 border border-emerald-600"
      >
        <MessageSquare size={22} />
        <span className="text-xs font-extrabold pr-1">Extension AI</span>
      </button>
    </div>
  );
};

export default AgriConnectAIDashboard;
