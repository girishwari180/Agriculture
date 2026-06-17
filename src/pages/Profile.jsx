import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CropContext } from '../context/CropContext';

export default function Profile() {
  const { user, register } = useContext(AuthContext);
  const { theme, setTheme, selectedCrop, setSelectedCrop, cropsList } = useContext(CropContext);

  // Edit State parameters - Controlled Form uses state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Dr. Hari Prasad',
    role: user?.role || 'Farmer',
    email: user?.email || 'farmer@agrointel.com'
  });

  const [notification, setNotification] = useState('');

  const handleToggleTheme = () => {
    const updated = theme === 'light' ? 'dark' : 'light';
    setTheme(updated);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) return;

    // Simulate updating user record in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('agrointel_registered_users') || '[]');
    const updatedUsers = savedUsers.map(u => {
      if (u.email.toLowerCase() === profileForm.email.toLowerCase()) {
        return {
          ...u,
          name: profileForm.name,
          role: profileForm.role
        };
      }
      return u;
    });

    localStorage.setItem('agrointel_registered_users', JSON.stringify(updatedUsers));
    
    // Update active logged-in user context
    const updatedCurrentUser = {
      ...user,
      name: profileForm.name,
      role: profileForm.role
    };
    localStorage.setItem('agrointel_user', JSON.stringify(updatedCurrentUser));
    
    // Quick reload warning alert or context update
    setNotification('Operator profile parameters updated securely inside localStorage!');
    setTimeout(() => {
      setNotification('');
      window.location.reload(); // Simple force reload to feed Navbar brand name edits
    }, 1500);
  };

  const handleSelectCropFocus = (e) => {
    const crop = cropsList.find(c => c.id === e.target.value);
    if (crop) {
      setSelectedCrop(crop);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Informative Header */}
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 border border-slate-200 dark:border-slate-705 rounded-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 uppercase tracking-tight flex items-center gap-2">
          <span>Farmer Profile Settings</span>
          <span className="text-xl" role="img" aria-label="profile user badge font-awesome">👤</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile parameters Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-705 shadow-sm">
          <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 mb-1">
            Update Operator Credentials
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            
          </p>

          {notification && (
            <div id="profile-notify-banner" className="bg-emerald-50 border border-emerald-250 text-emerald-805 text-xs font-semibold rounded-xl p-3.5 mb-5 text-center dark:bg-emerald-950/20 dark:border-emerald-800">
              {notification}
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-650 dark:text-slate-300 uppercase tracking-wider mb-2">
                Registered Email Address (Permanent ID)
              </label>
              <input
                id="profile-email-input"
                type="text"
                name="email"
                disabled
                value={profileForm.email}
                className="w-full bg-slate-100 dark:bg-slate-900 cursor-not-allowed border border-slate-205 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-650 dark:text-slate-300 uppercase tracking-wider mb-2">
                Full Member Name
              </label>
              <input
                id="profile-name-input"
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleTextChange}
                placeholder="Name"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-650 dark:text-slate-300 uppercase tracking-wider mb-2">
                Professional Level Role
              </label>
              <select
                id="profile-role-select"
                name="role"
                value={profileForm.role}
                onChange={handleTextChange}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-705 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent cursor-pointer"
              >
                <option value="Farmer">Landowner / Independent Farmer</option>
                <option value="Agronomist">Expert Agronomist Advisor</option>
                <option value="Student">Academic Scholar / Student</option>
              </select>
            </div>

            <button
              id="profile-save-btn"
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition cursor-pointer"
            >
              Commit secure changes
            </button>
          </form>
        </div>

        {/* Global Local Storage variables viewer */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-705 shadow-sm">
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 mb-4">
              Browser-Stored Preferences
            </h3>

            <div className="space-y-4 text-xs">
              {/* Theme Preference */}
              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-105 dark:border-slate-755">
                <div>
                  <strong className="block text-slate-700 dark:text-slate-200 font-bold mb-0.5">Application Theme</strong>
                  <span className="text-[10px] text-slate-450">Currently saved as: {theme.toUpperCase()} mode</span>
                </div>
                <button
                  id="profile-theme-toggle"
                  onClick={handleToggleTheme}
                  className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition hover:bg-slate-900 cursor-pointer"
                >
                  Change Theme
                </button>
              </div>

              {/* Saved Active Crop focus */}
              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-105 dark:border-slate-755">
                <div className="flex-1 mr-2">
                  <strong className="block text-slate-700 dark:text-slate-200 font-bold mb-0.5 animate-pulse">Saved Crop Focus</strong>
                  <span className="text-[10px] text-slate-450">Saved crop: {selectedCrop?.name || 'Wheat'}</span>
                </div>
                <select
                  id="profile-focus-crop-select"
                  value={selectedCrop?.id}
                  onChange={handleSelectCropFocus}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-1 px-2 text-[11px] font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                >
                  {cropsList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        
        </div>

      </div>

    </div>
  );
}
