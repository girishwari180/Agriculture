import React, { useRef, useState, useContext } from 'react';
import { CropContext } from '../context/CropContext';
import { useNavigate } from 'react-router-dom';

export default function CropSearch() {
  const searchInputRef = useRef(null);
  const { cropsList, setSelectedCrop } = useContext(CropContext);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchInputRef.current?.value?.trim().toLowerCase();
    if (!query) {
      setResults([]);
      return;
    }
    const filtered = cropsList.filter(crop =>
      crop.name.toLowerCase().includes(query) ||
      crop.season.toLowerCase().includes(query) ||
      crop.soilType.toLowerCase().includes(query)
    );
    setResults(filtered);
  };

  const handleSelectCrop = (crop) => {
    setSelectedCrop(crop);
    // Redirect to direct agricultural stats if requested, or updates local context
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 border border-slate-100 dark:border-slate-700/60 font-sans">
      <h3 className="text-base font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
        Uncontrolled Crop Search
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Reads the direct input element from the DOM with a React <code className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 px-1 py-0.5 rounded text-[11px] font-mono">useRef</code> reference for lightning-fast search indexing.
      </p>
      
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          id="crop-search-input"
          type="text"
          ref={searchInputRef}
          placeholder="Search crop name, season or soil..."
          className="flex-1 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-650 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-150 placeholder-slate-400 dark:placeholder-slate-500 focus:outline bg-none focus:outline-emerald-600 focus:border-transparent transition"
        />
        <button
          id="crop-search-submit"
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition cursor-pointer shrink-0"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1 mt-4">
          <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">Results ({results.length}):</p>
          {results.map(crop => (
            <div
              key={crop.id}
              onClick={() => handleSelectCrop(crop)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/50 dark:bg-slate-900/30 dark:hover:bg-emerald-950/20 border border-slate-100 dark:border-slate-700/40 cursor-pointer transition group"
            >
              <div>
                <span className="font-semibold text-sm text-slate-700 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                  {crop.name}
                </span>
                <span className="ml-2 bg-emerald-150 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  {crop.season}
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {crop.soilType}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
