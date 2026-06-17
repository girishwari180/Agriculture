import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CropContext } from '../context/CropContext';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const { selectedCrop } = useContext(CropContext);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Summary Panel',
      path: '/dashboard',
      end: true,
      emoji: '📊',
      desc: 'Overall farm snapshot'
    },
    {
      name: 'Crop Advisory',
      path: '/dashboard/crops',
      end: false,
      emoji: '🌾',
      desc: 'Algorithm recommendations'
    },
    {
      name: 'Irrigation Planner',
      path: '/dashboard/irrigation',
      end: false,
      emoji: '💧',
      desc: 'Schedules and moisture'
    },
    {
      name: 'Fertility Optimizer',
      path: '/dashboard/fertilizer',
      end: false,
      emoji: '🧪',
      desc: 'N-P-K stage balances'
    },
    {
      name: 'User Settings',
      path: '/profile',
      end: false,
      emoji: '👤',
      desc: 'Profile & preferences'
    }
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 font-sans border-b lg:border-b-0 lg:border-r border-slate-150 dark:border-slate-750 bg-white dark:bg-slate-800/80 p-4 lg:p-6 block">
      {/* Current User Card */}
      {user && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-755 text-center lg:text-left">
          <p className="text-[10px] text-emerald-700 dark:text-emerald-450 uppercase font-semibold tracking-wider">
            Operator
          </p>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center justify-center lg:justify-start gap-1.5 mt-0.5">
            {user.name}
          </h4>
          <span className="inline-block mt-2 bg-emerald-100 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
            {user.role}
          </span>
        </div>
      )}

      {/* Selected Crop Mini Panel */}
      {selectedCrop && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-100/50 dark:border-emerald-950/40">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-700 dark:text-emerald-400">
              Active Focus
            </span>
            <span className="text-xs" role="img" aria-label="herb sprout">🌿</span>
          </div>
          <strong className="block text-sm text-slate-800 dark:text-slate-200">
            {selectedCrop.name}
          </strong>
          <div className="flex justify-between items-center mt-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Cycle: {selectedCrop.lifecycleDays} days</span>
            <span className="bg-emerald-100 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-450 px-1.5 py-0.3 rounded-md font-mono">
              {selectedCrop.season}
            </span>
          </div>
        </div>
      )}

      {/* Navigation list */}
      <nav className="space-y-1">
        <p className="hidden lg:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-2">
          Dashboard Controls
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            id={`sidebar-link-${item.path.split('/').pop() || 'overview'}`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl text-sm transition font-medium cursor-pointer ${
                isActive
                  ? 'bg-emerald-50 text-emerald-850 dark:bg-emerald-950/30 dark:text-emerald-300 border-l-4 border-emerald-600 pl-2'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/30 hover:text-slate-800 dark:hover:text-slate-250 border-l-4 border-transparent pl-3'
              }`
            }
          >
            <span className="text-base select-none">{item.emoji}</span>
            <div className="flex-1 leading-tight">
              <span className="block">{item.name}</span>
              <span className="block text-[10px] text-slate-400 font-normal group-hover:text-slate-505">
                {item.desc}
              </span>
            </div>
          </NavLink>
        ))}
      </nav>

      {/* College footer details */}
      <div className="mt-8 pt-6 border-t border-slate-150 dark:border-slate-750 text-center text-[10px] text-slate-400 dark:text-slate-500">
        <p className="font-bold uppercase tracking-wider">AgroIntel v1.0</p>
        <p className="mt-1">React College Capstone</p>
      </div>
    </aside>
  );
}
