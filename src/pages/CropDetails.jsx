import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CropContext } from '../context/CropContext';

export default function CropDetails() {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const { cropsList, setSelectedCrop, advisorState, updateHarvest, updateYield } = useContext(CropContext);

  // Find exact crop
  const crop = cropsList.find(c => c.id === cropId);

  // If crop is not found, fallback safely with a nice message or redirect
  if (!crop) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 text-center font-sans">
        <span className="text-4xl text-rose-500" role="img" aria-label="error sign">⚠️</span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2">Crop Record Not Found</h3>
        <p className="text-sm text-slate-500 mt-1">We couldn't locate any crop matching ID: "{cropId}" in our standard database.</p>
        <Link to="/dashboard/crops" className="mt-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold">
          Back to list
        </Link>
      </div>
    );
  }

  // Harvest Prediction Form states (Controlled components - useState)
  const [sowingDate, setSowingDate] = useState(advisorState.harvestPrediction?.sowingDate || '2026-06-17');
  const [harvestResult, setHarvestResult] = useState(null);
  const [harvestError, setHarvestError] = useState('');

  // Yield Prediction Form states (Controlled components - useState)
  const [landArea, setLandArea] = useState(String(advisorState.yieldPrediction?.landArea || '2.5'));
  const [yieldResult, setYieldResult] = useState(null);
  const [yieldError, setYieldError] = useState('');

  // Initial local calculations
  useEffect(() => {
    // Initial run
    calculateHarvest(sowingDate);
    calculateYieldValue(landArea);
  }, [cropId]);

  const calculateHarvest = (dateStr) => {
    if (!dateStr) {
      setHarvestError('Please enter a valid sowing date.');
      return;
    }
    setHarvestError('');
    const out = updateHarvest(crop.id, dateStr);
    setHarvestResult(out);
  };

  const calculateYieldValue = (areaStr) => {
    const areaVal = parseFloat(areaStr);
    if (isNaN(areaVal) || areaVal <= 0 || areaVal > 1000) {
      setYieldError('Land area must be a positive decimal number up to 1000.');
      return;
    }
    setYieldError('');
    const out = updateYield(crop.id, areaStr);
    setYieldResult(out);
  };

  const handleSowingChange = (e) => {
    setSowingDate(e.target.value);
    setHarvestError('');
  };

  const handleSowingSubmit = (e) => {
    e.preventDefault();
    calculateHarvest(sowingDate);
  };

  const handleAreaChange = (e) => {
    setLandArea(e.target.value);
    setYieldError('');
  };

  const handleAreaSubmit = (e) => {
    e.preventDefault();
    calculateYieldValue(landArea);
  };

  const handleSetGlobalFocus = () => {
    setSelectedCrop(crop);
    // Visual alert feedback
  };

  // Crop growth stages list for representation
  const lifecycleStages = [
    { title: 'Germination', days: 'Day 1 - 7', emoji: '🌱', desc: 'Sown seed absorbs water, breaks coat and pushes small roots downward.' },
    { title: 'Seedling', days: 'Day 8 - 21', emoji: '🌿', desc: 'First leaves expand triggering early photosynthesis capture.' },
    { title: 'Vegetative', days: 'Day 22 - 60', emoji: '🍀', desc: 'Enormous physical branch elongation, stems thickening, nitrogen hungry.' },
    { title: 'Flowering', days: 'Day 61 - 85', emoji: '🌸', desc: 'Pollination organs mature. Critical phosphorus levels protect petal retention.' },
    { title: 'Fruiting', days: 'Day 86 - 105', emoji: '🍓', desc: 'Pods or ears swell with dense sugars. Dynamic moisture levels must stay steady.' },
    { title: 'Maturity', days: 'Day 106 - 118', emoji: '🌾', desc: 'Colors change, green chlorophyll declines as plant completes cycle.' },
    { title: 'Harvest', days: `Day ${crop.lifecycleDays}+`, emoji: '🚜', desc: 'Optimal moisture content achieved. Ready for mechanized collection!' }
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Return Link & Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-705 shadow-sm">
        <div>
          <Link to="/dashboard/crops" className="text-xs text-emerald-600 dark:text-emerald-450 hover:underline font-bold mb-1.5 inline-block">
            ← Back to Crops Roster
          </Link>
          <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-3">
            <span>{crop.name} Details</span>
            <span className="bg-emerald-100 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-350 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
              {crop.season} Crop
            </span>
          </h2>
        </div>

        <button
          id="crop-details-set-focus-btn"
          onClick={handleSetGlobalFocus}
          className="bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-xs px-5 py-3 rounded-xl transition cursor-pointer"
        >
          Set {crop.name} as Main Focus
        </button>
      </div>

      {/* Basic Metrics Specifications Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* About Spec */}
        <div className="md:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-705 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Crop Profile Synopsis</h3>
            <p className="text-sm text-slate-705 dark:text-slate-300 leading-relaxed font-sans">{crop.description}</p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-750 text-xs text-slate-400">
            Source: College Agronomy Textbook Data
          </div>
        </div>

        {/* Requirements matrix grid */}
        <div className="md:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-705 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Baseline Physical Requirements</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-755">
              <span className="block text-[10px] uppercase text-emerald-700 dark:text-emerald-400 font-bold mb-1">Optimal Soil</span>
              <strong className="text-lg text-slate-800 dark:text-slate-150 font-extrabold block">{crop.soilType}</strong>
              <span className="text-[10px] text-slate-500">Texture requirement</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-755">
              <span className="block text-[10px] uppercase text-emerald-700 dark:text-emerald-400 font-bold mb-1">pH Tolerances</span>
              <strong className="text-lg text-slate-800 dark:text-slate-150 font-extrabold block">{crop.phiMin} – {crop.phiMax}</strong>
              <span className="text-[10px] text-slate-500">Acidity coefficient</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-755">
              <span className="block text-[10px] uppercase text-emerald-700 dark:text-emerald-400 font-bold mb-1">Water Demand</span>
              <strong className="text-sm font-bold text-slate-800 dark:text-slate-150 truncate block mt-1">{crop.waterRequirement}</strong>
              <span className="text-[10px] text-slate-500">Over complete cycle</span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-755">
              <span className="block text-[10px] uppercase text-emerald-700 dark:text-emerald-400 font-bold mb-1">Days to harvest</span>
              <strong className="text-lg text-slate-800 dark:text-slate-150 font-extrabold block">{crop.lifecycleDays} Days</strong>
              <span className="text-[10px] text-slate-500">Full lifecycle span</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100 dark:border-emerald-950 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            🌱 Stage-Specific NPK Ratios: <code className="bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono text-emerald-805 dark:text-emerald-355">Germ: {crop.fertilizerNPK.Germination}</code> | <code className="bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono text-emerald-805 dark:text-emerald-355">Veg: {crop.fertilizerNPK.Vegetative}</code> | <code className="bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono text-emerald-805 dark:text-emerald-355">Flowering: {crop.fertilizerNPK.Flowering}</code>
          </div>
        </div>

      </div>

      {/* Dual Row: Predictor forms (Controlled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Harvest Predictor */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-705 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Harvest Predictor Form</span>
            
            <form onSubmit={handleSowingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 uppercase tracking-wider mb-2">
                  Select Sowing Date
                </label>
                <input
                  id="details-sowing-date-input"
                  type="date"
                  value={sowingDate}
                  onChange={handleSowingChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-202 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-tight focus:outline focus:outline-emerald-600 focus:border-transparent cursor-pointer dark:text-slate-100"
                />
                {harvestError && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1">{harvestError}</p>
                )}
              </div>
              <button
                id="details-harvest-calc-btn"
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Compute Harvest Target
              </button>
            </form>

            {harvestResult && (
              <div className="mt-6 bg-emerald-50/20 dark:bg-emerald-950/15 border border-emerald-105 dark:border-emerald-950 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Predicted Harvest Date:</span>
                  <strong className="text-emerald-800 dark:text-emerald-400 font-mono font-bold text-sm">
                    {harvestResult.harvestDate}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Countdown days left:</span>
                  <strong className="text-emerald-800 dark:text-emerald-400 font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow-sm border border-emerald-50/50">
                    {harvestResult.remainingDays} Days remaining
                  </strong>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-[10px] text-slate-400 mt-6 border-t border-slate-100 dark:border-slate-750 pt-3">
            Lifecycle constant variable: {crop.lifecycleDays} days.
          </div>
        </div>

        {/* Yield & Revenue Predictor */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-705 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Yield Prediction Form</span>
            
            <form onSubmit={handleAreaSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-350 uppercase tracking-wider mb-2">
                  Total Cultivable Land Area (in Acres)
                </label>
                <input
                  id="details-land-area-input"
                  type="text"
                  value={landArea}
                  onChange={handleAreaChange}
                  placeholder="e.g. 5.0"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-202 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm font-semibold tracking-tight focus:outline focus:outline-emerald-600 focus:border-transparent dark:text-slate-100"
                />
                {yieldError && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1">{yieldError}</p>
                )}
              </div>
              <button
                id="details-yield-calc-btn"
                type="submit"
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Compute Expected Output
              </button>
            </form>

            {yieldResult && (
              <div className="mt-6 bg-blue-50/20 dark:bg-slate-900 border border-blue-100 dark:border-slate-755 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Estimated Crop Tonnage:</span>
                  <strong className="text-blue-805 dark:text-blue-400 font-mono font-bold text-sm">
                    {yieldResult.estimatedYield} Tons of crop
                  </strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Potential Market Valuation:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow-sm border border-emerald-50/50">
                    ${yieldResult.estimatedRevenue?.toLocaleString()} USD
                  </strong>
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-400 mt-6 border-t border-slate-100 dark:border-slate-750 pt-3">
            Multiplier baseline: {crop.baseYieldPerHectare} Tons/Hectare (Estimated: ${crop.basePricePerTon}/Ton)
          </div>
        </div>

      </div>

      {/* Visual Crop Lifecycle Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-705 shadow-sm">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-100 dark:border-slate-750">
          <div>
            <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100">Smart Crop Lifecycle Progress Map</h3>
            <p className="text-xs text-slate-450 mt-0.5">Physical growth benchmarks for optimal health mapping.</p>
          </div>
          <span className="text-xl" role="img" aria-label="clock hourglass">⌛</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
          {lifecycleStages.map((st, i) => (
            <div
              key={st.title}
              className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-755 flex flex-col justify-between relative shadow-xs"
            >
              <div>
                <span className="text-2xl inline-block mb-2 select-none">{st.emoji}</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-150 text-xs">{st.title}</h4>
                <span className="text-[10px] text-slate-450 block font-mono mt-0.5">{st.days}</span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {st.desc}
                </p>
              </div>
              <div className="mt-4 text-[9px] font-extrabold uppercase tracking-wide text-emerald-755 dark:text-emerald-450">
                Stage 0{i+1}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
