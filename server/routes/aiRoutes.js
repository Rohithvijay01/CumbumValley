import express from 'express';
import {
  detectDisease,
  getWeatherIntelligence,
  getMarketForecast,
  getCropAdvisory,
  getFertilizerAdvice,
  getPestAlerts,
  getHarvestPlan,
  getGovSchemes,
  chatAI,
  generateFarmReport,
  getSeasonalCalendar,
  getExportOpportunities
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/disease-detect', detectDisease);
router.get('/weather', getWeatherIntelligence);
router.get('/market-forecast', getMarketForecast);
router.post('/crop-advisory', getCropAdvisory);
router.post('/fertilizer-adviser', getFertilizerAdvice);
router.get('/pest-alerts', getPestAlerts);
router.post('/harvest-planner', getHarvestPlan);
router.get('/schemes', getGovSchemes);
router.post('/chat', chatAI);
router.post('/farm-report', generateFarmReport);
router.get('/seasonal-calendar', getSeasonalCalendar);
router.get('/export-opportunities', getExportOpportunities);

export default router;
