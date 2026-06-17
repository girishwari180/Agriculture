import React, { useState, useContext, useEffect } from 'react';
import { CropContext } from '../context/CropContext';

export default function FertilityOptimizer() {
  const { selectedCrop, cropsList, updateFertilizer, advisorState } = useContext(CropContext);

  const stages = [
    'Germination',
    'Seedling',
    'Vegetative',
    'Flowering',
    'Fruiting',
    'Maturity'
  ];

  // Forms use state - Controlled Components
  const [form, setForm] = useState({
    cropId: selectedCrop?.id || cropsList[0].id,
    stage: 'Vegetative',
    nitrogen: '25',
    phosphorus: '15',
    potassium: '20'
  });

  const [errors, setErrors] = useState({});
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    if (selectedCrop) {
      setForm(prev => ({ ...prev, cropId: selectedCrop.id }));
    }
  }, [selectedCrop]);

  const validate = () => {
    const errs = {};
    const n = parseFloat(form.nitrogen);
    const p = parseFloat(form.phosphorus);
    const k = parseFloat(form.potassium);

    if (isNaN(n) || n < 0 || n > 150) {
      errs.nitrogen = 'Nitrogen level must be a positive integer (0 - 150 kg/Acre).';
    }
    if (isNaN(p) || p < 0 || p > 150) {
      errs.phosphorus = 'Phosphorus level must be a positive integer (0 - 150 kg/Acre).';
    }
    if (isNaN(k) || k < 0 || k > 150) {
      errs.potassium = 'Potassium level must be a positive integer (0 - 150 kg/Acre).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const result = updateFertilizer(form.cropId, form.stage, form.nitrogen, form.phosphorus, form.potassium);
      setOutcome(result);
    }
  };

  const currentCrop = cropsList.find(c => c.id === form.cropId) || selectedCrop;
  const targetNPK = currentCrop.fertilizerNPK[form.stage] || '20-20-20';

  return (
    <div className="space-y-6 font-sans">
      
      {/* Informative Header */}
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 border border-slate-205 dark:border-slate-705 rounded-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
          <span>NPK Fertility & Soil Optimizer</span>
          <span className="text-xl" role="img" aria-label="chemical glass lab">🧪</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Adjust physical Nitrogen (N), Phosphorus (P), and Potassium (K) level balances to receive stage-specific feed mix suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Parameters Controlled Form */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-705 p-6 md:p-8">
          <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-2">
            Soil Supplementation Form
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Specify your crop development cycle phase and current chemical assays to calibrate required chemical supplement tons.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Subject Crop select element */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Subject Focus Crop
              </label>
              <select
                id="fertilizer-crop-select"
                name="cropId"
                value={form.cropId}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
              >
                {cropsList.map(crop => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name} (Optimal Stage target ratio: {crop.fertilizerNPK['Vegetative']} NPK)
                  </option>
                ))}
              </select>
            </div>

            {/* Stage selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Development Stage Phase
              </label>
              <select
                id="fertilizer-stage-select"
                name="stage"
                value={form.stage}
                onChange={handleChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
              >
                {stages.map(st => (
                  <option key={st} value={st}>
                    {st} Phase (Target: {currentCrop.fertilizerNPK[st] || 'Balanced'} Ratio N-P-K)
                  </option>
                ))}
              </select>
            </div>

            {/* Joint N, P, K parameter forms using controlled component inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-650 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Nitrogen (N)
                </label>
                <input
                  id="fertilizer-n-input"
                  type="text"
                  name="nitrogen"
                  value={form.nitrogen}
                  onChange={handleChange}
                  placeholder="25"
                  className={`w-full bg-slate-50 dark:bg-slate-900 border text-center rounded-xl py-2 text-sm font-bold font-mono text-slate-800 dark:text-slate-100 ${
                    errors.nitrogen ? 'border-rose-450 bg-rose-50/10' : 'border-slate-205 dark:border-slate-705'
                  }`}
                />
                {errors.nitrogen && (
                  <p className="text-[10px] text-rose-500 font-semibold mt-1">{errors.nitrogen}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-650 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Phosphorus (P)
                </label>
                <input
                  id="fertilizer-p-input"
                  type="text"
                  name="phosphorus"
                  value={form.phosphorus}
                  onChange={handleChange}
                  placeholder="15"
                  className={`w-full bg-slate-50 dark:bg-slate-900 border text-center rounded-xl py-2 text-sm font-bold font-mono text-slate-800 dark:text-slate-100 ${
                    errors.phosphorus ? 'border-rose-450 bg-rose-50/10' : 'border-slate-205 dark:border-slate-705'
                  }`}
                />
                {errors.phosphorus && (
                  <p className="text-[10px] text-rose-500 font-semibold mt-1">{errors.phosphorus}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-650 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Potassium (K)
                </label>
                <input
                  id="fertilizer-k-input"
                  type="text"
                  name="potassium"
                  value={form.potassium}
                  onChange={handleChange}
                  placeholder="20"
                  className={`w-full bg-slate-50 dark:bg-slate-900 border text-center rounded-xl py-2 text-sm font-bold font-mono text-slate-800 dark:text-slate-100 ${
                    errors.potassium ? 'border-rose-450 bg-rose-50/10' : 'border-slate-205 dark:border-slate-705'
                  }`}
                />
                {errors.potassium && (
                  <p className="text-[10px] text-rose-500 font-semibold mt-1">{errors.potassium}</p>
                )}
              </div>
            </div>

            <button
              id="fertilizer-submit-btn"
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm cursor-pointer mt-4"
            >
              Analyze N-P-K Deficiencies
            </button>
          </form>
        </div>

        {/* Results output view */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Target Ratio Grid visualization */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-705 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 font-sans">
              Subject crop target level ratios ({currentCrop.name} - {form.stage} Stage)
            </h4>
            
            <div className="space-y-4">
              {/* Nitrogen Progress */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Nitrogen Ratio Target</span>
                  <span className="font-semibold font-mono">{targetNPK.split('-')[0]} Units Ideal vs {form.nitrogen} Actual</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (parseFloat(form.nitrogen) / parseFloat(targetNPK.split('-')[0] || 1)) * 100)}%` }}></div>
                </div>
              </div>

              {/* Phosphorus Progress */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Phosphorus Ratio Target</span>
                  <span className="font-semibold font-mono">{targetNPK.split('-')[1]} Units Ideal vs {form.phosphorus} Actual</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (parseFloat(form.phosphorus) / parseFloat(targetNPK.split('-')[1] || 1)) * 100)}%` }}></div>
                </div>
              </div>

              {/* Potassium Progress */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Potassium Ratio Target</span>
                  <span className="font-semibold font-mono">{targetNPK.split('-')[2]} Units Ideal vs {form.potassium} Actual</span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (parseFloat(form.potassium) / parseFloat(targetNPK.split('-')[2] || 1)) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Calibrated Recommendation display */}
          <div className="bg-emerald-50/30 dark:bg-emerald-950/10 rounded-3xl p-6 border border-emerald-100 dark:border-emerald-950 flex flex-col justify-between h-auto">
            <div>
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-450 uppercase tracking-widest block mb-1">
                Calibrated Prescription Formula
              </span>
              <p className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {outcome ? outcome.recommendation : (advisorState.fertilizerAdvice?.recommendation || 'Continuous Balanced Booster')}
              </p>
              
              <div className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/60 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-205">
                <span>Quantity:</span>
                <span className="text-emerald-700 dark:text-emerald-400">{outcome ? outcome.quantity : (advisorState.fertilizerAdvice?.quantity || '25 kg / Acre')}</span>
              </div>

              <div className="mt-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Diagnosis Analytics Reasoning</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "{outcome ? outcome.reason : (advisorState.fertilizerAdvice?.reason || 'Select stages to run complete automated diagnostics.')}"
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
