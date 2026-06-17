import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CropContext } from '../context/CropContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout, isLoggedIn } = useContext(AuthContext);
  const { theme, setTheme } = useContext(CropContext);
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-emerald-800 text-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl" role="img" aria-label="sprout">🌱</span>
          <div>
            <span className="font-extrabold text-sm sm:text-lg tracking-wider block leading-none">
              AGROINTEL
            </span>
            <span className="text-[9px] text-emerald-300 font-bold uppercase tracking-widest block mt-0.5">
              Smart Advisor
            </span>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Light/Dark Toggle */}
          <button
            id="theme-toggler"
            onClick={handleToggleTheme}
            className="p-2 rounded-xl bg-emerald-700/50 hover:bg-emerald-700 text-white transition cursor-pointer"
            title="Toggle theme preference"
          >
            {theme === 'light' ? (
              <span className="block leading-none text-sm font-bold">🌙 Dark</span>
            ) : (
              <span className="block leading-none text-sm font-bold">☀️ Light</span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/profile"
                className="hidden sm:flex flex-col text-right leading-none cursor-pointer group"
              >
                <span className="font-bold text-xs group-hover:underline">
                  {user.name}
                </span>
                <span className="text-[9px] text-emerald-200 mt-0.5 font-medium uppercase tracking-widest">
                  {user.role}
                </span>
              </Link>
              
              {/* Profile Avatar Badge */}
              <Link
                to="/profile"
                id="navbar-profile-avatar"
                className="w-8 h-8 rounded-full bg-emerald-600/80 border border-emerald-400 flex items-center justify-center font-bold text-sm tracking-tight cursor-pointer hover:bg-emerald-700 uppercase"
              >
                {user.name.charAt(0)}
              </Link>

              {/* Logout */}
              <button
                id="navbar-logout-btn"
                onClick={handleLogoutClick}
                className="bg-emerald-900/60 hover:bg-rose-750 text-emerald-100 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                id="navbar-login-link"
                className="text-white hover:text-emerald-250 text-xs sm:text-sm font-semibold px-3 py-1.5 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                id="navbar-register-link"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
