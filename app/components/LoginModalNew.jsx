'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle, Sparkles, Zap } from 'lucide-react';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  const validCredentials = {
    email: 'user@ekspora.com',
    password: 'ekspora123'
  };

  useEffect(() => {
    // Mount animation
    setMounted(true);
    document.body.style.overflow = 'hidden';

    // Generate floating elements for animation
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setFloatingElements(elements);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (loginData.email === validCredentials.email && loginData.password === validCredentials.password) {
        onLoginSuccess();
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!registerData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!registerData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      alert(`Registration successful! Welcome ${registerData.name}!\n\nYou can now login with:\nEmail: ${registerData.email}`);
      setIsLogin(true);
      setLoginData({ email: registerData.email, password: '' });
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
      setIsLoading(false);
    }, 1000);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <>
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modal-fade {
          animation: modalFadeIn 0.3s ease-out;
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-slide-right {
          animation: slideInFromRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .floating-element {
          position: absolute;
          opacity: 0.1;
          pointer-events: none;
          animation: float linear infinite;
        }

        .input-field {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-field:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(188, 24, 35, 0.15);
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 400px;
          height: 400px;
        }

        .btn-primary:active {
          transform: scale(0.95);
        }

        .feature-item {
          transition: all 0.3s ease;
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }

        .feature-item:hover {
          transform: translateX(10px);
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.8) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        .close-btn {
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          transform: rotate(90deg) scale(1.1);
        }

        /* Scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(188, 24, 35, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(188, 24, 35, 0.5);
        }
      `}</style>

      <div className={`fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 ${mounted ? 'animate-modal-fade' : 'opacity-0'}`}>
        <div className="w-full h-full max-w-[1600px] max-h-[95vh] mx-auto flex items-center justify-center p-3 md:p-6">
          <div className={`bg-white w-full h-full rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative ${mounted ? 'animate-scale-in' : 'opacity-0'}`}>
            
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="close-btn absolute top-3 right-3 z-50 text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side - Brand Section */}
            <div 
              className={`hidden lg:flex lg:w-1/2 p-8 xl:p-12 flex-col justify-between text-white relative overflow-hidden ${mounted ? 'animate-slide-left' : ''}`}
              style={{ backgroundColor: '#bc1823' }}
            >
              {/* Floating Background Elements */}
              {floatingElements.map((el) => (
                <div
                  key={el.id}
                  className="floating-element"
                  style={{
                    left: `${el.left}%`,
                    top: `${el.top}%`,
                    width: `${el.size}px`,
                    height: `${el.size}px`,
                    animationDuration: `${el.duration}s`,
                    animationDelay: `${el.delay}s`
                  }}
                >
                  {el.id % 3 === 0 ? (
                    <Sparkles className="w-full h-full text-white" />
                  ) : el.id % 3 === 1 ? (
                    <Zap className="w-full h-full text-white" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-white"></div>
                  )}
                </div>
              ))}

              {/* Content */}
              <div className="relative z-10">
                {/* Logo with Shimmer */}
                <div className="mb-8">
                  <img 
                    src="/logo-ekspora.png" 
                    alt="Ekspora" 
                    className="h-10 xl:h-12 mb-4"
                    style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                  />
                </div>

                {/* Headline */}
                <div>
                  <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight shimmer-text">
                    {isLogin ? 'Welcome Back!' : 'Join Ekspora Today'}
                  </h1>
                  <p className="text-lg xl:text-xl opacity-90 mb-8 leading-relaxed">
                    {isLogin 
                      ? 'Master export & import with expert guidance and AI-powered tools.'
                      : 'Start your journey in international trade with comprehensive education and support.'
                    }
                  </p>

                  {/* Features List with Animation */}
                  <div className="space-y-4">
                    {[
                      'AI-Powered Export Simulation',
                      'Expert Mentor Guidance',
                      'Global Buyer Network',
                      'Comprehensive Courses'
                    ].map((text, index) => (
                      <div key={index} className="flex items-center gap-3 feature-item">
                        <CheckCircle className="w-6 h-6 flex-shrink-0" />
                        <span className="text-base xl:text-lg">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quote */}
              <div className="relative z-10 animate-fade-up" style={{ animationDelay: '0.5s' }}>
                <blockquote className="text-base xl:text-lg opacity-90 italic border-l-4 border-white pl-4">
                  "Ekspora transformed our export business. The AI tools and expert guidance are invaluable!"
                  <footer className="text-sm mt-2 not-italic opacity-75">— Sarah Chen, Export Manager</footer>
                </blockquote>
              </div>
            </div>

            {/* Right Side - Form Section */}
            <div className={`w-full lg:w-1/2 flex items-center justify-center bg-white overflow-y-auto custom-scrollbar ${mounted ? 'animate-slide-right' : ''}`}>
              <div className="w-full max-w-md px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                
                {/* Mobile Logo */}
                <div className="lg:hidden mb-4 text-center">
                  <img 
                    src="/logo-ekspora.png" 
                    alt="Ekspora" 
                    className="h-8 mx-auto mb-3"
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                {/* Title */}
                <div className="mb-5">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#000' }}>
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isLogin 
                      ? 'Enter your credentials to access your account' 
                      : 'Fill in your details to get started'
                    }
                  </p>
                </div>

                {/* Login Form */}
                {isLogin ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          className="input-field w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                          placeholder="you@example.com"
                          style={{ color: '#000' }}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="input-field w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                          placeholder="Enter your password"
                          style={{ color: '#000' }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <label className="flex items-center cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 transition-transform group-hover:scale-110" style={{ accentColor: '#bc1823' }} />
                        <span className="ml-2" style={{ color: '#000' }}>Remember me</span>
                      </label>
                      <a href="#" className="font-semibold hover:underline transition-all" style={{ color: '#bc1823' }}>
                        Forgot?
                      </a>
                    </div>

                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2 text-xs animate-scale-in" style={{ color: '#bc1823' }}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                   
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative"
                      style={{ backgroundColor: '#bc1823' }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </button>
                  </form>
                ) : (
                  /* Register Form */
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          className="input-field w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                          placeholder="John Doe"
                          style={{ color: '#000' }}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          className="input-field w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                          placeholder="you@example.com"
                          style={{ color: '#000' }}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          className="input-field w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                          placeholder="Min. 6 characters"
                          style={{ color: '#000' }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                          className="input-field w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none text-sm"
                          placeholder="Re-enter password"
                          style={{ color: '#000' }}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300" style={{ accentColor: '#bc1823' }} required />
                      <label className="ml-2 text-xs" style={{ color: '#000' }}>
                        I agree to the <a href="#" className="font-semibold hover:underline" style={{ color: '#bc1823' }}>Terms</a> and <a href="#" className="font-semibold hover:underline" style={{ color: '#bc1823' }}>Privacy</a>
                      </label>
                    </div>

                    {error && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-start gap-2 text-xs animate-scale-in" style={{ color: '#bc1823' }}>
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative"
                      style={{ backgroundColor: '#bc1823' }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating account...</span>
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </form>
                )}

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Social Login */}
                <button className="w-full py-2.5 rounded-xl border-2 border-gray-200 font-semibold transition-all hover:bg-gray-50 hover:border-gray-300 hover:shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span style={{ color: '#000' }}>Continue with Google</span>
                </button>

                {/* Switch Mode */}
                <div className="text-center mt-4">
                  <p className="text-xs" style={{ color: '#000' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      onClick={switchMode}
                      className="font-bold hover:underline transition-all"
                      style={{ color: '#bc1823' }}
                    >
                      {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}