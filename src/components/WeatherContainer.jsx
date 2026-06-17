import React, { useState } from 'react';
import WeatherView from './WeatherView';

const STATIONS_DATA = {
  'Punjab Hub': {
    temperature: 28,
    humidity: 50,
    precipitation: 0,
    windSpeed: 12,
    forecast: 'Clear Sky & Dry Wind',
    windDirection: 'North West (NW)',
    evapRate: 'Moderate-High (5.2 mm/day)',
    tempStatus: 'Warm (Optimal for Wheat/Gram)'
  },
  'Maharashtra Deccan': {
    temperature: 34,
    humidity: 42,
    precipitation: 2,
    windSpeed: 18,
    forecast: 'Mild Scattered Showers',
    windDirection: 'South West (SW)',
    evapRate: 'High (6.8 mm/day)',
    tempStatus: 'Hot (Critical Cotton moisture loss)'
  },
  'Deep South Coastal': {
    temperature: 31,
    humidity: 78,
    precipitation: 15,
    windSpeed: 24,
    forecast: 'Sustained Heavy Monsoons',
    windDirection: 'South East (SE)',
    evapRate: 'Low (2.4 mm/day)',
    tempStatus: 'Humid (Excellent for Paddy planting)'
  },
  'Narmada Valley Delta': {
    temperature: 26,
    humidity: 62,
    precipitation: 0,
    windSpeed: 8,
    forecast: 'Early Evening Dew & Calm',
    windDirection: 'North East (NE)',
    evapRate: 'Low-Moderate (3.9 mm/day)',
    tempStatus: 'Mild (Normal development cycle)'
  }
};

export default function WeatherContainer() {
  const locations = Object.keys(STATIONS_DATA);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const weatherData = STATIONS_DATA[selectedLocation];

  // Derive farming metrics
  const getAgriAdvices = (data) => {
    let pesticideSpray = 'EXCELLENT';
    let pesticideClass = 'bg-emerald-100 text-emerald-800';
    let pesticideDesc = 'Low wind velocities and zero pending rainfall ensure maximum retention of applied crop formulas.';

    if (data.windSpeed > 15 || data.precipitation > 5) {
      pesticideSpray = 'UNSAFE / SUSPENDED';
      pesticideClass = 'bg-rose-100 text-rose-850';
      pesticideDesc = 'Active wind bursts or showers can drift chemical feeds or wash them into nearby runoff ponds.';
    } else if (data.windSpeed > 12) {
      pesticideSpray = 'MODERATE CAUTION';
      pesticideClass = 'bg-amber-100 text-amber-850';
      pesticideDesc = 'Light spray drift possible. Apply closest to ground or target evening hours.';
    }

    let dehydration = 'LOW RISK';
    let dehydClass = 'bg-emerald-100 text-emerald-800';
    let dehydDesc = 'Climatic transpiration rates are balanced. Regular weekly watering patterns remain fully sufficient.';

    if (data.temperature > 32 && data.humidity < 45) {
      dehydration = 'HIGH RISK';
      dehydClass = 'bg-rose-100 text-rose-850';
      dehydDesc = 'High temperatures paired with air dryness causes fast canopy moisture loss. Double the surface sprinkle.';
    } else if (data.temperature > 30 || data.humidity < 50) {
      dehydration = 'ALERT';
      dehydClass = 'bg-amber-100 text-amber-850';
      dehydDesc = 'Marginal thermal index observed. Check root soil moisture status in high exposure beds.';
    }

    let workforce = 'SAFE OUTDOORS';
    let workforceClass = 'bg-emerald-100 text-emerald-800';
    let workforceDesc = 'Climatic parameters are perfect for standard agricultural tilling, weeding, and collection tasks.';

    if (data.precipitation > 12) {
      workforce = 'SHELTER PREFERRED';
      workforceClass = 'bg-rose-100 text-rose-850';
      workforceDesc = 'Heavy rains create slippery paths and risk equipment bog-downs. Postpone physical soil work.';
    }

    return {
      pesticideSpray,
      pesticideClass,
      pesticideDesc,
      dehydration,
      dehydClass,
      dehydDesc,
      workforce,
      workforceClass,
      workforceDesc
    };
  };

  const agriAdvices = getAgriAdvices(weatherData);

  return (
    <WeatherView
      locations={locations}
      selectedLocation={selectedLocation}
      weatherData={weatherData}
      onLocationChange={setSelectedLocation}
      agriAdvices={agriAdvices}
    />
  );
}
