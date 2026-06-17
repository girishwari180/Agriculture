import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CropProvider } from './context/CropContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardOverview from './pages/DashboardOverview';
import CropAdvisoryPage from './pages/CropAdvisoryPage';
import IrrigationPlanner from './pages/IrrigationPlanner';
import FertilityOptimizer from './pages/FertilityOptimizer';
import CropDetails from './pages/CropDetails';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Public Layout Wrap
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-205 transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

// Protected Dashboard Layout Wrap
function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-205 transition-colors duration-200">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Persistent Advisory Sidebar Menu */}
        <Sidebar />

        {/* Dynamic Nested Route outputs */}
        <main className="flex-1 min-w-0 bg-transparent rounded-3xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CropProvider>
          <BrowserRouter>
            <Routes>
              
              {/* Public Routes Frame */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected Routes Dynamic Frame (Nested & Dynamic Roots) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                {/* Nested Routes specified in instructions */}
                <Route index element={<DashboardOverview />} />
                <Route path="crops" element={<CropAdvisoryPage />} />
                <Route path="irrigation" element={<IrrigationPlanner />} />
                <Route path="fertilizer" element={<FertilityOptimizer />} />
              </Route>

              {/* Dynamic route and extra protected pages */}
              <Route
                element={
                  <ProtectedRoute>
                    <PublicLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/crop/:cropId" element={<CropDetails />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Catch-all safety redirect layout */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </BrowserRouter>
        </CropProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
