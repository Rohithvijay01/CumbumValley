import React, { useState, useEffect } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { CloudRain, Thermometer, Droplets, Wind, Sun, Compass, Calendar, AlertTriangle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const WeatherIntelligence = ({ currentDistrict }) => {
  const [district, setDistrict] = useState(currentDistrict || 'Kumily');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (targetDistrict) => {
    setLoading(true);
    try {
      const data = await aiService.getWeatherIntelligence(targetDistrict);
      setWeatherData(data.data);
    } catch (err) {
      toast.error('Failed to load weather intelligence');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(district);
  }, [district]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      {/* Header & District Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <CloudRain className="text-blue-600 mr-2" size={22} />
            Western Ghats Weather Intelligence
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Micro-climate telemetry & agricultural advisory for High Range slope plantations
          </p>
        </div>

        <div className="w-full sm:w-64">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Selected High-Range Region
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-blue-500"
          >
            <optgroup label="Kerala (High Range)">
              <option value="Kumily">Kumily (Spices Belt)</option>
              <option value="Puttady">Puttady (Auction Zone)</option>
              <option value="Kattappana">Kattappana (Highlands)</option>
              <option value="Munnar">Munnar (Tea Estates)</option>
              <option value="Devikulam">Devikulam (High Elevation)</option>
              <option value="Nedumkandam">Nedumkandam (Spice Garden)</option>
            </optgroup>
            <optgroup label="Tamil Nadu (Cumbum Valley)">
              <option value="Theni">Theni (Plains)</option>
              <option value="Cumbum">Cumbum (Grape Vineyards)</option>
              <option value="Bodinayakanur">Bodinayakanur (Cardamom Trading)</option>
              <option value="Chinnamanur">Chinnamanur (Agriculture)</option>
            </optgroup>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
          <Loader2 size={36} className="animate-spin mb-3 text-blue-600" />
          <p className="text-xs font-bold uppercase tracking-wider">Fetching microclimate satellite telemetry for {district}...</p>
        </div>
      ) : weatherData ? (
        <div className="space-y-6">
          {/* Current Weather Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <Thermometer size={18} className="mx-auto text-blue-600 mb-1" />
              <p className="text-[10px] uppercase font-bold text-slate-500">Temperature</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{weatherData.current.temp}°C</p>
            </div>

            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <Droplets size={18} className="mx-auto text-blue-600 mb-1" />
              <p className="text-[10px] uppercase font-bold text-slate-500">Humidity</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{weatherData.current.humidity}%</p>
            </div>

            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <CloudRain size={18} className="mx-auto text-blue-600 mb-1" />
              <p className="text-[10px] uppercase font-bold text-slate-500">Rainfall</p>
              <p className="text-xs font-extrabold text-slate-900 mt-0.5 leading-tight">{weatherData.current.rainfall}</p>
            </div>

            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <Wind size={18} className="mx-auto text-blue-600 mb-1" />
              <p className="text-[10px] uppercase font-bold text-slate-500">Wind Speed</p>
              <p className="text-xs font-extrabold text-slate-900 mt-0.5">{weatherData.current.wind}</p>
            </div>

            <div className="bg-blue-50/70 p-3 rounded-2xl border border-blue-100 text-center">
              <Sun size={18} className="mx-auto text-amber-500 mb-1" />
              <p className="text-[10px] uppercase font-bold text-slate-500">UV Index</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{weatherData.current.uv}</p>
            </div>

            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 text-center col-span-2">
              <Compass size={18} className="mx-auto text-emerald-600 mb-1" />
              <p className="text-[10px] uppercase font-bold text-slate-500">Soil Moisture (Est.)</p>
              <p className="text-xs font-extrabold text-emerald-800 mt-0.5">{weatherData.current.soilMoisture}</p>
            </div>
          </div>

          {/* AI Decision Matrices */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2">
              🤖 Agricultural Extension AI Directives ({district})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <p className="text-[10px] uppercase font-bold text-blue-300 mb-1">🌾 Harvest Impact</p>
                <p className="text-slate-200">{weatherData.aiDecisions.harvestImpact}</p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <p className="text-[10px] uppercase font-bold text-emerald-300 mb-1">💧 Irrigation Advice</p>
                <p className="text-slate-200">{weatherData.aiDecisions.irrigationAdvice}</p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <p className="text-[10px] uppercase font-bold text-amber-300 mb-1">🧪 Pesticide Spraying Decision</p>
                <p className="text-slate-200">{weatherData.aiDecisions.pesticideAdvice}</p>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <p className="text-[10px] uppercase font-bold text-purple-300 mb-1">🌿 Fertilizer Application</p>
                <p className="text-slate-200">{weatherData.aiDecisions.fertilizerAdvice}</p>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center">
              <Calendar size={14} className="mr-1.5 text-slate-500" /> 7-Day Micro-Climate Trend
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {weatherData.forecast7Day.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-sm">
                  <p className="text-xs font-bold text-slate-900">{item.day}</p>
                  <p className="text-sm font-extrabold text-blue-700 my-1">{item.temp}°C</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{item.condition}</p>
                  <span className="inline-block mt-1 text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {item.rainProb}% Rain
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ExtensionResponseCard advice={weatherData.extensionOfficerAdvice} />
        </div>
      ) : null}
    </div>
  );
};

export default WeatherIntelligence;
