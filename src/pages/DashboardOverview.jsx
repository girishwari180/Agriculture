import React, { useContext } from 'react';
import { CropContext } from '../context/CropContext';
import { AuthContext } from '../context/AuthContext';
import WeatherContainer from '../components/WeatherContainer';
import { Link } from 'react-router-dom';

export default function DashboardOverview() {
  const { selectedCrop, advisorState, cropsList } = useContext(CropContext);
  const { user } = useContext(AuthContext);

  // Derived state demonstration: group list metadata
  const totalCropsAvailable = cropsList.length;
  const currentSeasonCrops = cropsList.filter(c => c.season.toLowerCase() === selectedCrop.season.toLowerCase());

  return (
    <div className="space-y-6 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-705 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight">
            Welcome, {user?.name || 'Operator'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time advisory diagnostic telemetry for your active focus: <strong className="text-emerald-700 dark:text-emerald-450">{selectedCrop?.name || 'Wheat'}</strong>.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full">
            Role: {user?.role || 'Farmer'}
          </span>
          <span className="bg-emerald-100 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-350 text-xs font-semibold px-3 py-1.5 rounded-full">
            Active Season: {selectedCrop?.season || 'Kharif'}
          </span>
        </div>
      </div>

      {/* Grid of Telemetry Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Soil Moisture */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-705 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Soil Moisture</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-455">
              {advisorState.soilMoisture}%
            </span>
            <span id="dashboard-moisture-badge" className="text-[10px] text-emerald-650 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md font-bold uppercase">
              {advisorState.soilMoisture < 30 ? 'Dry' : advisorState.soilMoisture > 60 ? 'Saturated' : 'Optimal'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            Base Matrix: {advisorState.soilType || 'Loamy'} 
          </p>
        </div>

        {/* Current Crop Focus */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-705 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Focus Crop</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
              {selectedCrop?.name || 'Wheat'}
            </span>
            <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-md font-medium uppercase font-sans">
              Stage: Vegetative
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            Duration: {selectedCrop?.lifecycleDays} Days lifecycle
          </p>
        </div>

        {/* Daily demand prediction */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-705 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Yield Vol</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-450">
              {advisorState.yieldPrediction?.estimatedYield || '9.5'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              tons / {advisorState.yieldPrediction?.landArea || '2.5'} ac
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
            Est. Value: ${advisorState.yieldPrediction?.estimatedRevenue?.toLocaleString() || '2,565'}
          </p>
        </div>

        {/* Remaining Days */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-705 flex flex-col justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Days to Harvest</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-black text-amber-600 dark:text-amber-500">
              {advisorState.harvestPrediction?.remainingDays || '92'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">
              Days left
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            Target: {advisorState.harvestPrediction?.harvestDate || '2026-09-17'}
          </p>
        </div>

      </div>

      {/* Advisory recommendations summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Irrigation Advice Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-705 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-450 uppercase tracking-wider">
                Active Irrigation Guide
              </span>
              <span className="text-xl" role="img" aria-label="water drops">💧</span>
            </div>
            <p className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-snug">
              {advisorState.irrigationAdvice?.waterAmount || '15,000 Liters/Acre'}
            </p>
            <span className="inline-block mt-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/50 rounded-lg text-xs font-mono font-bold px-2 py-1 text-slate-705 dark:text-slate-355">
              Frequency: {advisorState.irrigationAdvice?.frequency || 'Every 5-7 Days'}
            </span>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mt-4 italic">
              "{advisorState.irrigationAdvice?.message || 'Standard moist atmosphere. Maintenance watering required.'}"
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-750 flex justify-between items-center">
            <span className="text-[11px] text-slate-400 dark:text-slate-500">Inputs computed from Live Moisture</span>
            <Link
              to="/dashboard/irrigation"
              className="text-emerald-600 dark:text-emerald-450 text-xs font-semibold hover:underline"
            >
              Tune Simulator →
            </Link>
          </div>
        </div>

        {/* Fertilizer Advice Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-705 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-purple-705 dark:text-purple-400 uppercase tracking-wider">
                Prescription Fertilizer Intake
              </span>
              <span className="text-xl" role="img" aria-label="chemical chemistry container">🧪</span>
            </div>
            <p className="text-xl font-bold text-slate-850 dark:text-slate-100 leading-snug">
              {advisorState.fertilizerAdvice?.recommendation || 'Balanced N-P-K Mix'}
            </p>
            <span className="inline-block mt-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-750 rounded-lg text-xs font-semibold px-2.5 py-1 text-slate-705 dark:text-slate-305">
              Quantity Feed: {advisorState.fertilizerAdvice?.quantity || '40 kg / Acre'}
            </span>
            <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mt-4 italic">
              "{advisorState.fertilizerAdvice?.reason || 'Calculated to trigger optimal vegetative cell growth based on active stage.'}"
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-750 flex justify-between items-center">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">Formula stage: Vegetative</span>
            <Link
              to="/dashboard/fertilizer"
              className="text-emerald-600 dark:text-emerald-450 text-xs font-semibold hover:underline"
            >
              Analyze N-P-K Deficiency →
            </Link>
          </div>
        </div>

      </div>

      {/* Weather Station Advisory - Container / Presenter render */}
      <WeatherContainer />

      {/* Statistics helper - derived state representation of crop roster */}
      <div className="bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-150 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Database Statistics</p>
          <span className="text-xs text-slate-600 dark:text-slate-400 mt-1 block">
            The AgroIntel offline diagnostic module houses <strong>{totalCropsAvailable} proprietary crops</strong> cataloged. Currently observing <strong>{currentSeasonCrops.length} candidate crops</strong> highly suited to the {selectedCrop.season} sowing cycle.
          </span>
        </div>
        <Link
          to="/dashboard/crops"
          className="bg-slate-850 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shrink-0"
        >
          Explore All Crops
        </Link>
      </div>

    </div>
  );
}
