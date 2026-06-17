import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: 'farmer@agrointel.com', // prefill for easy evaluation
    password: 'password123'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // Auto redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    const errs = {};
    if (!formData.email) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email structure (e.g., mail@domain.com).';
    }

    if (!formData.password) {
      errs.password = 'Authentication password is required.';
    } else if (formData.password.length < 5) {
      errs.password = 'Password must be at least 5 characters.';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear validation errors for field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const result = login(formData.email, formData.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setAuthError(result.error);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-md p-8 border border-slate-100 dark:border-slate-705">
        
        {/* Brand visual header */}
        <div className="text-center mb-6">
          <span className="text-4xl inline-block" role="img" aria-label="lock key">🔐</span>
          <h2 className="text-2xl font-bold font-sans tracking-tight text-emerald-800 dark:text-emerald-405 mt-2">
            Secure Farm Sign-In
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Access your custom irrigation calculations & fertilizer advisors
          </p>
        </div>

        {authError && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 mb-4 text-xs font-semibold text-rose-600 dark:bg-rose-950/20 dark:border-rose-900 text-center">
            {authError}
          </div>
        )}

        {/* Demo Help Note */}
        <div className="bg-emerald-50/50 dark:bg-slate-900 border border-emerald-100/50 dark:border-slate-705 rounded-xl p-3 mb-5 text-[11px] text-emerald-800 dark:text-emerald-400">
          <p className="font-bold">Evaluation Account Details:</p>
          <p className="mt-0.5 font-mono">User: farmer@agrointel.com</p>
          <p className="font-mono">Pass: password123</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email input */}
          <div>
            <label htmlFor="login-email-input" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              id="login-email-input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="farmer@agrointel.com"
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                validationErrors.email ? 'border-rose-350 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
              }`}
            />
            {validationErrors.email && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1" id="login-email-error">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="login-password-input" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              id="login-password-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                validationErrors.password ? 'border-rose-350 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
              }`}
            />
            {validationErrors.password && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1" id="login-password-error">
                {validationErrors.password}
              </p>
            )}
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm hover:shadow-emerald-250 cursor-pointer"
          >
            Authenticate Operator
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          First time here?{' '}
          <Link
            to="/register"
            id="login-to-register-link"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
          >
            Generate agricultural profile
          </Link>
        </div>

      </div>
    </div>
  );
}
