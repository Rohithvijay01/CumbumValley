// @desc    CumbumValley AI Controller for Western Ghats Farming Assistant

// Regional Data & Crops Knowledge Base
const WESTERN_GHATS_DATA = {
  districts: {
    'Tamil Nadu': ['Theni', 'Cumbum', 'Bodinayakanur', 'Chinnamanur', 'Periyakulam', 'Uthamapalayam'],
    'Kerala': ['Kumily', 'Puttady', 'Kattappana', 'Munnar', 'Devikulam', 'Nedumkandam', 'Udumbanchola', 'Peerumedu', 'Vandiperiyar']
  },
  crops: ['Cardamom', 'Black Pepper', 'Tea', 'Coffee', 'Grapes', 'Banana', 'Ginger', 'Turmeric', 'Clove', 'Cinnamon']
};

// Response helper guaranteeing Extension Officer response schema
const formatExtensionResponse = ({ summary, explanation, recommendedAction, priorityLevel = 'Medium', estimatedCost = '₹0 - ₹500/acre', expectedBenefit = 'Improved crop yield & soil health' }) => ({
  summary,
  explanation,
  recommendedAction,
  priorityLevel,
  estimatedCost,
  expectedBenefit,
  timestamp: new Date().toISOString()
});

// @desc    1. AI Plant Disease Detection
// @route   POST /api/ai/disease-detect
export const detectDisease = async (req, res, next) => {
  try {
    const { crop = 'Cardamom', symptom = '', imageName = '' } = req.body;

    const diseaseDatabase = {
      Cardamom: {
        diseaseName: 'Katte Disease (Mosaic Virus) & Capsule Rot (Azhukal)',
        confidenceScore: 94.5,
        affectedArea: 'Leaves & Fruit Capsules',
        severity: 'High (Immediate Action Required)',
        possibleCauses: 'Protozoan/Fungal infection exacerbated by high humidity (>85%) and shade density in High Range slopes.',
        immediateAction: 'Prune affected leaves immediately, destroy diseased capsules away from plot, improve shade ventilation.',
        organicTreatment: 'Spray 1% Bordeaux mixture combined with Trichoderma viride formulation (5g/L) root drenching.',
        chemicalTreatment: 'Apply Copper Oxychloride 0.2% or Metalaxyl-Mancozeb (2g/L) during break in heavy monsoon rains.',
        prevention: 'Maintain 50-60% shade, ensure slope drainage channels are unblocked, control aphid vector (Pentalonia nigronervosa).',
        estimatedRecoveryTime: '14 - 21 Days',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: 'Katte/Azhukal fungal-viral symptoms detected on Cardamom foliage.',
          explanation: 'Humidity above 88% in Western Ghats shade gardens encourages capsule rot. Immediate phytosanitary pruning prevents rootstock loss.',
          recommendedAction: 'Apply 1% Bordeaux mixture on dry leaf surfaces tomorrow morning. Drench soil around rhizomes with Trichoderma viride.',
          priorityLevel: 'High',
          estimatedCost: '₹850 / acre',
          expectedBenefit: 'Saves 35-40% of upcoming cardamom capsule harvest'
        })
      },
      'Black Pepper': {
        diseaseName: 'Quick Wilt (Phytophthora Foot Rot)',
        confidenceScore: 92.8,
        affectedArea: 'Vine Base & Root System',
        severity: 'Critical',
        possibleCauses: 'Heavy monsoon soil saturation combined with poor drainage around support trees.',
        immediateAction: 'Remove severely wilted vines to prevent soil fungal spread. Clear drainage furrows.',
        organicTreatment: 'Apply Pseudomonas fluorescens (10g/vine) mixed with well-rotted farmyard manure.',
        chemicalTreatment: 'Drench vine base with Potassium Phosphonate (3ml/L) or Metalaxyl 0.1%.',
        prevention: 'Loop lower vines 15cm above soil level before southwest monsoon onset.',
        estimatedRecoveryTime: '21 - 30 Days',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: 'Phytophthora Foot Rot risk detected on Pepper vine base.',
          explanation: 'Water stagnation at vine root zones triggers rapid wilting. Systemic potassium phosphonate protects vascular tissue.',
          recommendedAction: 'Drench vine root zone with Potassium Phosphonate (3ml/L) within 48 hours.',
          priorityLevel: 'High',
          estimatedCost: '₹1,200 / acre',
          expectedBenefit: 'Prevents total vine mortality and maintains multi-year yield'
        })
      },
      Tea: {
        diseaseName: 'Blister Blight (Exobasidium vexans)',
        confidenceScore: 96.1,
        affectedArea: 'Tender Flush & Young Leaves',
        severity: 'Medium-High',
        possibleCauses: 'Continuous mist and light drizzle in Munnar/Vandiperiyar tea estates.',
        immediateAction: 'Harvest mature flush early to reduce susceptible tissue density.',
        organicTreatment: 'Spray neem seed kernel extract (NSKE 5%) or copper hydroxide spray.',
        chemicalTreatment: 'Spray Hexaconazole (1ml/L) mixed with Copper Oxychloride (2g/L).',
        prevention: 'Adjust shade tree lopping to allow 40% sunlight penetration during misty months.',
        estimatedRecoveryTime: '10 - 14 Days',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: 'Blister Blight blisters observed on tender tea shoots.',
          explanation: 'Mist retention on flush leaves provides optimal spore germination environment.',
          recommendedAction: 'Apply Hexaconazole spray immediately after plucking cycle.',
          priorityLevel: 'Medium',
          estimatedCost: '₹600 / acre',
          expectedBenefit: 'Preserves top-grade Made Tea leaf quality'
        })
      },
      Coffee: {
        diseaseName: 'Coffee Leaf Rust (Hemileia vastatrix)',
        confidenceScore: 91.2,
        affectedArea: 'Lower Leaf Surfaces',
        severity: 'Medium',
        possibleCauses: 'Warm humid microclimate following early summer showers.',
        immediateAction: 'Collect fallen rusted leaves and burn them to reduce inoculum load.',
        organicTreatment: 'Spray Bordeaux mixture 0.5% early morning.',
        chemicalTreatment: 'Spray Triadimefon (0.05%) or Cyproconazole during pre-monsoon.',
        prevention: 'Maintain balanced NPK fertilization to prevent canopy weakening.',
        estimatedRecoveryTime: '15 - 20 Days',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: 'Orange rust pustules identified on coffee undersides.',
          explanation: 'Defoliation from rust reduces bean filling capacity for next season.',
          recommendedAction: 'Foliar spray 0.5% Bordeaux mixture before high-humidity windows.',
          priorityLevel: 'Medium',
          estimatedCost: '₹750 / acre',
          expectedBenefit: 'Prevents 20% leaf drop and preserves cherry density'
        })
      },
      Grapes: {
        diseaseName: 'Downy Mildew (Plasmopara viticola)',
        confidenceScore: 95.0,
        affectedArea: 'Leaves & Fruit Clusters',
        severity: 'High',
        possibleCauses: 'High night humidity in Cumbum Valley grape vineyards.',
        immediateAction: 'Prune overcrowded canes to improve air movement through trellis.',
        organicTreatment: 'Foliar spray of Bacillus subtilis or Copper Sulfate solution.',
        chemicalTreatment: 'Spray Cymoxanil + Mancozeb (2g/L) or Dimethomorph (1g/L).',
        prevention: 'Use drip irrigation instead of flood irrigation to keep foliage dry.',
        estimatedRecoveryTime: '12 - 18 Days',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: 'Downy Mildew oil spots detected on Cumbum Muscat grape leaves.',
          explanation: 'Dew retention on grape cluster leads to berry browning. Systemic spray essential.',
          recommendedAction: 'Apply Dimethomorph (1g/L) before sunset to ensure complete leaf coverage.',
          priorityLevel: 'High',
          estimatedCost: '₹1,100 / acre',
          expectedBenefit: 'Maintains export-grade grape cluster appearance'
        })
      },
      Banana: {
        diseaseName: 'Sigatoka Leaf Spot (Mycosphaerella musicola)',
        confidenceScore: 93.4,
        affectedArea: 'Middle & Lower Leaves',
        severity: 'Medium',
        possibleCauses: 'Poor air circulation in dense Grand Naine banana plantations.',
        immediateAction: 'De-leaf (cut and burn) leaves with more than 50% spot coverage.',
        organicTreatment: 'Spray Petroleum spray oil (1%) blended with neem oil (5ml/L).',
        chemicalTreatment: 'Spray Propiconazole (1ml/L) with mineral oil surfactant.',
        prevention: 'Maintain proper plant spacing (1.8m x 1.8m) and clear side suckers.',
        estimatedRecoveryTime: '14 - 21 Days',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: 'Sigatoka leaf streaks spotted on banana foliage.',
          explanation: 'Loss of functional leaf area delays bunch maturity and reduces weight by 15%.',
          recommendedAction: 'De-leaf severely affected bottom leaves and spray Propiconazole.',
          priorityLevel: 'Medium',
          estimatedCost: '₹950 / acre',
          expectedBenefit: 'Ensures full bunch weight and uniform ripening'
        })
      }
    };

    const selectedDiagnosis = diseaseDatabase[crop] || diseaseDatabase['Cardamom'];

    res.json({
      success: true,
      data: {
        crop,
        symptom: symptom || 'Foliar lesions and discoloration',
        imageAnalyzed: imageName || 'uploaded_sample.jpg',
        ...selectedDiagnosis
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    2. Weather Intelligence
// @route   GET /api/ai/weather
export const getWeatherIntelligence = async (req, res, next) => {
  try {
    const { district = 'Kumily' } = req.query;

    const weatherProfiles = {
      Kumily: { temp: 22, humidity: 86, rainfall: '12mm (Light-Moderate)', wind: '14 km/h', cloud: '78%', uv: '5 (Moderate)', soilMoisture: '38% (Optimal)' },
      Puttady: { temp: 21, humidity: 88, rainfall: '18mm (Moderate)', wind: '12 km/h', cloud: '82%', uv: '4 (Moderate)', soilMoisture: '42% (High)' },
      Kattappana: { temp: 23, humidity: 82, rainfall: '8mm (Light)', wind: '15 km/h', cloud: '65%', uv: '6 (High)', soilMoisture: '34% (Good)' },
      Munnar: { temp: 17, humidity: 90, rainfall: '25mm (Moderate-Heavy)', wind: '18 km/h', cloud: '92%', uv: '3 (Low)', soilMoisture: '46% (Very High)' },
      Devikulam: { temp: 18, humidity: 89, rainfall: '20mm (Moderate)', wind: '16 km/h', cloud: '88%', uv: '4 (Moderate)', soilMoisture: '44% (High)' },
      Nedumkandam: { temp: 24, humidity: 80, rainfall: '5mm (Scattered)', wind: '13 km/h', cloud: '55%', uv: '7 (High)', soilMoisture: '32% (Optimal)' },
      Theni: { temp: 31, humidity: 62, rainfall: '0mm (Dry)', wind: '19 km/h', cloud: '25%', uv: '9 (Very High)', soilMoisture: '22% (Low)' },
      Cumbum: { temp: 30, humidity: 65, rainfall: '0mm (Dry)', wind: '16 km/h', cloud: '30%', uv: '9 (Very High)', soilMoisture: '25% (Low-Moderate)' },
      Bodinayakanur: { temp: 29, humidity: 68, rainfall: '2mm (Trace)', wind: '22 km/h (Bodi Gap Wind)', cloud: '40%', uv: '8 (Very High)', soilMoisture: '28% (Moderate)' },
      Chinnamanur: { temp: 31, humidity: 60, rainfall: '0mm (Dry)', wind: '17 km/h', cloud: '20%', uv: '9 (Very High)', soilMoisture: '20% (Low)' }
    };

    const profile = weatherProfiles[district] || weatherProfiles['Kumily'];

    const forecast7Day = [
      { day: 'Mon', temp: profile.temp, rainProb: 75, condition: 'Light Rain' },
      { day: 'Tue', temp: profile.temp + 1, rainProb: 60, condition: 'Cloudy' },
      { day: 'Wed', temp: profile.temp - 1, rainProb: 80, condition: 'Showers' },
      { day: 'Thu', temp: profile.temp, rainProb: 45, condition: 'Partly Cloudy' },
      { day: 'Fri', temp: profile.temp + 2, rainProb: 30, condition: 'Sunny Spells' },
      { day: 'Sat', temp: profile.temp + 1, rainProb: 50, condition: 'Scattered Mist' },
      { day: 'Sun', temp: profile.temp, rainProb: 65, condition: 'Light Drizzle' }
    ];

    const outlook30Day = {
      summary: `Monsoon showers expected for 18 out of next 30 days in ${district}.`,
      cumulativeRainfall: '240mm - 310mm',
      temperatureRange: `${profile.temp - 3}°C to ${profile.temp + 4}°C`,
      keyAgriculturalImpact: 'Favorable for cardamom capsule enlargement and pepper spike development. High humidity requires preventive copper spraying.'
    };

    const aiDecisions = {
      harvestImpact: profile.humidity > 85 ? 'Delay cardamom capsule picking until mist clears after 10 AM to prevent post-harvest mold.' : 'Favorable window for grape & banana harvesting today.',
      irrigationAdvice: profile.soilMoisture.includes('High') ? 'NO irrigation needed today due to high soil moisture levels.' : 'Irrigate crops via drip system (25L/plant) during early morning hours.',
      pesticideAdvice: profile.rainfall.includes('Heavy') || profile.rainfall.includes('Moderate') ? 'HOLD pesticide spraying. Rain will wash off active ingredients within 2 hours.' : 'Safe to spray insecticides between 7 AM and 10 AM.',
      fertilizerAdvice: profile.soilMoisture.includes('High') ? 'Apply soil drenching organic bio-fertilizers today.' : 'Avoid broadcast granular fertilizer during dry afternoon heat.',
      delayHarvest: profile.rainfall.includes('Heavy') ? 'YES - Delay harvest by 48 hours to preserve crop sugar/oil concentration.' : 'NO - Proceed with scheduled picking.'
    };

    res.json({
      success: true,
      data: {
        district,
        current: profile,
        forecast7Day,
        outlook30Day,
        aiDecisions,
        extensionOfficerAdvice: formatExtensionResponse({
          summary: `Weather conditions in ${district} indicate high relative humidity (${profile.humidity}%) and ${profile.rainfall}.`,
          explanation: 'Sustained shade moisture promotes fungal spore dispersal. Foliar operations must coincide with dry wind gaps.',
          recommendedAction: aiDecisions.pesticideAdvice,
          priorityLevel: 'Medium',
          estimatedCost: '₹0 (Cultural Management)',
          expectedBenefit: 'Avoids wasted spray chemicals and maintains soil microflora balance'
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    3. Market Price Forecast
// @route   GET /api/ai/market-forecast
export const getMarketForecast = async (req, res, next) => {
  try {
    const { crop = 'Cardamom', market = 'Puttady' } = req.query;

    const basePrices = {
      Cardamom: { today: 2450, yesterday: 2420, lastWeek: 2380, lastMonth: 2210, unit: 'kg' },
      'Black Pepper': { today: 640, yesterday: 635, lastWeek: 620, lastMonth: 590, unit: 'kg' },
      Tea: { today: 185, yesterday: 182, lastWeek: 180, lastMonth: 172, unit: 'kg' },
      Coffee: { today: 290, yesterday: 288, lastWeek: 282, lastMonth: 265, unit: 'kg' },
      Grapes: { today: 95, yesterday: 92, lastWeek: 88, lastMonth: 80, unit: 'kg' },
      Banana: { today: 34, yesterday: 33, lastWeek: 31, lastMonth: 28, unit: 'kg' },
      Ginger: { today: 140, yesterday: 138, lastWeek: 132, lastMonth: 120, unit: 'kg' }
    };

    const selectedBase = basePrices[crop] || basePrices['Cardamom'];

    const historicalChart = [
      { date: '30 Days Ago', price: selectedBase.lastMonth },
      { date: '21 Days Ago', price: selectedBase.lastMonth + 40 },
      { date: '14 Days Ago', price: selectedBase.lastWeek - 20 },
      { date: '7 Days Ago', price: selectedBase.lastWeek },
      { date: 'Yesterday', price: selectedBase.yesterday },
      { date: 'Today', price: selectedBase.today }
    ];

    const aiPredictions = {
      day7: Math.round(selectedBase.today * 1.03),
      day15: Math.round(selectedBase.today * 1.07),
      day30: Math.round(selectedBase.today * 1.12),
      trendDirection: 'Bullish (Upward)',
      confidence: '89%'
    };

    const marketComparisons = [
      { marketName: 'Puttady Spices Park (Kerala)', price: selectedBase.today + 35, arrivalVolume: '48 Tons' },
      { marketName: 'Bodinayakanur Auction (TN)', price: selectedBase.today + 20, arrivalVolume: '62 Tons' },
      { marketName: 'Kumily Local Market', price: selectedBase.today - 15, arrivalVolume: '18 Tons' },
      { marketName: 'Theni APMC Mandi', price: selectedBase.today - 25, arrivalVolume: '30 Tons' },
      { marketName: 'Munnar Planters Co-op', price: selectedBase.today + 10, arrivalVolume: '12 Tons' }
    ];

    const priceDrivers = [
      { factor: 'Export Demand', impact: '+5.2%', details: 'Strong buying interest from Middle East (UAE, Saudi Arabia) and EU spice buyers.' },
      { factor: 'Festival Demand', impact: '+3.1%', details: 'Upcoming Onam and Deepavali festive inventory buildup.' },
      { factor: 'Production Supply', impact: '-1.5%', details: 'Slight harvest delays due to misty weather in High Range estates.' }
    ];

    res.json({
      success: true,
      data: {
        crop,
        currentMarket: market,
        unit: selectedBase.unit,
        prices: selectedBase,
        historicalChart,
        aiPredictions,
        marketComparisons,
        priceDrivers,
        extensionOfficerAdvice: formatExtensionResponse({
          summary: `Market outlook for ${crop} in ${market} is BULLISH (+7% expected over 15 days).`,
          explanation: `Strong export commitments in Bodi and Puttady auctions coupled with tight arrivals are driving prices higher.`,
          recommendedAction: `Hold 40% of cured grade-A ${crop} inventory for 2 weeks to realize premium auction rates.`,
          priorityLevel: 'Medium',
          estimatedCost: '₹120 / quintal (Dry Storage Maintenance)',
          expectedBenefit: 'Additional profit margin of ₹150 - ₹180 per kg'
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    4. AI Crop Advisory
// @route   POST /api/ai/crop-advisory
export const getCropAdvisory = async (req, res, next) => {
  try {
    const { district = 'Kumily', crop = 'Cardamom', ageYears = 3, areaAcres = 2, problem = 'Yellowing of leaves' } = req.body;

    res.json({
      success: true,
      data: {
        district,
        crop,
        ageYears,
        areaAcres,
        problem,
        dailyAdvice: [
          'Morning (7 AM): Check soil moisture and clear shade canopy if fog persists.',
          'Afternoon (1 PM): Inspect leaf under-surfaces for thrips or spider mite colonies.',
          'Evening (5 PM): Prepare organic neem cake + groundnut cake bio-slurry.'
        ],
        weeklyAdvice: [
          'Apply 2kg micronutrient spray (Zinc + Magnesium Sulfate) per acre.',
          'Perform weed slashing along terrace borders to prevent pest harborage.',
          'Verify shade tree spacing (aim for 50% solar diffusion).'
        ],
        monthlyPlan: [
          'Week 1: Soil application of VAM (Vesicular Arbuscular Mycorrhiza) @ 5kg/acre.',
          'Week 2: Foliar spray of Potassium Nitrate (13-0-45) @ 10g/L to boost capsule size.',
          'Week 3: Clean drainage trenches before expected rainfall spell.',
          'Week 4: Evaluate harvest readiness and register lot for local auction.'
        ],
        harvestRecommendation: `Expected prime picking in 18-24 days. Ensure 80% capsule color uniformity before hand picking.`,
        riskAnalysis: {
          diseaseRisk: 'Moderate (Fungal Leaf Blight)',
          pestRisk: 'High (Cardamom Thrips)',
          weatherRisk: 'Low (Favorable Rainfall)',
          overallRiskLevel: 'Moderate'
        },
        extensionOfficerAdvice: formatExtensionResponse({
          summary: `Advisory generated for ${crop} (${ageYears} yrs) in ${district} facing '${problem}'.`,
          explanation: 'Yellowing in 3-year cardamom is frequently linked to magnesium deficiency combined with thrips feeding pressure.',
          recommendedAction: 'Foliar spray Magnesium Sulfate (5g/L) + Neem oil 10,000 ppm (2ml/L) early morning.',
          priorityLevel: 'High',
          estimatedCost: '₹450 / acre',
          expectedBenefit: 'Restores leaf chlorophyll in 7 days and prevents capsule dropping'
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    5. Fertilizer Advisor
// @route   POST /api/ai/fertilizer-adviser
export const getFertilizerAdvice = async (req, res, next) => {
  try {
    const { crop = 'Cardamom', ageYears = 4, soilType = 'Loamy High-Range Forest Soil', rainfall = 'High', areaAcres = 1 } = req.body;

    res.json({
      success: true,
      data: {
        crop,
        soilType,
        areaAcres,
        recommendedChemical: {
          name: 'NPK 7:11:17 Complex + Boron',
          quantityPerAcre: `${areaAcres * 75} kg`,
          splitDoses: 'Split into 3 equal applications (May, August, November)',
          costEstimate: `₹${areaAcres * 1400}`
        },
        organicAlternative: {
          name: 'Enriched Vermicompost + Neem Cake + Trichoderma',
          quantityPerAcre: `${areaAcres * 500} kg Vermicompost + ${areaAcres * 100} kg Neem Cake`,
          benefits: 'Builds soil humus, prevents root nematodes, provides slow-release micronutrients',
          costEstimate: `₹${areaAcres * 1800}`
        },
        applicationMethod: 'Ring application 30cm away from plant stem. Incorporate light soil cover immediately.',
        bestTime: 'Apply when soil is moist, preferably early morning after light drizzle.',
        precautions: 'Do NOT apply chemical fertilizer directly against root clump or on dry soil.',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: `Fertilizer protocol formulated for ${areaAcres} acre(s) of ${crop} in ${soilType}.`,
          explanation: 'High range rainfall causes rapid leaching of nitrogen and potash. Split organic-blend application maximizes root absorption.',
          recommendedAction: 'Apply Neem cake enriched Vermicompost ring around plant clump followed by light mulch.',
          priorityLevel: 'Medium',
          estimatedCost: `₹${areaAcres * 1600} total`,
          expectedBenefit: '30% increase in tillering capacity and higher essential oil content'
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    6. Pest Alert
// @route   GET /api/ai/pest-alerts
export const getPestAlerts = async (req, res, next) => {
  try {
    const alerts = [
      {
        id: 'pest-1',
        pestName: 'Cardamom Thrips (Sciothrips cardamomi)',
        targetCrop: 'Cardamom',
        affectedDistricts: ['Kumily', 'Puttady', 'Bodinayakanur', 'Udumbanchola'],
        riskLevel: 'HIGH',
        symptoms: 'Scabbed lesions on capsules, flower shed, leaf curling.',
        preventiveMeasures: 'Regulate shade to 50%, spray Verticillium lecanii (5g/L) during humid evening hours.',
        recommendedChemical: 'Spinosad 45 SC (0.3ml/L) or Fipronil 5 SC (2ml/L).',
        organicAlternative: 'Neem oil 10,000 ppm (3ml/L) + Soap nut extract.'
      },
      {
        id: 'pest-2',
        pestName: 'Tea Mosquito Bug (Helopeltis theivora)',
        targetCrop: 'Tea & Neem',
        affectedDistricts: ['Munnar', 'Devikulam', 'Peerumedu'],
        riskLevel: 'MEDIUM-HIGH',
        symptoms: 'Brown necrotic spots on tender leaves and shoots.',
        preventiveMeasures: 'Remove wild alternate hosts (Eupatorium weed) along fence lines.',
        recommendedChemical: 'Thiamethoxam 25 WG (0.2g/L).',
        organicAlternative: 'Beaveria bassiana bio-insecticide (5g/L).'
      },
      {
        id: 'pest-3',
        pestName: 'Mealybug & Mealy Scale',
        targetCrop: 'Grapes & Coffee',
        affectedDistricts: ['Cumbum', 'Theni', 'Periyakulam'],
        riskLevel: 'MEDIUM',
        symptoms: 'White waxy coating on grape stems and fruit bunches.',
        preventiveMeasures: 'Release predatory ladybird beetles (Cryptolaemus montrouzieri) @ 500/acre.',
        recommendedChemical: 'Buprofezin 25 SC (1.5ml/L).',
        organicAlternative: 'Fish oil rosin soap (25g/L) spray.'
      }
    ];

    res.json({
      success: true,
      count: alerts.length,
      data: alerts,
      extensionOfficerAdvice: formatExtensionResponse({
        summary: 'Active Pest Alert: High Cardamom Thrips activity reported in Kumily & Bodi Gap.',
        explanation: 'Intermittent sunshine following mist encourages thrips multiplication in flower panicles.',
        recommendedAction: 'Inspect panicles using hand lens. Apply bio-pesticide Verticillium lecanii if thrips count exceeds 3 per panicle.',
        priorityLevel: 'High',
        estimatedCost: '₹550 / acre',
        expectedBenefit: 'Prevents capsule scabbing and preserves Grade-A market export value'
      })
    });
  } catch (error) {
    next(error);
  }
};

// @desc    7. Harvest Planner
// @route   POST /api/ai/harvest-planner
export const getHarvestPlan = async (req, res, next) => {
  try {
    const { crop = 'Cardamom', areaAcres = 2, expectedYieldKg = 350, pricePerKg = 2400 } = req.body;

    const acres = Number(areaAcres) || 1;
    const yieldTotal = (Number(expectedYieldKg) || 200) * acres;
    const price = Number(pricePerKg) || 2000;
    const estRevenue = yieldTotal * price;

    res.json({
      success: true,
      data: {
        crop,
        areaAcres: acres,
        idealHarvestDate: 'October 14, 2026 - October 22, 2026',
        qualityScore: '92 / 100 (Export Grade A)',
        expectedYieldTotal: `${yieldTotal} kg`,
        expectedRevenue: `₹${estRevenue.toLocaleString('en-IN')}`,
        pickingInterval: 'Harvest in 3 sequential rounds spaced 18 days apart.',
        storageAdvice: 'Cure harvested green cardamom in specialized hot air drying chamber at 45°C - 50°C for 22 hours to retain bright green color.',
        extensionOfficerAdvice: formatExtensionResponse({
          summary: `Harvest Plan generated for ${acres} acre(s) of ${crop}. Projected Revenue: ₹${estRevenue.toLocaleString('en-IN')}.`,
          explanation: 'Timing harvest at 85% capsule maturity maximizes volatile oil content (terpinyl acetate) and prevents capsule splitting.',
          recommendedAction: 'Schedule skilled harvesting labor for 3 picking rounds. Ensure curing kiln firewood/electric heaters are serviced.',
          priorityLevel: 'Medium',
          estimatedCost: '₹140 / kg (Labor & Curing Cost)',
          expectedBenefit: 'Secures top premium rate in Puttady / Bodi auctions'
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    8. Government Schemes
// @route   GET /api/ai/schemes
export const getGovSchemes = async (req, res, next) => {
  try {
    const schemes = [
      {
        id: 'scheme-1',
        title: 'Spices Board Replanting Subsidy for Small Cardamom',
        state: 'Tamil Nadu & Kerala (Western Ghats)',
        subsidyAmount: '₹70,000 / hectare',
        eligibility: 'Small growers holding up to 8 hectares of cardamom land in Kerala/TN.',
        benefits: '50% cost assistance for land preparation, shade regulation, quality high-yielding varieties (PM-1, PV-1).',
        requiredDocuments: ['Land Tax Receipt / Pattayam', 'Aadhaar Card', 'Bank Passbook Copy', 'Spices Board Registration Certificate'],
        howToApply: 'Apply online through Spices Board e-portal or submit physical form to Regional Field Office at Kumily / Bodinayakanur.'
      },
      {
        id: 'scheme-2',
        title: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        state: 'Tamil Nadu (Theni District)',
        subsidyAmount: '40% - 50% Subsidy on Machinery',
        eligibility: 'Individual farmers, SHGs, and Farmer Producer Organizations (FPOs).',
        benefits: 'Financial assistance for power tillers, pulse sprayers, weeders, and mini tractors.',
        requiredDocuments: ['Aadhaar Card', 'Chitta / Adangal', 'Bank Passbook', 'Quotation from Authorized Dealer'],
        howToApply: 'Register on TN AED Uzhavan App or contact Assistant Director of Agricultural Engineering, Theni.'
      },
      {
        id: 'scheme-3',
        title: 'State Horticulture Mission - Polyhouse & Shade Net Subsidy',
        state: 'Kerala (Idukki District)',
        subsidyAmount: '50% Cost Subsidy (Up to ₹4.5 Lakhs)',
        eligibility: 'Growers cultivating high-value flowers, vegetables, and nursery saplings.',
        benefits: 'Protected cultivation structure setup for adverse hill weather resilience.',
        requiredDocuments: ['Possession Certificate', 'Aadhaar Card', 'Basic Tax Receipt', 'Project Estimate'],
        howToApply: 'Submit proposal to Krishi Bhavan officer at Kattappana / Nedumkandam.'
      }
    ];

    res.json({
      success: true,
      count: schemes.length,
      data: schemes,
      extensionOfficerAdvice: formatExtensionResponse({
        summary: 'Government Scheme Guidance for Western Ghats Farmers.',
        explanation: 'Subsidies reduce capital cost for replanting and mechanization by up to 50%.',
        recommendedAction: 'Gather land tax receipt and Aadhaar to submit Spices Board replanting application before deadline.',
        priorityLevel: 'Low',
        estimatedCost: '₹0 Application Fee',
        expectedBenefit: 'Direct bank transfer of ₹70,000/ha subsidy'
      })
    });
  } catch (error) {
    next(error);
  }
};

// @desc    9. AI Extension Chatbot
// @route   POST /api/ai/chat
export const chatAI = async (req, res, next) => {
  try {
    const { message = '', history = [], district = 'Kumily', crop = 'Cardamom' } = req.body;

    const lowerMsg = message.toLowerCase();

    // Dynamic Crop Extraction
    let targetCrop = crop;
    if (lowerMsg.includes('cardamom')) targetCrop = 'Cardamom';
    else if (lowerMsg.includes('pepper')) targetCrop = 'Black Pepper';
    else if (lowerMsg.includes('tea')) targetCrop = 'Tea';
    else if (lowerMsg.includes('coffee')) targetCrop = 'Coffee';
    else if (lowerMsg.includes('grape')) targetCrop = 'Grapes';
    else if (lowerMsg.includes('banana')) targetCrop = 'Banana';
    else if (lowerMsg.includes('clove')) targetCrop = 'Clove';
    else if (lowerMsg.includes('ginger')) targetCrop = 'Ginger';
    else if (lowerMsg.includes('turmeric')) targetCrop = 'Turmeric';

    // Dynamic District Extraction
    let targetDistrict = district;
    if (lowerMsg.includes('kumily')) targetDistrict = 'Kumily';
    else if (lowerMsg.includes('puttady')) targetDistrict = 'Puttady';
    else if (lowerMsg.includes('kattappana')) targetDistrict = 'Kattappana';
    else if (lowerMsg.includes('munnar')) targetDistrict = 'Munnar';
    else if (lowerMsg.includes('theni')) targetDistrict = 'Theni';
    else if (lowerMsg.includes('cumbum')) targetDistrict = 'Cumbum';
    else if (lowerMsg.includes('bodi') || lowerMsg.includes('bodinayakanur')) targetDistrict = 'Bodinayakanur';
    else if (lowerMsg.includes('nedumkandam')) targetDistrict = 'Nedumkandam';

    let responseText = '';
    let advicePayload = null;

    // Intent 1: Fertilizer / NPK / Soil Nutrients / Compost
    if (lowerMsg.includes('fertilizer') || lowerMsg.includes('fertiliser') || lowerMsg.includes('npk') || lowerMsg.includes('compost') || lowerMsg.includes('manure') || lowerMsg.includes('nutrient') || lowerMsg.includes('potash') || lowerMsg.includes('nitrogen') || lowerMsg.includes('urea') || lowerMsg.includes('soil feed')) {
      if (targetCrop === 'Tea') {
        responseText = `For tea plantations in High Range estates near ${targetDistrict}, apply NPK 15:5:15 complex @ 120 kg/acre split into 4 equal doses during post-monsoon breaks. Supplement with Zinc Sulfate (1%) foliar spray to prevent leaf chlorosis and encourage vigorous vegetative flushing.`;
        advicePayload = formatExtensionResponse({
          summary: `Fertilizer Protocol for Tea in ${targetDistrict}.`,
          explanation: 'Tea requires high nitrogen and potassium ratio (3:1:3) to sustain frequent leaf plucking cycles.',
          recommendedAction: 'Apply NPK 15:5:15 complex split dose + 1% Zinc Sulfate foliar spray after plucking cycle.',
          priorityLevel: 'Medium',
          estimatedCost: '₹1,100 / acre',
          expectedBenefit: 'Increases Made Tea leaf yield by 22% with enhanced tender shoot density'
        });
      } else if (targetCrop === 'Cardamom') {
        responseText = `For ${targetCrop} in ${targetDistrict}, apply NPK 7:11:17 complex @ 75 kg/acre split into May, August, and November doses. Blend with 500kg enriched Vermicompost + 100kg Neem cake per acre to retain root zone moisture and prevent root nematodes.`;
        advicePayload = formatExtensionResponse({
          summary: `Fertilizer Protocol for Cardamom in ${targetDistrict}.`,
          explanation: 'Acidic forest soils require high potash and organic neem cake to support rhizome tillering.',
          recommendedAction: 'Ring application of NPK 7:11:17 + Vermicompost 30cm away from plant stem.',
          priorityLevel: 'High',
          estimatedCost: '₹1,400 / acre',
          expectedBenefit: 'Boosts capsule size to 8mm+ export grade'
        });
      } else if (targetCrop === 'Black Pepper') {
        responseText = `For Black Pepper vines in ${targetDistrict}, apply 10kg well-rotted farmyard manure mixed with 100g NPK 12:12:17 per vine twice yearly (May & September). Apply in a ring 30cm away from the support tree trunk.`;
        advicePayload = formatExtensionResponse({
          summary: `Fertilizer Protocol for Black Pepper in ${targetDistrict}.`,
          explanation: 'Balanced NPK prevents vine exhaustion and supports heavy berry spike retention.',
          recommendedAction: 'Apply farmyard manure + NPK 12:12:17 in a ring 30cm around support tree.',
          priorityLevel: 'Medium',
          estimatedCost: '₹950 / acre',
          expectedBenefit: 'Prevents spike shedding and increases piperine oil concentration'
        });
      } else if (targetCrop === 'Grapes') {
        responseText = `For ${targetDistrict} grape vineyards, apply NPK 10:26:26 complex prior to pruning, followed by drip fertigation of Calcium Nitrate (5g/L) during berry growth for optimal cluster sweetness and crunchiness.`;
        advicePayload = formatExtensionResponse({
          summary: `Fertigation Schedule for Grapes in ${targetDistrict}.`,
          explanation: 'High phosphorus and potassium promote uniform berry set and high Brix sugar content.',
          recommendedAction: 'Apply NPK 10:26:26 pre-pruning + Calcium Nitrate drip fertigation.',
          priorityLevel: 'High',
          estimatedCost: '₹1,600 / acre',
          expectedBenefit: 'Increases grape sweetness (>18° Brix) and shelf life'
        });
      } else {
        responseText = `For ${targetCrop} in ${targetDistrict}, apply a balanced NPK complex suited for hill slope soils, enriched with 300kg Neem-cake vermicompost per acre. Maintain ring application 30cm from main stem when soil is moist.`;
        advicePayload = formatExtensionResponse({
          summary: `Agronomic Fertilizer Plan for ${targetCrop} (${targetDistrict}).`,
          explanation: 'Hill slope leaching requires split organic-complex applications.',
          recommendedAction: 'Apply organic vermicompost blend around plant base followed by light mulching.',
          priorityLevel: 'Medium',
          estimatedCost: '₹1,200 / acre',
          expectedBenefit: 'Sustains long-term soil organic carbon and crop vitality'
        });
      }
    } 
    // Intent 2: Yellow Leaves / Disease / Symptoms / Wilting
    else if (lowerMsg.includes('yellow') || lowerMsg.includes('leaves') || lowerMsg.includes('leaf') || lowerMsg.includes('disease') || lowerMsg.includes('wilting') || lowerMsg.includes('rot') || lowerMsg.includes('blight') || lowerMsg.includes('katte') || lowerMsg.includes('azhukal') || lowerMsg.includes('rust')) {
      if (targetCrop === 'Cardamom') {
        responseText = `Yellowing of leaves in ${targetCrop} around ${targetDistrict} is typically caused by Katte Virus (Mosaic Virus) or Magnesium deficiency due to heavy rainfall leaching. Inspect leaf undersides for thrips scabbing. Root drenching with 1% Bordeaux mixture + 1% Magnesium Sulfate is strongly recommended.`;
        advicePayload = formatExtensionResponse({
          summary: `Diagnosis for leaf yellowing in ${targetCrop} (${targetDistrict}).`,
          explanation: 'Acidic forest soils in Western Ghats often bind magnesium. High rainfall washes out soluble cations.',
          recommendedAction: 'Drench soil with 1% Bordeaux mixture + apply 1% Magnesium Sulfate + 500g neem cake per clump.',
          priorityLevel: 'High',
          estimatedCost: '₹400 / acre',
          expectedBenefit: 'Restores leaf health within 10 days and prevents Katte virus spread'
        });
      } else if (targetCrop === 'Black Pepper') {
        responseText = `Yellowing and wilting of pepper vines in ${targetDistrict} indicate Phytophthora Foot Rot (Quick Wilt) triggered by water stagnation around support trees. Clear drainage channels immediately and drench vine roots with Potassium Phosphonate (3ml/L).`;
        advicePayload = formatExtensionResponse({
          summary: `Phytophthora Foot Rot Alert for Pepper in ${targetDistrict}.`,
          explanation: 'Saturated soil encourages rapid fungal spore multiplication at vine root base.',
          recommendedAction: 'Clear root drainage furrows & drench base with Potassium Phosphonate (3ml/L).',
          priorityLevel: 'High',
          estimatedCost: '₹1,200 / acre',
          expectedBenefit: 'Prevents vine mortality and protects entire plantation yield'
        });
      } else if (targetCrop === 'Tea') {
        responseText = `Yellowing tea shoots indicate Blister Blight infection or severe Zinc deficiency. Spray Hexaconazole (1ml/L) combined with Copper Oxychloride (2g/L) immediately after plucking cycle.`;
        advicePayload = formatExtensionResponse({
          summary: `Blister Blight & Chlorosis Advisory for Tea in ${targetDistrict}.`,
          explanation: 'High mist retention on tender shoots triggers fungal blisters.',
          recommendedAction: 'Foliar spray Hexaconazole (1ml/L) + Copper Oxychloride post-plucking.',
          priorityLevel: 'High',
          estimatedCost: '₹600 / acre',
          expectedBenefit: 'Preserves prime Made Tea flush quality'
        });
      } else {
        responseText = `Foliar yellowing and discoloration in ${targetCrop} around ${targetDistrict} usually signals micro-nutrient deficiency or fungal infection from High Range shade moisture. Apply Bordeaux mixture 1% and drench root zones with bio-agents.`;
        advicePayload = formatExtensionResponse({
          summary: `Foliar Health Advisory for ${targetCrop} in ${targetDistrict}.`,
          explanation: 'Excess shade and soil acidity lower nutrient uptake.',
          recommendedAction: 'Apply 1% Bordeaux mixture spray & drench with Trichoderma viride.',
          priorityLevel: 'High',
          estimatedCost: '₹500 / acre',
          expectedBenefit: 'Stops fungal infection and restores leaf chlorophyll'
        });
      }
    } 
    // Intent 3: Weather / Rain / Spraying / Microclimate
    else if (lowerMsg.includes('rain') || lowerMsg.includes('weather') || lowerMsg.includes('spray') || lowerMsg.includes('humidity') || lowerMsg.includes('monsoon') || lowerMsg.includes('drizzle')) {
      responseText = `Microclimate telemetry for ${targetDistrict} indicates high relative humidity (82-88%) with intermittent monsoon showers forecast. I advise HOLDING chemical foliar sprays today to prevent chemical wash-off. Ensure terrace drainage furrows are clear and schedule bio-pesticide applications between 7 AM and 10 AM when mist clears.`;
      advicePayload = formatExtensionResponse({
        summary: `Weather & Spraying Advisory for ${targetDistrict}.`,
        explanation: 'Foliar sprays require a minimum 3-hour dry window for leaf cuticle absorption.',
        recommendedAction: 'Postpone spraying until rain spell passes. Clear terrace drainage furrows.',
        priorityLevel: 'Medium',
        estimatedCost: '₹0 (Cultural Management)',
        expectedBenefit: 'Prevents wasted chemical expenditure and protects soil microflora'
      });
    } 
    // Intent 4: Harvest / Picking / Curing / Spike Maturity
    else if (lowerMsg.includes('harvest') || lowerMsg.includes('pick') || lowerMsg.includes('picking') || lowerMsg.includes('cure') || lowerMsg.includes('curing') || lowerMsg.includes('maturity') || lowerMsg.includes('ready')) {
      if (targetCrop === 'Black Pepper') {
        responseText = `Black Pepper in ${targetDistrict} is ready for harvest when 1 or 2 berries on the spike turn bright red/orange. Pick full spikes, threshed within 24 hours, and sun-dry on clean mats for 3-4 days until moisture drops below 10% and berries turn characteristic dark charcoal black.`;
        advicePayload = formatExtensionResponse({
          summary: `Harvest & Processing Protocol for Black Pepper in ${targetDistrict}.`,
          explanation: 'Harvesting at spike maturity yields maximum garbled MG-1 grade quality.',
          recommendedAction: 'Harvest when red berries appear on spike. Thresh within 24 hours & sun-dry.',
          priorityLevel: 'Medium',
          estimatedCost: '₹120 / kg processing',
          expectedBenefit: 'Ensures top Garbled MG-1 market price'
        });
      } else if (targetCrop === 'Cardamom') {
        responseText = `Cardamom capsules in ${targetDistrict} are ready for harvest when 85% of capsules are firm with dark brown/black seeds inside. Perform 3 picking rounds spaced 18 days apart. Cure in hot air drying kiln at 45°C - 50°C for 22 hours to preserve vibrant green export color.`;
        advicePayload = formatExtensionResponse({
          summary: `Harvest & Curing Guide for Cardamom in ${targetDistrict}.`,
          explanation: 'Curing at 45-50°C locks in essential volatile oils and retains deep green color.',
          recommendedAction: 'Schedule 3 picking rounds. Maintain curing kiln temperature at 45-50°C for 22 hours.',
          priorityLevel: 'Medium',
          estimatedCost: '₹140 / kg curing',
          expectedBenefit: 'Fetches premium rates in Puttady & Bodi auctions'
        });
      } else {
        responseText = `Harvest ${targetCrop} in ${targetDistrict} when crop reaches 85-90% maturity. Process under controlled shade/temperature to preserve color and volatile oil content.`;
        advicePayload = formatExtensionResponse({
          summary: `Harvesting Guidance for ${targetCrop} in ${targetDistrict}.`,
          explanation: 'Optimal harvesting window maximizes market grade valuation.',
          recommendedAction: 'Hand-pick at peak maturity and store in dry ventilated containers.',
          priorityLevel: 'Medium',
          estimatedCost: '₹100 / kg',
          expectedBenefit: 'Maximizes crop market value and minimizes post-harvest loss'
        });
      }
    } 
    // Intent 5: Pest / Insects / Thrips / Borer / Bugs
    else if (lowerMsg.includes('pest') || lowerMsg.includes('thrips') || lowerMsg.includes('insect') || lowerMsg.includes('bug') || lowerMsg.includes('borer') || lowerMsg.includes('mealybug')) {
      responseText = `Cardamom Thrips (Sciothrips cardamomi) and Tea Mosquito Bugs are active in High Range plantations like ${targetDistrict}. Inspect panicles/tender shoots. Spray Spinosad 45 SC (0.3ml/L) or organic Verticillium lecanii (5g/L) during evening hours. Maintain 50% shade diffusion to lower insect breeding.`;
      advicePayload = formatExtensionResponse({
        summary: `Integrated Pest Management (IPM) for ${targetDistrict}.`,
        explanation: 'Intermittent sunshine and shade humidity favor thrips panicle colonization.',
        recommendedAction: 'Foliar spray Spinosad 45 SC (0.3ml/L) or Verticillium lecanii during evening hours.',
        priorityLevel: 'High',
        estimatedCost: '₹550 / acre',
        expectedBenefit: 'Prevents capsule scabbing and preserves Grade-A export value'
      });
    } 
    // Intent 6: Price / Market / Rates / Auction / Selling
    else if (lowerMsg.includes('price') || lowerMsg.includes('market') || lowerMsg.includes('rate') || lowerMsg.includes('auction') || lowerMsg.includes('sell') || lowerMsg.includes('trend')) {
      responseText = `Current market trend for ${targetCrop} in ${targetDistrict} (Puttady & Bodinayakanur auctions) is BULLISH. Grade-A green cardamom is trading around ₹2,450 - ₹2,850/kg, while MG-1 Black Pepper holds strong at ₹640/kg. High Middle East export demand suggests holding 30% of dried inventory for 2-3 weeks for additional margin.`;
      advicePayload = formatExtensionResponse({
        summary: `Market Price & Selling Strategy for ${targetCrop}.`,
        explanation: 'Strong Middle East & domestic buyer demand is driving auction rates upward.',
        recommendedAction: 'Hold 30% of cured grade-A inventory for 2-3 weeks to capture peak auction price.',
        priorityLevel: 'Medium',
        estimatedCost: '₹100 / quintal storage',
        expectedBenefit: 'Realizes additional profit margin of ₹150 - ₹200 per kg'
      });
    } 
    // Intent 7: Government Schemes / Subsidies / Grants
    else if (lowerMsg.includes('scheme') || lowerMsg.includes('subsidy') || lowerMsg.includes('subsidies') || lowerMsg.includes('grant') || lowerMsg.includes('spices board') || lowerMsg.includes('smam') || lowerMsg.includes('govt')) {
      responseText = `Major government subsidies available for ${targetDistrict} farmers include: 1) Spices Board Replanting Subsidy (₹70,000/ha for cardamom replanting), 2) TN SMAM Scheme (40-50% subsidy on tillers & power sprayers in Theni), and 3) Kerala State Horticulture Mission (50% subsidy up to ₹4.5 Lakhs for shade net/polyhouses in Idukki). Apply at local Krishi Bhavan or Spices Board office with Land Tax receipt and Aadhaar.`;
      advicePayload = formatExtensionResponse({
        summary: `Government Subsidy Programs for ${targetDistrict} Farmers.`,
        explanation: 'Subsidies reduce capital cost for replanting and farm mechanization by up to 50%.',
        recommendedAction: 'Submit Land Tax receipt, Aadhaar, and Bank Passbook to Krishi Bhavan / Spices Board portal.',
        priorityLevel: 'Low',
        estimatedCost: '₹0 Application Fee',
        expectedBenefit: 'Direct bank transfer of up to ₹70,000/ha subsidy'
      });
    } 
    // Fallback General Response
    else {
      responseText = `Greetings! As your Western Ghats Agricultural Extension Officer, I am here to assist with your ${targetCrop} farm in ${targetDistrict}. You can ask me about plant diseases, weather impacts, fertilizer plans, pest alerts, harvest timing, or market prices.`;
      advicePayload = formatExtensionResponse({
        summary: `Extension Officer Assistant active for ${targetDistrict} region.`,
        explanation: 'Tailored agronomic recommendations for Western Ghats hill farming.',
        recommendedAction: 'Select a quick query chip below or ask any specific question on crops, pests, prices or weather.',
        priorityLevel: 'Low',
        estimatedCost: 'Free Extension Service',
        expectedBenefit: 'Data-driven precision farming guidance'
      });
    }

    res.json({
      success: true,
      data: {
        reply: responseText,
        district: targetDistrict,
        crop: targetCrop,
        extensionOfficerAdvice: advicePayload
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    10. Farm Health Report Generator
// @route   POST /api/ai/farm-report
export const generateFarmReport = async (req, res, next) => {
  try {
    const { district = 'Kumily', farmerName = 'Local Farmer', crop = 'Cardamom', areaAcres = 3 } = req.body;

    res.json({
      success: true,
      data: {
        reportId: `AGRI-REPORT-${Math.floor(100000 + Math.random() * 900000)}`,
        generatedAt: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        farmerName,
        district,
        crop,
        areaAcres,
        overallFarmScore: 86,
        metrics: {
          diseaseRisk: { score: 78, status: 'Moderate Risk', detail: 'Slight Katte/Azhukal fungal pressure due to shade moisture.' },
          waterStress: { score: 92, status: 'Optimal Moisture', detail: 'Good soil retention in terrace slopes.' },
          weatherRisk: { score: 85, status: 'Favorable', detail: 'Moderate rainfall expected; good capsule filling weather.' },
          marketOpportunity: { score: 94, status: 'Excellent (Bullish)', detail: 'Puttady auction prices trending high at ₹2,450/kg.' }
        },
        actionPlan: [
          'Apply 1% Bordeaux mixture on shade-heavy plots within 5 days.',
          'Schedule 1st round cardamom picking in 12 days.',
          'Drench root zone with Trichoderma viride bio-agent.'
        ],
        extensionOfficerAdvice: formatExtensionResponse({
          summary: `Comprehensive Farm Health Audit for ${farmerName} (${areaAcres} Acres, ${district}).`,
          explanation: 'Overall farm rating is 86/100. Excellent market window available with manageable disease risk.',
          recommendedAction: 'Execute disease control recommendations and prepare curing equipment for upcoming harvest.',
          priorityLevel: 'Medium',
          estimatedCost: '₹1,800 total farm management',
          expectedBenefit: 'Maximizes yield quality and farm profitability'
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    11. Seasonal Crop Calendar
// @route   GET /api/ai/seasonal-calendar
export const getSeasonalCalendar = async (req, res, next) => {
  try {
    const calendar = [
      { month: 'January', activity: 'Post-harvest maintenance, shade regulation, organic mulching.' },
      { month: 'February - March', activity: 'Irrigation management, drip watering, thrips monitoring.' },
      { month: 'April - May', activity: 'Pre-monsoon showers, fertilizer application (1st dose), planting new suckers.' },
      { month: 'June - August', activity: 'Southwest monsoon, drainage clearance, Phytophthora & Azhukal disease prevention.' },
      { month: 'September - November', activity: 'Peak harvest season, cardamoms picking rounds, pepper spike maturity check.' },
      { month: 'December', activity: 'Final picking round, curing and grading for auctions.' }
    ];

    res.json({
      success: true,
      data: calendar
    });
  } catch (error) {
    next(error);
  }
};

// @desc    12. Export Opportunities
// @route   GET /api/ai/export-opportunities
export const getExportOpportunities = async (req, res, next) => {
  try {
    const opportunities = [
      {
        crop: 'Green Cardamom (8mm+ Extra Bold)',
        destination: 'UAE, Saudi Arabia, Kuwait',
        qualityRequirement: 'Max 10% moisture, deep green color, zero pesticide residue (EU standard).',
        estimatedPricePremium: '+25% over domestic market'
      },
      {
        crop: 'Black Pepper (Garbled Tellicherry MG-1)',
        destination: 'USA, Germany, Japan',
        qualityRequirement: 'Density 550g/L minimum, piperine content > 5.5%.',
        estimatedPricePremium: '+18% over local mandi'
      },
      {
        crop: 'Muscat Seedless Grapes',
        destination: 'Southeast Asia, Gulf Region',
        qualityRequirement: 'Brix sweetness > 18°, uniform berry size, zero blemish.',
        estimatedPricePremium: '+20% over regional wholesale'
      }
    ];

    res.json({
      success: true,
      data: opportunities
    });
  } catch (error) {
    next(error);
  }
};
