import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Farmer'
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [authError, setAuthError] = useState('');

  // Protect and redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full operator name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters.';
    }

    if (!formData.email) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email must be dynamic pattern e.g. name@domain.com.';
    }

    if (!formData.password) {
      errs.password = 'A strong password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
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
    // Clear validation error dynamically
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const result = register(formData.name, formData.email, formData.password, formData.role);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setAuthError(result.error);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-md p-8 border border-slate-100 dark:border-slate-705">
        
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-4xl inline-block" role="img" aria-label="green plant">🌱</span>
          <h2 className="text-2xl font-bold font-sans tracking-tight text-emerald-800 dark:text-emerald-405 mt-2">
            Generate Farmer Profile
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign up for custom soil metrics and crop advisory tools
          </p>
        </div>

        {authError && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 mb-4 text-xs font-semibold text-rose-600 dark:bg-rose-950/20 dark:border-rose-900 text-center">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Action Operator name config */}
          <div>
            <label htmlFor="register-name-input" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              id="register-name-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Hari Prasad"
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                validationErrors.name ? 'border-rose-350 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
              }`}
            />
            {validationErrors.name && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1" id="register-name-error">
                {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="register-email-input" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-sans">
              Email Address / ID
            </label>
            <input
              id="register-email-input"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="operator@agrointel.com"
              className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                validationErrors.email ? 'border-rose-350 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
              }`}
            />
            {validationErrors.email && (
              <p className="text-[11px] text-rose-500 font-semibold mt-1" id="register-email-error">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Role selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-sans">
              Agricultural Role
            </label>
            <select
              id="register-role-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 focus:outline focus:outline-emerald-600 focus:border-transparent transition"
            >
              <option value="Farmer">Landowner / Independent Farmer</option>
              <option value="Agronomist">Expert Agronomist Advisor</option>
              <option value="Student">Academic Scholar / Student</option>
            </select>
          </div>

          {/* Password inputs joint */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-sans">
                Password
              </label>
              <input
                id="register-password-input"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="6+ chars"
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                  validationErrors.password ? 'border-rose-350 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
                }`}
              />
              {validationErrors.password && (
                <p className="text-[11px] text-rose-500 font-semibold mt-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5 font-sans">
                Confirm Password
              </label>
              <input
                id="register-confirm-input"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="6+ chars"
                className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline focus:outline-emerald-600 focus:border-transparent transition ${
                  validationErrors.confirmPassword ? 'border-rose-350 bg-rose-50/10' : 'border-slate-200 dark:border-slate-705'
                }`}
              />
              {validationErrors.confirmPassword && (
                <p className="text-[11px] text-rose-500 font-semibold mt-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            id="register-submit-btn"
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-sm hover:shadow-emerald-250 cursor-pointer text-center"
          >
            Create Credentials & Login
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Already registered?{' '}
          <Link
            to="/login"
            id="register-to-login-link"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
          >
            Log back in
          </Link>
        </div>

      </div>
    </div>
  );
}
