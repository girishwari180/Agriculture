import React from 'react';

export default function WeatherView({
  locations,
  selectedLocation,
  weatherData,
  onLocationChange,
  agriAdvices
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-705 p-6 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Weather Advisory Intelligence</span>
            <span className="text-xl" role="img" aria-label="thunder cloud">⚡</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Current climatic parameters loaded from local JSON station database.
          </p>
        </div>

        {/* Location Selector */}
        <div className="w-full sm:w-auto">
          <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
            Select Weather Station
          </label>
          <select
            id="weather-source-select"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of conditions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Temp Card */}
        <div className="bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-755 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase text-emerald-700 dark:text-emerald-450 font-extrabold tracking-wider">
              Temperature
            </span>
            <span className="text-lg" role="img" aria-label="thermometer">🌡️</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight leading-none">
            {weatherData.temperature}°C
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Status: {weatherData.tempStatus}
          </p>
        </div>

        {/* Humidity Card */}
        <div className="bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-755 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase text-emerald-700 dark:text-emerald-450 font-extrabold tracking-wider">
              Relative Humidity
            </span>
            <span className="text-lg" role="img" aria-label="droplet">💧</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight leading-none">
            {weatherData.humidity}%
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Evaporation rate: {weatherData.evapRate}
          </p>
        </div>

        {/* Rain Forecast */}
        <div className="bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-755 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase text-emerald-700 dark:text-emerald-450 font-extrabold tracking-wider">
              Precipitation (24h)
            </span>
            <span className="text-lg" role="img" aria-label="umbrella icon redirect">☔</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight leading-none">
            {weatherData.precipitation} mm
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Forecast: {weatherData.forecast}
          </p>
        </div>

        {/* Wind Speed */}
        <div className="bg-slate-50 dark:bg-slate-900/45 border border-slate-100 dark:border-slate-755 rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase text-emerald-700 dark:text-emerald-450 font-extrabold tracking-wider">
              Wind Velocity
            </span>
            <span className="text-lg" role="img" aria-label="wind">🌬️</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-mono tracking-tight leading-none">
            {weatherData.windSpeed} km/h
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Direction: {weatherData.windDirection}
          </p>
        </div>
      </div>

      {/* Agri advisory block */}
      <div className="border border-emerald-100 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-2xl p-5">
        <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-450 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <span className="text-base" role="img" aria-label="microscope chart tool">🔬</span> CLIMATIC SPRAYING & MANAGEMENT LOGS
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-emerald-100/50 dark:border-slate-700">
            <strong className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Pesticide Spraying</strong>
            <span className={`inline-block font-bold text-xs px-2 py-0.5 rounded-full ${agriAdvices.pesticideClass}`}>
              {agriAdvices.pesticideSpray}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">
              {agriAdvices.pesticideDesc}
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-emerald-100/50 dark:border-slate-700">
            <strong className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Dehydration Danger</strong>
            <span className={`inline-block font-bold text-xs px-2 py-0.5 rounded-full ${agriAdvices.dehydClass}`}>
              {agriAdvices.dehydration}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">
              {agriAdvices.dehydDesc}
            </p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-emerald-100/50 dark:border-slate-700">
            <strong className="block text-[10px] text-slate-400 uppercase font-bold mb-1">Workforce Safety</strong>
            <span className={`inline-block font-bold text-xs px-2 py-0.5 rounded-full ${agriAdvices.workforceClass}`}>
              {agriAdvices.workforce}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-tight">
              {agriAdvices.workforceDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
