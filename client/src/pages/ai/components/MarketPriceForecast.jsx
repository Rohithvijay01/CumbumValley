import React, { useState, useEffect } from 'react';
import aiService from '../../../services/aiService';
import ExtensionResponseCard from './ExtensionResponseCard';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, DollarSign, BarChart3, Building2, Globe, Loader2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import toast from 'react-hot-toast';

const MarketPriceForecast = ({ currentCrop }) => {
  const [crop, setCrop] = useState(currentCrop || 'Cardamom');
  const [market, setMarket] = useState('Puttady');
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState(null);

  const fetchForecast = async (selectedCrop, selectedMarket) => {
    setLoading(true);
    try {
      const data = await aiService.getMarketForecast(selectedCrop, selectedMarket);
      setMarketData(data.data);
    } catch (err) {
      toast.error('Failed to load market forecast data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast(crop, market);
  }, [crop, market]);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-lg space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <TrendingUp className="text-emerald-600 mr-2" size={22} />
            Market Price Intelligence & AI Forecast
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Puttady Spices Park & Bodi Mandi auction trend analysis
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="border border-slate-200 rounded-xl p-2 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Cardamom">Cardamom</option>
            <option value="Black Pepper">Black Pepper</option>
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="Grapes">Grapes</option>
            <option value="Banana">Banana</option>
            <option value="Ginger">Ginger</option>
          </select>

          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="border border-slate-200 rounded-xl p-2 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Puttady">Puttady Auction</option>
            <option value="Bodinayakanur">Bodi Mandi</option>
            <option value="Kumily">Kumily Local</option>
            <option value="Theni">Theni APMC</option>
            <option value="Munnar">Munnar Co-op</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 text-slate-500">
          <Loader2 size={36} className="animate-spin mb-3 text-emerald-600" />
          <p className="text-xs font-bold uppercase tracking-wider">Analyzing auction trends & AI price prediction...</p>
        </div>
      ) : marketData ? (
        <div className="space-y-6">
          {/* Price Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-md">
              <p className="text-[10px] uppercase font-bold text-slate-400">Today's Auction Rate</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">₹{marketData.prices.today} <span className="text-xs text-slate-400 font-normal">/{marketData.unit}</span></p>
              <p className="text-[10px] text-emerald-300 font-semibold mt-1 flex items-center">
                <ArrowUpRight size={12} className="mr-0.5" /> +₹{marketData.prices.today - marketData.prices.yesterday} vs Yesterday
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Yesterday</p>
              <p className="text-xl font-bold text-slate-900 mt-1">₹{marketData.prices.yesterday}</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">Previous Close</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Last Week Average</p>
              <p className="text-xl font-bold text-slate-900 mt-1">₹{marketData.prices.lastWeek}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">7-Day Base</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-[10px] uppercase font-bold text-slate-400">Last Month Average</p>
              <p className="text-xl font-bold text-slate-900 mt-1">₹{marketData.prices.lastMonth}</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">30-Day Index</p>
            </div>
          </div>

          {/* Price Chart & AI Predictions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Recharts Price Chart */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center">
                  <BarChart3 size={14} className="mr-1.5 text-emerald-600" /> Historical Price Movement (30 Days)
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Real-Time Auction Sync
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketData.historicalChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px', borderColor: '#e2e8f0' }} />
                    <Line type="monotone" dataKey="price" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="lg:col-span-4 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 border-b border-slate-800 pb-2">
                  🤖 AI Price Forecast ({crop})
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-300">7-Day Target:</span>
                    <span className="font-extrabold text-emerald-400">₹{marketData.aiPredictions.day7} / {marketData.unit}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-300">15-Day Target:</span>
                    <span className="font-extrabold text-emerald-300">₹{marketData.aiPredictions.day15} / {marketData.unit}</span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                    <span className="text-slate-300">30-Day Outlook:</span>
                    <span className="font-extrabold text-emerald-200">₹{marketData.aiPredictions.day30} / {marketData.unit}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50 text-[11px]">
                <p className="font-bold text-emerald-400 uppercase">Trend Confidence: {marketData.aiPredictions.confidence}</p>
                <p className="text-emerald-200 mt-0.5">{marketData.aiPredictions.trendDirection} momentum expected due to high Middle-East spice demand.</p>
              </div>
            </div>
          </div>

          {/* Regional Market Comparisons */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center">
              <Building2 size={14} className="mr-1.5 text-slate-500" /> Cross-Market Rate Comparison
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              {marketData.marketComparisons.map((m, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="font-bold text-slate-800 leading-tight">{m.marketName}</p>
                  <p className="text-base font-extrabold text-emerald-700 mt-1">₹{m.price}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Arrivals: {m.arrivalVolume}</p>
                </div>
              ))}
            </div>
          </div>

          <ExtensionResponseCard advice={marketData.extensionOfficerAdvice} />
        </div>
      ) : null}
    </div>
  );
};

export default MarketPriceForecast;
