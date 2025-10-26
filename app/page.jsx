'use client'; 

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, CheckCircle, BookOpen, Users, TrendingUp, Globe, Award, ChevronRight } from 'lucide-react';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';

export default function EksporaHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Courses",
      description: "Learn export-import fundamentals from industry experts with structured, easy-to-follow curriculum"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Mentorship",
      description: "Get guidance from seasoned professionals who have years of experience in international trade"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with traders, suppliers, and buyers from around the world to expand your business"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Program",
      description: "Earn recognized certificates to boost your credibility in the export-import industry"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "50+", label: "Expert Mentors" },
    { number: "95%", label: "Success Rate" },
    { number: "30+", label: "Countries Reached" }
  ];

  const courses = [
    {
      title: "Export Fundamentals",
      level: "Beginner",
      duration: "6 weeks",
      students: "2,500+"
    },
    {
      title: "Import Documentation",
      level: "Intermediate",
      duration: "8 weeks",
      students: "1,800+"
    },
    {
      title: "International Trade Law",
      level: "Advanced",
      duration: "10 weeks",
      students: "1,200+"
    }
  ];

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />}
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold" style={{ color: '#bc1823' }}>
                Ekspora
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-[#bc1823] transition-colors font-medium">Home</a>
              <a href="#courses" className="text-gray-700 hover:text-[#bc1823] transition-colors font-medium">Courses</a>
              <a href="#about" className="text-gray-700 hover:text-[#bc1823] transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-700 hover:text-[#bc1823] transition-colors font-medium">Contact</a>
              <button 
                onClick={() => setShowLogin(true)}
                className="px-6 py-2 rounded-full text-white font-semibold transition-all hover:scale-105" 
                style={{ backgroundColor: '#ffa629' }}
              >
                Get Started
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block text-gray-700 hover:text-[#bc1823] py-2">Home</a>
              <a href="#courses" className="block text-gray-700 hover:text-[#bc1823] py-2">Courses</a>
              <a href="#about" className="block text-gray-700 hover:text-[#bc1823] py-2">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-[#bc1823] py-2">Contact</a>
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full px-6 py-2 rounded-full text-white font-semibold" 
                style={{ backgroundColor: '#ffa629' }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: `radial-gradient(circle at 20% 50%, #bc1823 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ffa629 0%, transparent 50%)`
        }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#ffa629', opacity: 0.2 }}>
                <span className="text-sm font-semibold" style={{ color: '#bc1823' }}>🚀 Your Gateway to Global Trade</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#3d3d3d' }}>
                Master Export & Import with <span style={{ color: '#bc1823' }}>Ekspora</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your business with comprehensive education in international trade. Learn from experts, connect globally, and build your success story.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-xl" 
                  style={{ backgroundColor: '#bc1823' }}
                >
                  Start Learning Today
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105" style={{ borderColor: '#ffa629', color: '#ffa629' }}>
                  Watch Demo
                </button>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white" style={{ backgroundColor: '#ffa629' }}></div>
                  ))}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: '#3d3d3d' }}>10,000+ Students</p>
                  <p className="text-sm text-gray-600">Already learning with us</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl transform rotate-6" style={{ backgroundColor: '#ffa629', opacity: 0.2 }}></div>
              <div className="relative rounded-3xl p-8 shadow-2xl" style={{ backgroundColor: '#bc1823' }}>
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" style={{ color: '#bc1823' }} />
                    <span className="font-semibold" style={{ color: '#3d3d3d' }}>Expert-Led Courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" style={{ color: '#bc1823' }} />
                    <span className="font-semibold" style={{ color: '#3d3d3d' }}>Flexible Learning Schedule</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" style={{ color: '#bc1823' }} />
                    <span className="font-semibold" style={{ color: '#3d3d3d' }}>Lifetime Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" style={{ color: '#bc1823' }} />
                    <span className="font-semibold" style={{ color: '#3d3d3d' }}>Certificate of Completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#3d3d3d' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: '#ffa629' }}>
                  {stat.number}
                </h3>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3d3d3d' }}>
              Why Choose <span style={{ color: '#bc1823' }}>Ekspora?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in international trade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: index % 2 === 0 ? '#bc1823' : '#ffa629', color: 'white' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#3d3d3d' }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3d3d3d' }}>
              Popular <span style={{ color: '#bc1823' }}>Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your journey with our most sought-after programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer">
                <div className="h-48 relative" style={{ backgroundColor: index === 0 ? '#bc1823' : index === 1 ? '#ffa629' : '#3d3d3d' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp className="w-20 h-20 text-white opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#ffa629', color: 'white' }}>
                      {course.level}
                    </span>
                    <span className="text-sm text-gray-600">{course.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#3d3d3d' }}>
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.students} students enrolled</p>
                  <button className="w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105" style={{ backgroundColor: '#bc1823', color: 'white' }}>
                    Learn More
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#bc1823' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Export-Import Journey?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of successful traders who transformed their business with Ekspora
          </p>
          <button 
            onClick={() => setShowLogin(true)}
            className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl" 
            style={{ backgroundColor: '#ffa629', color: '#3d3d3d' }}
          >
            Enroll Now - Limited Spots Available
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#3d3d3d' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#ffa629' }}>Ekspora</h3>
              <p className="text-gray-400">Your trusted partner in export-import education</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-[#ffa629] transition-colors">About Us</a>
                <a href="#" className="block text-gray-400 hover:text-[#ffa629] transition-colors">Courses</a>
                <a href="#" className="block text-gray-400 hover:text-[#ffa629] transition-colors">Mentors</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-[#ffa629] transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-[#ffa629] transition-colors">Terms of Service</a>
                <a href="#" className="block text-gray-400 hover:text-[#ffa629] transition-colors">Privacy Policy</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>info@ekspora.com</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ekspora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
