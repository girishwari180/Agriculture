import React from 'react';
import CropRecommendationContainer from '../components/CropRecommendationContainer';
import CropSearch from '../components/CropSearch';

export default function CropAdvisoryPage() {
  return (
    <div className="space-y-6 font-sans">
      
      {/* Informative Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-slate-800 p-6 md:p-8 border border-slate-200 dark:border-slate-705 rounded-3xl">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
            <span>Crop Diagnostics & Search</span>
            <span className="text-xl" role="img" aria-label="sheaf of wheat sprout">🌾</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare optimal temperatures, pH tolerance, and expected life cycles. Use filters or full search indexes.
          </p>
        </div>
      </div>

      {/* Row: Search bar & info note */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          {/* Uncontrolled input Search element */}
          <CropSearch />
        </div>
        <div className="md:col-span-4 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest block mb-2">Agricultural Tip</span>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
              Soil pH levels heavily regulate nutrient solubility. A pH below 5.5 locks phosphorus away from plant roots, while higher alkalinity (&gt;8.0) hampers iron intake. Always balance agricultural soil with proper additives before sowing.
            </p>
          </div>
          <p className="text-[10px] text-emerald-400 font-mono mt-4">Offline Diagnostics System Loaded</p>
        </div>
      </div>

      {/* Core Container/Presenter Component: CropRecommendationContainer */}
      <div>
        <div className="flex justify-between items-center mb-4 pl-1">
          <h3 className="text-base font-bold text-slate-805 dark:text-slate-205 uppercase tracking-wider">
            Controlled Metric Form & Recommendations
          </h3>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono dark:bg-slate-900 dark:text-slate-400">
            Container-Presenter Pattern
          </span>
        </div>
        
        <CropRecommendationContainer />
      </div>

    </div>
  );
}
