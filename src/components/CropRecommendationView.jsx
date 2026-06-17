import React from 'react';

export default function CropRecommendationView({
  formData,
  errors,
  onChange,
  onSubmit,
  results,
  onSelectCrop,
  currentlySelectedId
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-705 p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-2">
          Crop Advisory Parameters
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Input your specific farm profile parameters to query the agro-intelligence system logic.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Season Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              Sowing Season
            </label>
            <select
              id="recommend-season-select"
              name="season"
              value={formData.season}
              onChange={onChange}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
            >
              <option value="Kharif">Kharif (Monsoon Cycle - June to October)</option>
              <option value="Rabi">Rabi (Winter Cycle - November to April)</option>
              <option value="Zaid">Zaid (Summer Cycle - March to June)</option>
            </select>
          </div>

          {/* Soil Type Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              Soil Texture
            </label>
            <select
              id="recommend-soil-select"
              name="soilType"
              value={formData.soilType}
              onChange={onChange}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
            >
              <option value="Loamy">Loamy (Optimal drainage)</option>
              <option value="Clayey">Clayey (High moisture storage)</option>
              <option value="Black">Black Soil (Highly organic trap)</option>
              <option value="Sandy">Sandy (High infiltration, dry)</option>
              <option value="Sandy Loam">Sandy Loam (Porous crop bed)</option>
              <option value="Alluvial">Alluvial (Mineral rich river plain)</option>
            </select>
          </div>

          {/* Joint Row for pH & Temperature */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Soil pH level
              </label>
              <input
                id="recommend-ph-input"
                type="text"
                name="ph"
                value={formData.ph}
                onChange={onChange}
                placeholder="0.0 - 14.0"
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                  errors.ph ? 'border-rose-350 bg-rose-50/20' : 'border-slate-200 dark:border-slate-705'
                }`}
              />
              {errors.ph && (
                <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.ph}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
                Temperature (°C)
              </label>
              <input
                id="recommend-temp-input"
                type="text"
                name="temp"
                value={formData.temp}
                onChange={onChange}
                placeholder="e.g. 25"
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                  errors.temp ? 'border-rose-350 bg-rose-50/20' : 'border-slate-200 dark:border-slate-705'
                }`}
              />
              {errors.temp && (
                <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.temp}</p>
              )}
            </div>
          </div>

          {/* Rainfall Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-2">
              Annual Average Rainfall (mm)
            </label>
            <input
              id="recommend-rain-input"
              type="text"
              name="rain"
              value={formData.rain}
              onChange={onChange}
              placeholder="e.g. 600"
              className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                errors.rain ? 'border-rose-350 bg-rose-50/20' : 'border-slate-200 dark:border-slate-705'
              }`}
            />
            {errors.rain && (
              <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.rain}</p>
            )}
          </div>

          <button
            id="recommend-submit-btn"
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-5 rounded-xl font-semibold text-sm transition shadow-sm hover:shadow-emerald-250 cursor-pointer text-center mt-2"
          >
            Query Diagnostic Advisor
          </button>
        </form>
      </div>

      {/* Yield Advisory Output */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-705 p-6 md:p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Recommended Crops
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sorted descending by AgroIntel algorithmic suitability score base.
              </p>
            </div>
            <span className="text-2xl" role="img" aria-label="sheaf of rice">🌾</span>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1 max-h-[360px] pr-1">
            {results.map((crop) => {
              const matchesSelected = currentlySelectedId === crop.id;
              const score = crop.suitabilityScore;
              let scoreColor = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
              let progressColor = 'bg-rose-500';

              if (score >= 80) {
                scoreColor = 'bg-emerald-100 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-300';
                progressColor = 'bg-emerald-600';
              } else if (score >= 50) {
                scoreColor = 'bg-amber-100 text-amber-850 dark:bg-amber-950 dark:text-amber-300';
                progressColor = 'bg-amber-500';
              }

              return (
                <div
                  key={crop.id}
                  id={`crop-recommend-${crop.id}`}
                  className={`p-4 rounded-2xl border transition ${
                    matchesSelected
                      ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-100 dark:border-slate-705 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base flex items-center gap-2">
                        {crop.name}
                        {matchesSelected && (
                          <span className="bg-emerald-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded">
                            Active Crop
                          </span>
                        )}
                      </h4>
                      <div className="flex gap-2 mt-1">
                        <span className="bg-slate-150 text-slate-705 dark:bg-slate-900 dark:text-slate-350 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          Season: {crop.season}
                        </span>
                        <span className="bg-slate-150 text-slate-755 dark:bg-slate-900 dark:text-slate-355 text-[10px] font-medium px-2 py-0.5 rounded-md">
                          Soil: {crop.soilType}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block font-mono font-bold text-xs px-2.5 py-1 rounded-lg ${scoreColor}`}>
                        Suitability: {score}%
                      </span>
                    </div>
                  </div>

                  {/* Suitability indicator bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden mb-3">
                    <div className={`h-full ${progressColor}`} style={{ width: `${score}%` }}></div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 pt-1 border-t border-slate-100 dark:border-slate-750">
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-semibold">Lifecycle duration</span>
                      <strong className="text-slate-700 dark:text-slate-200">{crop.lifecycleDays} Days</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-semibold">Water intake</span>
                      <strong className="text-slate-700 dark:text-slate-200">{crop.waterRequirement}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-semibold">Ideal pH band</span>
                      <strong className="text-slate-700 dark:text-slate-200">{crop.phiMin} - {crop.phiMax}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400 font-semibold">Base Price estimate</span>
                      <strong className="text-slate-700 dark:text-slate-200">${crop.basePricePerTon}/ton</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {crop.description}
                  </p>

                  <div className="flex justify-between items-center text-xs">
                    <a
                      href={`/crop/${crop.id}`}
                      className="text-emerald-600 dark:text-emerald-450 hover:underline font-semibold"
                    >
                      View lifecycle, yield, & details →
                    </a>
                    {!matchesSelected ? (
                      <button
                        onClick={() => onSelectCrop(crop)}
                        className="text-white bg-emerald-650 hover:bg-emerald-700 font-medium px-3.5 py-1.5 rounded-lg transition text-xs cursor-pointer"
                      >
                        Set as Active
                      </button>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        ✓ Currently Selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
