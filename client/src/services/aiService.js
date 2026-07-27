import API from './api';

const aiService = {
  detectDisease: async (payload) => {
    const res = await API.post('/ai/disease-detect', payload);
    return res.data;
  },
  getWeatherIntelligence: async (district) => {
    const res = await API.get(`/ai/weather?district=${encodeURIComponent(district)}`);
    return res.data;
  },
  getMarketForecast: async (crop, market) => {
    const res = await API.get(`/ai/market-forecast?crop=${encodeURIComponent(crop)}&market=${encodeURIComponent(market)}`);
    return res.data;
  },
  getCropAdvisory: async (payload) => {
    const res = await API.post('/ai/crop-advisory', payload);
    return res.data;
  },
  getFertilizerAdvice: async (payload) => {
    const res = await API.post('/ai/fertilizer-adviser', payload);
    return res.data;
  },
  getPestAlerts: async () => {
    const res = await API.get('/ai/pest-alerts');
    return res.data;
  },
  getHarvestPlan: async (payload) => {
    const res = await API.post('/ai/harvest-planner', payload);
    return res.data;
  },
  getGovSchemes: async () => {
    const res = await API.get('/ai/schemes');
    return res.data;
  },
  chatAI: async (payload) => {
    const res = await API.post('/ai/chat', payload);
    return res.data;
  },
  generateFarmReport: async (payload) => {
    const res = await API.post('/ai/farm-report', payload);
    return res.data;
  },
  getSeasonalCalendar: async () => {
    const res = await API.get('/ai/seasonal-calendar');
    return res.data;
  },
  getExportOpportunities: async () => {
    const res = await API.get('/ai/export-opportunities');
    return res.data;
  }
};

export default aiService;
