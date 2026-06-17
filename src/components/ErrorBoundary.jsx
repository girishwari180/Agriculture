import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 text-slate-800 p-6 md:p-12">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 border border-emerald-100 text-center">
            <div className="flex justify-center mb-6">
              <span className="text-5xl leading-none" role="img" aria-label="wilted flower">🥀</span>
            </div>
            <h1 className="text-2xl font-bold font-sans tracking-tight text-emerald-800 mb-3">
              Agri-System Refresher
            </h1>
            <p className="text-sm text-slate-600 mb-6">
              An unexpected interruption occurred in the advisory calculations pipeline. Please click below to restart the smart advisory system dashboard.
            </p>
            {this.state.error && (
              <div className="bg-slate-50 text-slate-700 font-mono text-xs rounded-xl p-3 border border-slate-100 text-left mb-6 overflow-auto max-h-36">
                <strong>Error:</strong> {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition cursor-pointer"
            >
              Reset System State & Restart
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
