'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, CheckCircle, BookOpen, Users, TrendingUp, Globe, Award, ChevronRight, Star, Zap, Shield, Target } from 'lucide-react';

export default function LandingPage({ onShowLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated sections
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Comprehensive Courses",
      description: "Learn export-import fundamentals from industry experts with structured, easy-to-follow curriculum",
      color: "#bc1823"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Mentorship",
      description: "Get guidance from seasoned professionals who have years of experience in international trade",
      color: "#ffa629"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with traders, suppliers, and buyers from around the world to expand your business",
      color: "#bc1823"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Program",
      description: "Earn recognized certificates to boost your credibility in the export-import industry",
      color: "#ffa629"
    }
  ];

  const stats = [
    { number: "39", label: "Active Users", icon: <Users className="w-8 h-8" /> },
    { number: "5+", label: "Expert Mentors", icon: <Target className="w-8 h-8" /> },
    { number: "80%", label: "Success Rate", icon: <Star className="w-8 h-8" /> },
    { number: "5+", label: "Countries Reached", icon: <Globe className="w-8 h-8" /> }
  ];

  // Courses dengan support image - ganti imageUrl sesuai kebutuhan
  const courses = [
    {
      title: "Export Fundamentals",
      level: "Beginner",
      duration: "6 weeks",
      users: "2",
      rating: 4.8,
      imageUrl: "ekspor1.jpeg", // Ganti dengan path image Anda
      color: "#bc1823"
    },
    {
      title: "Import Documentation",
      level: "Intermediate",
      duration: "8 weeks",
      users: "5",
      rating: 4.9,
      imageUrl: "ekspor2.jpeg", // Ganti dengan path image Anda
      color: "#ffa629"
    },
    {
      title: "International Trade Law",
      level: "Advanced",
      duration: "10 weeks",
      users: "20",
      rating: 4.7,
      imageUrl: "ekspor3.jpeg", // Ganti dengan path image Anda
      color: "#3d3d3d"
    }
  ];

  // Partners dengan support image - ganti logoUrl sesuai kebutuhan
  const partners = [
    { 
      name: "PT Tartaruga Dinasti Indonesia", 
      logoUrl: "logo_tartaruga.png", // Ganti dengan path logo Anda
      fallbackEmoji: "🌐",
      category: "Company" 
    },
    { 
      name: "Trisakti University", 
      logoUrl: "logo_usakti.png", 
      fallbackEmoji: "🏛️",
      category: "Education" 
    },
    { 
      name: "Rajut Tarie", 
      logoUrl: "logo_rajut.jpg", 
      fallbackEmoji: "🏦",
      category: "MSEMs Indonesia" 
    },
    { 
      name: "OKOCE Community", 
      logoUrl: "logo_okoce.jpeg", 
      fallbackEmoji: "🚢",
      category: "Community" 
    },
    
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Export Manager",
      company: "TechExport Inc",
      content: "Ekspora transformed our export business. The AI tools and expert guidance are invaluable!",
      rating: 5,
      imageUrl: "foto1.jpeg", // Ganti dengan path image Anda
      fallbackEmoji: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Trade Consultant",
      company: "Global Traders",
      content: "Best platform for learning international trade. Highly recommend for beginners and experts alike.",
      rating: 5,
      imageUrl: "foto2.jpeg",
      fallbackEmoji: "👨‍💼"
    },
    {
      name: "Emma Williams",
      role: "Business Owner",
      company: "Export Solutions",
      content: "The mentor program is exceptional. I've grown my export business by 300% in just 6 months!",
      rating: 5,
      imageUrl: "foto3.jpeg",
      fallbackEmoji: "👩‍💻"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(188, 24, 35, 0.3);
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        [data-animate] {
          opacity: 0;
        }

        [data-animate].visible {
          opacity: 1;
        }

        .course-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .course-card:hover .course-image {
          transform: scale(1.1);
        }

        .partner-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .partner-card:hover .partner-logo {
          transform: scale(1.2);
        }

        .testimonial-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>

      <div className="min-h-screen bg-white overflow-hidden">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-md'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center hover-glow rounded-lg p-2">
                <img 
                  src="/logo-ekspora.png" 
                  alt="Ekspora" 
                  className="h-10 transition-transform hover:scale-110"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#home" className="text-gray-700 hover:text-[#bc1823] transition-all font-medium hover:scale-110">Home</a>
                <a href="#courses" className="text-gray-700 hover:text-[#bc1823] transition-all font-medium hover:scale-110">Courses</a>
                <a href="#about" className="text-gray-700 hover:text-[#bc1823] transition-all font-medium hover:scale-110">About</a>
                <a href="#partners" className="text-gray-700 hover:text-[#bc1823] transition-all font-medium hover:scale-110">Partners</a>
                <a href="#contact" className="text-gray-700 hover:text-[#bc1823] transition-all font-medium hover:scale-110">Contact</a>
                <button 
                  onClick={onShowLogin}
                  className="px-6 py-2 rounded-full text-white font-semibold transition-all hover:scale-105 hover:shadow-lg animate-pulse-slow" 
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
            <div className="md:hidden bg-white border-t animate-fade-in-up">
              <div className="px-4 py-4 space-y-3">
                <a href="#home" className="block text-gray-700 hover:text-[#bc1823] py-2 transition-colors">Home</a>
                <a href="#courses" className="block text-gray-700 hover:text-[#bc1823] py-2 transition-colors">Courses</a>
                <a href="#about" className="block text-gray-700 hover:text-[#bc1823] py-2 transition-colors">About</a>
                <a href="#partners" className="block text-gray-700 hover:text-[#bc1823] py-2 transition-colors">Partners</a>
                <a href="#contact" className="block text-gray-700 hover:text-[#bc1823] py-2 transition-colors">Contact</a>
                <button 
                  onClick={onShowLogin}
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
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{ 
              backgroundImage: `radial-gradient(circle at 20% 50%, #bc1823 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ffa629 0%, transparent 50%)`
            }}></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 animate-float opacity-20">
            <Zap className="w-20 h-20" style={{ color: '#ffa629' }} />
          </div>
          <div className="absolute bottom-20 left-20 animate-float opacity-20" style={{ animationDelay: '1s' }}>
            <Shield className="w-16 h-16" style={{ color: '#bc1823' }} />
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div 
                data-animate 
                id="hero-text" 
                className={visibleSections.has('hero-text') ? 'visible animate-fade-in-left' : ''}
              >
                <div className="inline-block px-4 py-2 rounded-full mb-6 animate-pulse-slow" style={{ backgroundColor: '#ffa629', opacity: 0.2 }}>
                  <span className="text-sm font-semibold" style={{ color: '#bc1823' }}>🚀 Your Gateway to Global Trade</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#3d3d3d' }}>
                  Master Export & Import with <span style={{ color: '#bc1823' }} className="shimmer-effect">Ekspora</span>
                </h2>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your business with comprehensive education in international trade. Learn from experts, connect globally, and build your success story.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={onShowLogin}
                    className="px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-xl hover-glow" 
                    style={{ backgroundColor: '#bc1823' }}
                  >
                    Start Learning Today
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 rounded-full font-semibold border-2 transition-all hover:scale-105 hover:bg-orange-50" style={{ borderColor: '#ffa629', color: '#ffa629' }}>
                    Watch Demo
                  </button>
                </div>

                <div className="mt-12 flex items-center gap-8">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white animate-pulse-slow" style={{ backgroundColor: '#ffa629', animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: '#3d3d3d' }}>39 users</p>
                    <p className="text-sm text-gray-600">Already learning with us</p>
                  </div>
                </div>
              </div>

              <div 
                data-animate 
                id="hero-card" 
                className={`relative ${visibleSections.has('hero-card') ? 'visible animate-fade-in-right' : ''}`}
              >
                <div className="absolute inset-0 rounded-3xl transform rotate-6 animate-pulse-slow" style={{ backgroundColor: '#ffa629', opacity: 0.2 }}></div>
                <div className="relative rounded-3xl p-8 shadow-2xl hover-lift" style={{ backgroundColor: '#bc1823' }}>
                  <div className="bg-white rounded-2xl p-6 space-y-4">
                    {[
                      'Expert-Led Courses',
                      'Flexible Learning Schedule',
                      'Lifetime Access',
                      'Certificate of Completion'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 hover:translate-x-2 transition-transform" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CheckCircle className="w-6 h-6" style={{ color: '#bc1823' }} />
                        <span className="font-semibold" style={{ color: '#3d3d3d' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: '#3d3d3d' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`stat-${index}`}
                  className={`text-center hover-lift ${visibleSections.has(`stat-${index}`) ? 'visible animate-scale-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-white/10">
                      {React.cloneElement(stat.icon, { style: { color: '#ffa629' } })}
                    </div>
                  </div>
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
            <div 
              data-animate 
              id="features-title" 
              className={`text-center mb-16 ${visibleSections.has('features-title') ? 'visible animate-fade-in-up' : ''}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3d3d3d' }}>
                Why Choose <span style={{ color: '#bc1823' }}>Ekspora?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We provide everything you need to succeed in international trade
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`feature-${index}`}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover-lift cursor-pointer ${visibleSections.has(`feature-${index}`) ? 'visible animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-pulse-slow" style={{ backgroundColor: feature.color, color: 'white' }}>
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

        {/* Courses Section with Images */}
        <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div 
              data-animate 
              id="courses-title" 
              className={`text-center mb-16 ${visibleSections.has('courses-title') ? 'visible animate-fade-in-up' : ''}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3d3d3d' }}>
                Popular <span style={{ color: '#bc1823' }}>Courses</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start your journey with our most sought-after programs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div 
                  key={index} 
                  data-animate 
                  id={`course-${index}`}
                  className={`course-card bg-white rounded-2xl overflow-hidden shadow-lg hover-lift cursor-pointer ${visibleSections.has(`course-${index}`) ? 'visible animate-scale-in' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Course Image */}
                  <div className="h-48 relative overflow-hidden" style={{ backgroundColor: course.color }}>
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="course-image"
                      onError={(e) => {
                        // Fallback jika image tidak ada
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div>`;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#ffa629', color: 'white' }}>
                        {course.level}
                      </span>
                      <span className="text-sm text-gray-600">{course.duration}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: '#ffa629', fill: '#ffa629' }} />
                        <span className="text-sm font-semibold">{course.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ color: '#3d3d3d' }}>
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{course.users} users enrolled</p>
                    <button className="w-full py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 hover-glow" style={{ backgroundColor: '#bc1823', color: 'white' }}>
                      Learn More
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section with Images */}
        <section id="partners" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div 
              data-animate 
              id="partners-title" 
              className={`text-center mb-16 ${visibleSections.has('partners-title') ? 'visible animate-fade-in-up' : ''}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3d3d3d' }}>
                Our Trusted <span style={{ color: '#bc1823' }}>Partners</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Working with leading organizations to provide the best export solutions
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  data-animate 
                  id={`partner-${index}`}
                  className={`partner-card bg-white rounded-xl p-6 shadow-lg hover-lift text-center cursor-pointer group ${visibleSections.has(`partner-${index}`) ? 'visible animate-scale-in' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex justify-center mb-4">
                    <img 
                      src={partner.logoUrl} 
                      alt={partner.name}
                      className="partner-logo"
                      onError={(e) => {
                        // Fallback ke emoji jika image tidak ada
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="text-5xl">${partner.fallbackEmoji}</div>`;
                      }}
                    />
                  </div>
                  <h3 className="font-bold mb-2 text-sm" style={{ color: '#3d3d3d' }}>
                    {partner.name}
                  </h3>
                  <p className="text-xs px-3 py-1 rounded-full inline-block" style={{ backgroundColor: '#fef3e4', color: '#ffa629' }}>
                    {partner.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section with Images */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fef3e4' }}>
          <div className="max-w-7xl mx-auto">
            <div 
              data-animate 
              id="testimonials-title" 
              className={`text-center mb-16 ${visibleSections.has('testimonials-title') ? 'visible animate-fade-in-up' : ''}`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#3d3d3d' }}>
                What Our <span style={{ color: '#bc1823' }}>users Say</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Success stories from our growing community
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  data-animate 
                  id={`testimonial-${index}`}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover-lift ${visibleSections.has(`testimonial-${index}`) ? 'visible animate-fade-in-up' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5" style={{ color: '#ffa629', fill: '#ffa629' }} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name}
                      className="testimonial-image"
                      onError={(e) => {
                        // Fallback ke emoji jika image tidak ada
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="text-4xl">${testimonial.fallbackEmoji}</div>`;
                      }}
                    />
                    <div>
                      <h4 className="font-bold" style={{ color: '#3d3d3d' }}>{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs" style={{ color: '#ffa629' }}>{testimonial.company}</p>
                    </div>
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
          
          <div 
            data-animate 
            id="cta" 
            className={`max-w-4xl mx-auto text-center relative ${visibleSections.has('cta') ? 'visible animate-scale-in' : ''}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Export-Import Journey?
            </h2>
            <p className="text-xl text-white opacity-90 mb-8">
              Join thousands of successful traders who transformed their business with Ekspora
            </p>
            <button 
              onClick={onShowLogin}
              className="px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl animate-pulse-slow" 
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
                <img 
                  src="/logo-ekspora.png" 
                  alt="Ekspora" 
                  className="h-8 mb-4 hover:scale-110 transition-transform"
                  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
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
    </>
  );

}

