import React, { useState, useContext, useEffect } from 'react';
import { CropContext } from '../context/CropContext';

export default function IrrigationPlanner() {
  const { selectedCrop, cropsList, updateIrrigation, advisorState } = useContext(CropContext);

  // Form states - Controlled components (useState)
  const [form, setForm] = useState({
    cropId: selectedCrop?.id || cropsList[0].id,
    soilMoisture: String(advisorState.soilMoisture || '40'),
    temperature: String(advisorState.temperature || '28'),
    rainfall: '0'
  });

  const [errors, setErrors] = useState({});
  const [outcome, setOutcome] = useState(null);

  // On mount, prefill based on selectedCrop if available
  useEffect(() => {
    if (selectedCrop) {
      setForm(prev => ({
        ...prev,
        cropId: selectedCrop.id
      }));
    }
  }, [selectedCrop]);

  const validate = () => {
    const errs = {};
    const moistureVal = parseFloat(form.soilMoisture);
    const tempVal = parseFloat(form.temperature);
    const rainVal = parseFloat(form.rainfall);

    if (isNaN(moistureVal) || moistureVal < 0 || moistureVal > 100) {
      errs.soilMoisture = 'Soil moisture must be an integer percentage from 0 to 100.';
    }
    if (isNaN(tempVal) || tempVal < -10 || tempVal > 60) {
      errs.temperature = 'Temperature must be between -10°C and 60°C.';
    }
    if (isNaN(rainVal) || rainVal < 0 || rainVal > 1000) {
      errs.rainfall = 'Rainfall parameter needs to be a positive number up to 1000 mm.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const result = updateIrrigation(form.cropId, form.soilMoisture, form.temperature, form.rainfall);
      setOutcome(result);
    }
  };

  const currentActiveCrop = cropsList.find(c => c.id === form.cropId) || selectedCrop;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Informative Header */}
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 border border-slate-200 dark:border-slate-705 rounded-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
          <span>Smart Irrigation Advisory Planner</span>
          <span className="text-xl" role="img" aria-label="water droplet spark">💧</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Simulate soil drying states or thermal stresses. Recalculate volumetric liters per acre to program custom irrigation flows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controlled Form parameters */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-705 p-6 md:p-8">
          <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-2">
            Volumetric Irrigation Form
          </h3>
          <p className="text-xs text-slate-505 dark:text-slate-400 mb-6 leading-relaxed">
            Fill out active humidity gauges, rainfall index, and species to compute optimized advice.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Crop selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-605 dark:text-slate-300 uppercase tracking-wider mb-2">
                Subject Crop
              </label>
              <select
                id="irrigation-crop-select"
                name="cropId"
                value={form.cropId}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
              >
                {cropsList.map(crop => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} ({crop.season} - Default Req: {crop.waterRequirement})
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Moisture */}
            <div>
              <label className="block text-xs font-semibold text-slate-605 dark:text-slate-300 uppercase tracking-wider mb-2">
                Soil Moisture Level (%)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  id="irrigation-moisture-slider"
                  type="range"
                  name="soilMoisture"
                  min="0"
                  max="100"
                  value={form.soilMoisture}
                  onChange={handleChange}
                  className="flex-1 h-2 bg-slate-200 dark:bg-slate-700/50 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <input
                  id="irrigation-moisture-input"
                  type="text"
                  name="soilMoisture"
                  value={form.soilMoisture}
                  onChange={handleChange}
                  placeholder="40"
                  className={`w-16 bg-slate-50 dark:bg-slate-900 border text-center rounded-lg py-1 text-sm font-bold font-mono text-slate-800 dark:text-slate-100 ${
                    errors.soilMoisture ? 'border-rose-450 bg-rose-50/10 text-rose-600' : 'border-slate-200 dark:border-slate-705'
                  }`}
                />
              </div>
              {errors.soilMoisture && (
                <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.soilMoisture}</p>
              )}
            </div>

            {/* Joint Temperature and Rainfall Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-605 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Temperature (°C)
                </label>
                <input
                  id="irrigation-temp-input"
                  type="text"
                  name="temperature"
                  value={form.temperature}
                  onChange={handleChange}
                  placeholder="e.g. 28"
                  className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                    errors.temperature ? 'border-rose-455 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
                  }`}
                />
                {errors.temperature && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.temperature}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-605 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Rainfall (24h - mm)
                </label>
                <input
                  id="irrigation-rain-input"
                  type="text"
                  name="rainfall"
                  value={form.rainfall}
                  onChange={handleChange}
                  placeholder="e.g. 0"
                  className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                    errors.rainfall ? 'border-rose-455 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
                  }`}
                />
                {errors.rainfall && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1">{errors.rainfall}</p>
                )}
              </div>
            </div>

            <button
              id="irrigation-submit-btn"
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm cursor-pointer mt-4"
            >
              Recalculate Water Volume Advice
            </button>
          </form>
        </div>

        {/* Results output view */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Output Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                  Dynamic Volumetric Calculations
                </span>
                <span className="text-2xl" id="irrigation-advice-nature-indicator">
                  {parseFloat(form.soilMoisture) < 30 ? '⚠️ Dry' : '💧 Balanced'}
                </span>
              </div>

              {/* Volume display */}
              <div className="flex flex-col items-center justify-center space-y-6 py-6 border-b border-white/10">
                <div className="w-40 h-40 rounded-full border-8 border-emerald-950 flex items-center justify-center relative shadow-inner">
                  <div className="w-32 h-32 rounded-full border-4 border-emerald-500/20 flex flex-col items-center justify-center bg-emerald-950/20">
                    <span className="text-3xl font-black font-mono tracking-tighter text-emerald-350">
                      {outcome ? outcome.waterAmount.split(' ')[0] : (advisorState.irrigationAdvice?.waterAmount.split(' ')[0] || '15,000')}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Liters / Acre</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Calculated Sowing Frequency</p>
                  <p className="text-lg font-bold text-emerald-400 mt-1">
                    {outcome ? outcome.frequency : (advisorState.irrigationAdvice?.frequency || 'Every 5-7 Days')}
                  </p>
                </div>
              </div>

              {/* Detailed advisory text */}
              <div className="mt-6">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  System Advisory Message
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold italic bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl">
                  "{outcome ? outcome.message : (advisorState.irrigationAdvice?.message || 'Apply moisture parameters to update message.')}"
                </p>
              </div>
            </div>

            <div className="mt-6 text-[10px] text-slate-400 text-center border-t border-white/5 pt-4">
              Agri-station parameters synchronized dynamically to global state.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
