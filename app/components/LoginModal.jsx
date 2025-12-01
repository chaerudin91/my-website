'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validCredentials = {
    email: 'admin@admin',
    password: 'admin'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (loginData.email === validCredentials.email && loginData.password === validCredentials.password) {
        onLoginSuccess();
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold" style={{ color: '#bc1823' }}>Welcome Back</h2>
            <p className="text-gray-600 text-sm mt-1">Login to access your dashboard</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#3d3d3d' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#bc1823] focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#3d3d3d' }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-[#bc1823] focus:outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-sm text-red-800">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-lg">🔐</span> Demo Credentials
            </p>
            <div className="space-y-1 ml-6">
              <p><span className="font-medium">Email:</span> user@ekspora.com</p>
              <p><span className="font-medium">Password:</span> ekspora123</p>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{ backgroundColor: '#bc1823' }}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </>
            ) : (
              'Login to Dashboard'
            )}
          </button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="font-semibold hover:underline" style={{ color: '#bc1823' }}>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );

}

