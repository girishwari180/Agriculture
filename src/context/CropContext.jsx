import React, { createContext, useState, useEffect } from 'react';

export const CropContext = createContext(null);

export const CROPS_DATA = [
  // Kharif crops
  {
    id: 'rice',
    name: 'Rice',
    season: 'Kharif',
    soilType: 'Clayey',
    phiMin: 5.5,
    phiMax: 6.5,
    tempMin: 21,
    tempMax: 37,
    waterRequirement: '1200-1500 mm',
    lifecycleDays: 120,
    fertilizerNPK: { Germination: '20-10-10', Seedling: '30-15-15', Vegetative: '40-20-20', Flowering: '20-25-25', Fruiting: '10-20-40', Maturity: '0-0-10' },
    baseYieldPerHectare: 4.5, // tons
    basePricePerTon: 350, // USD
    description: 'Rice is the primary staple crop for a large part of the world population. It requires high water level, plenty of sunshine, and clayey soils that can retain moisture.'
  },
  {
    id: 'cotton',
    name: 'Cotton',
    season: 'Kharif',
    soilType: 'Black',
    phiMin: 6.0,
    phiMax: 8.0,
    tempMin: 21,
    tempMax: 30,
    waterRequirement: '700-1300 mm',
    lifecycleDays: 180,
    fertilizerNPK: { Germination: '15-15-15', Seedling: '25-15-15', Vegetative: '50-10-20', Flowering: '30-20-20', Fruiting: '10-10-30', Maturity: '0-0-20' },
    baseYieldPerHectare: 2.2,
    basePricePerTon: 850,
    description: 'Cotton is a major cash crop requiring a warm climate, medium rainfall, and rich clayey/black soil with good drainage.'
  },
  {
    id: 'soybean',
    name: 'Soybean',
    season: 'Kharif',
    soilType: 'Loamy',
    phiMin: 6.0,
    phiMax: 7.0,
    tempMin: 20,
    tempMax: 32,
    waterRequirement: '450-700 mm',
    lifecycleDays: 100,
    fertilizerNPK: { Germination: '10-20-20', Seedling: '15-20-25', Vegetative: '20-30-30', Flowering: '10-20-20', Fruiting: '10-15-30', Maturity: '0-0-10' },
    baseYieldPerHectare: 2.8,
    basePricePerTon: 480,
    description: 'Soybean is an important legume which enriches soil nitrogen. It thrives in well-drained loamy soils with optimal pH.'
  },
  {
    id: 'maize',
    name: 'Maize',
    season: 'Kharif',
    soilType: 'Alluvial',
    phiMin: 5.5,
    phiMax: 7.5,
    tempMin: 18,
    tempMax: 27,
    waterRequirement: '500-800 mm',
    lifecycleDays: 90,
    fertilizerNPK: { Germination: '30-15-15', Seedling: '40-20-15', Vegetative: '50-20-20', Flowering: '30-30-15', Fruiting: '15-15-35', Maturity: '0-0-15' },
    baseYieldPerHectare: 5.5,
    basePricePerTon: 240,
    description: 'Maize (Corn) is a highly versatile crop used as food, fodder, and raw material. It requires warm weather and deep alluvial or loamy soil.'
  },
  
  // Rabi crops
  {
    id: 'wheat',
    name: 'Wheat',
    season: 'Rabi',
    soilType: 'Loamy',
    phiMin: 6.0,
    phiMax: 7.5,
    tempMin: 12,
    tempMax: 25,
    waterRequirement: '450-650 mm',
    lifecycleDays: 130,
    fertilizerNPK: { Germination: '20-20-10', Seedling: '30-20-10', Vegetative: '45-15-15', Flowering: '20-20-20', Fruiting: '10-10-30', Maturity: '0-0-15' },
    baseYieldPerHectare: 3.8,
    basePricePerTon: 270,
    description: 'Wheat is a cool-season cereal, requiring moderate temperature during growth and warm sunny days during ripening.'
  },
  {
    id: 'mustard',
    name: 'Mustard',
    season: 'Rabi',
    soilType: 'Sandy',
    phiMin: 6.0,
    phiMax: 7.5,
    tempMin: 10,
    tempMax: 22,
    waterRequirement: '300-400 mm',
    lifecycleDays: 110,
    fertilizerNPK: { Germination: '15-15-10', Seedling: '25-20-10', Vegetative: '35-15-15', Flowering: '15-20-20', Fruiting: '5-10-25', Maturity: '0-0-10' },
    baseYieldPerHectare: 1.8,
    basePricePerTon: 620,
    description: 'Mustard is an oilseed crop that likes cool climates with low to moderate water requirements. It responds well to sandy or loamy soils.'
  },
  {
    id: 'barley',
    name: 'Barley',
    season: 'Rabi',
    soilType: 'Loamy',
    phiMin: 6.0,
    phiMax: 8.0,
    tempMin: 10,
    tempMax: 24,
    waterRequirement: '350-500 mm',
    lifecycleDays: 115,
    fertilizerNPK: { Germination: '15-15-10', Seedling: '25-15-10', Vegetative: '35-15-15', Flowering: '20-15-15', Fruiting: '10-10-25', Maturity: '0-0-10' },
    baseYieldPerHectare: 3.2,
    basePricePerTon: 210,
    description: 'Barley is highly drought-tolerant and can grow in saline soils where other rabi cereals might fail.'
  },
  {
    id: 'gram',
    name: 'Gram',
    season: 'Rabi',
    soilType: 'Sandy Loam',
    phiMin: 6.0,
    phiMax: 7.5,
    tempMin: 15,
    tempMax: 25,
    waterRequirement: '250-350 mm',
    lifecycleDays: 120,
    fertilizerNPK: { Germination: '10-20-10', Seedling: '10-25-15', Vegetative: '15-30-20', Flowering: '10-20-10', Fruiting: '5-15-25', Maturity: '0-0-10' },
    baseYieldPerHectare: 1.5,
    basePricePerTon: 580,
    description: 'Gram (Chickpea) is a pulse crop that matches dry winter climates best, extracting existing soil moisture deeply.'
  },

  // Zaid crops
  {
    id: 'watermelon',
    name: 'Watermelon',
    season: 'Zaid',
    soilType: 'Sandy',
    phiMin: 5.5,
    phiMax: 7.0,
    tempMin: 22,
    tempMax: 35,
    waterRequirement: '400-600 mm',
    lifecycleDays: 85,
    fertilizerNPK: { Germination: '15-30-15', Seedling: '20-20-20', Vegetative: '30-20-20', Flowering: '15-30-25', Fruiting: '10-15-35', Maturity: '0-0-20' },
    baseYieldPerHectare: 25.0, // High tonnage
    basePricePerTon: 180,
    description: 'Watermelon thrives in hot, sunny, summer climates. Sandy riverbeds with high temperature are optimal for root development.'
  },
  {
    id: 'muskmelon',
    name: 'Muskmelon',
    season: 'Zaid',
    soilType: 'Sandy',
    phiMin: 6.0,
    phiMax: 7.0,
    tempMin: 22,
    tempMax: 35,
    waterRequirement: '350-500 mm',
    lifecycleDays: 80,
    fertilizerNPK: { Germination: '15-30-15', Seedling: '20-20-20', Vegetative: '30-20-20', Flowering: '15-30-25', Fruiting: '10-15-35', Maturity: '0-0-20' },
    baseYieldPerHectare: 20.0,
    basePricePerTon: 220,
    description: 'Muskmelon is a warm-season fruit requiring excellent drainage, sandy soils, and warm dry climates for sugar development.'
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    season: 'Zaid',
    soilType: 'Loamy',
    phiMin: 5.5,
    phiMax: 7.0,
    tempMin: 20,
    tempMax: 32,
    waterRequirement: '350-450 mm',
    lifecycleDays: 70,
    fertilizerNPK: { Germination: '15-20-15', Seedling: '20-20-20', Vegetative: '30-15-15', Flowering: '15-25-20', Fruiting: '10-10-30', Maturity: '0-0-15' },
    baseYieldPerHectare: 15.0,
    basePricePerTon: 260,
    description: 'Cucumber is a fast-growing summer crop. It prefers nutritious soil and steady light watering schedule.'
  }
];

export function CropProvider({ children }) {
  // 1. Theme Configuration
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('agrointel_theme') || 'light';
  });

  // 2. Selected Crop Configuration
  const [selectedCrop, setSelectedCrop] = useState(() => {
    try {
      const stored = localStorage.getItem('agrointel_selected_crop');
      return stored ? JSON.parse(stored) : CROPS_DATA[0]; // defaults to Rice
    } catch {
      return CROPS_DATA[0];
    }
  });

  // 3. Saved Calculations History to dynamically update the general Dashboard
  const [advisorState, setAdvisorState] = useState(() => {
    try {
      const stored = localStorage.getItem('agrointel_advisor_state');
      if (stored) return JSON.parse(stored);
    } catch {}
    
    // Initial placeholder state based on default crop
    return {
      soilMoisture: 38, // %
      soilType: 'Loamy',
      season: 'Rabi',
      irrigationAdvice: {
        waterAmount: '15,000 Liters/Acre',
        frequency: 'Every 5-7 Days',
        message: 'Decent moisture levels observed. Light sprinkle recommended over heavy immersion.'
      },
      fertilizerAdvice: {
        recommendation: 'Urea (source of Nitrogen) + NPK complex mix',
        quantity: '45 kg / Acre',
        reason: 'Optimal for early Vegetative growth of Wheat, increasing chlorophyll density and leafy output.'
      },
      harvestPrediction: {
        sowingDate: '2026-05-10',
        harvestDate: '2026-09-17',
        remainingDays: 92
      },
      yieldPrediction: {
        landArea: 2.5,
        estimatedYield: 9.5, // tons
        estimatedRevenue: 2565 // USD
      }
    };
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('agrointel_theme', theme);
    // Apply styling to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (selectedCrop) {
      localStorage.setItem('agrointel_selected_crop', JSON.stringify(selectedCrop));
    }
  }, [selectedCrop]);

  useEffect(() => {
    localStorage.setItem('agrointel_advisor_state', JSON.stringify(advisorState));
  }, [advisorState]);

  // Derived calculations helper
  const calculateCropSuitability = (season, soilType, ph, temp, rain) => {
    const phVal = parseFloat(ph);
    const tempVal = parseFloat(temp);
    const scoreMap = CROPS_DATA.map(crop => {
      let score = 50; // starting evaluation basis
      
      // Match season (Strict bonus)
      if (crop.season.toLowerCase() === season.toLowerCase()) score += 20;
      
      // Match soil
      if (crop.soilType.toLowerCase() === soilType.toLowerCase()) score += 15;
      else if (soilType.toLowerCase().includes('loam') && crop.soilType.toLowerCase().includes('loam')) score += 10;
      
      // pH logic
      if (phVal >= crop.phiMin && phVal <= crop.phiMax) score += 15;
      else if (Math.abs(phVal - (crop.phiMin + crop.phiMax) / 2) < 1.0) score += 5;
      
      // Temperature logic
      if (tempVal >= crop.tempMin && tempVal <= crop.tempMax) score += 15;
      else if (tempVal > crop.tempMax) score -= 10;
      else if (tempVal < crop.tempMin) score -= 10;

      // Ensure score stays inside 10 to 98%
      const finalScore = Math.max(10, Math.min(98, score));

      return {
        ...crop,
        suitabilityScore: finalScore
      };
    });

    // sort descending by suitability
    return scoreMap.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  };

  const updateIrrigation = (cropId, moisture, temperature, rainfall) => {
    const crop = CROPS_DATA.find(c => c.id === cropId) || selectedCrop;
    const moistVal = parseFloat(moisture);
    const tempVal = parseFloat(temperature);
    const rainVal = parseFloat(rainfall);

    let waterAmountNum = 12000;
    let frequency = 'Every 6 Days';
    let msg = 'Moisture levels normal.';

    // calculate water amount
    if (moistVal < 30) {
      waterAmountNum += 5000;
      frequency = 'Every 3-4 Days';
      msg = 'Critical dryness detected! Urgent deep watering is required to support critical growth stages.';
    } else if (moistVal > 60) {
      waterAmountNum -= 4000;
      frequency = 'Every 10-12 Days';
      msg = 'Excess water levels observed. Suspend scheduled watering to prevent root-rot or fungal diseases.';
    } else {
      frequency = 'Every 6-8 Days';
      msg = 'Soil moisture is in the optimal band. Maintain standard moisture retention circles.';
    }

    if (tempVal > 35) {
      waterAmountNum += 2000;
      msg += ' High surrounding temperatures accelerate transpiration; consider mulch covering.';
    }
    if (rainVal > 20) {
      waterAmountNum -= 3000;
      msg += ' Recent heavy rainfall fulfills some crop requirements; adjust flow controls.';
    }

    const calculatedOutput = {
      waterAmount: `${Math.max(3000, waterAmountNum).toLocaleString()} Liters/Acre`,
      frequency,
      message: msg
    };

    setAdvisorState(prev => ({
      ...prev,
      soilMoisture: moistVal,
      soilType: crop.soilType,
      selectedCropId: crop.id,
      irrigationAdvice: calculatedOutput
    }));

    return calculatedOutput;
  };

  const updateFertilizer = (cropId, stage, n, p, k) => {
    const crop = CROPS_DATA.find(c => c.id === cropId) || selectedCrop;
    const nVal = parseFloat(n);
    const pVal = parseFloat(p);
    const kVal = parseFloat(k);

    const idealNPK = crop.fertilizerNPK[stage] || '20-20-20';
    const [idealN, idealP, idealK] = idealNPK.split('-').map(Number);

    let rec = '';
    let reason = '';
    let qty = '40 kg / Acre';

    const diffN = idealN - nVal;
    const diffP = idealP - pVal;
    const diffK = idealK - kVal;

    if (diffN > 10) {
      rec += 'Ammonium Nitrate / Urea ';
      reason += `Nitrogen deficit found (${diffN} units lower than targeted amount for ${stage} phase). `;
    }
    if (diffP > 10) {
      rec += 'Single Superphosphate (SSP) ';
      reason += `Phosphorus deficit found (${diffP} units). Phosphorous is vital during ${stage} to anchor root development. `;
    }
    if (diffK > 10) {
      rec += 'Muriate of Potash (MOP) ';
      reason += `Potash deficit noticed (${diffK} units). Potassium is key for fruiting size and immunity. `;
    }

    if (!rec) {
      rec = 'Balanced N-P-K Complex (19-19-19) ';
      reason = `Nutrient index matches the ideal agricultural goals for the ${stage} crop phase. Regular booster applied.`;
      qty = '25 kg / Acre';
    } else {
      rec = rec.trim().replace(/ /g, ' + ');
      reason = 'Targeted supplementation needed: ' + reason;
    }

    const calculatedOutput = {
      recommendation: rec,
      quantity: qty,
      reason
    };

    setAdvisorState(prev => ({
      ...prev,
      fertilizerAdvice: calculatedOutput
    }));

    return calculatedOutput;
  };

  const updateHarvest = (cropId, sowingDateStr) => {
    const crop = CROPS_DATA.find(c => c.id === cropId) || selectedCrop;
    const sowing = new Date(sowingDateStr);
    const lifecycle = crop.lifecycleDays;
    
    const harvest = new Date(sowing.getTime() + lifecycle * 24 * 60 * 60 * 1000);
    const today = new Date();
    
    const diffTime = harvest.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const calculatedOutput = {
      sowingDate: sowingDateStr,
      harvestDate: harvest.toISOString().split('T')[0],
      remainingDays: Math.max(0, diffDays)
    };

    setAdvisorState(prev => ({
      ...prev,
      harvestPrediction: calculatedOutput
    }));

    return calculatedOutput;
  };

  const updateYield = (cropId, area) => {
    const crop = CROPS_DATA.find(c => c.id === cropId) || selectedCrop;
    const areaVal = parseFloat(area);

    const yieldEst = crop.baseYieldPerHectare * areaVal;
    const revenueEst = yieldEst * crop.basePricePerTon;

    const calculatedOutput = {
      landArea: areaVal,
      estimatedYield: parseFloat(yieldEst.toFixed(2)),
      estimatedRevenue: parseInt(revenueEst.toFixed(0))
    };

    setAdvisorState(prev => ({
      ...prev,
      yieldPrediction: calculatedOutput
    }));

    return calculatedOutput;
  };

  return (
    <CropContext.Provider value={{
      theme,
      setTheme,
      selectedCrop,
      setSelectedCrop,
      cropsList: CROPS_DATA,
      advisorState,
      calculateCropSuitability,
      updateIrrigation,
      updateFertilizer,
      updateHarvest,
      updateYield
    }}>
      {children}
    </CropContext.Provider>
  );
}
