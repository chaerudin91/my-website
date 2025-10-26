import React, { useState } from 'react';
import { Search, Globe, TrendingUp, Users, Building2, Package, Mail, Phone, Star, ArrowRight, CheckCircle, Award, Clock } from 'lucide-react';

const BuyerMatchmaking = () => {
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCountry, setSearchCountry] = useState('');
  const [filteredBuyers, setFilteredBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  const buyers = [
    { 
      id: 1,
      company: 'Global Trade Inc.', 
      country: 'USA', 
      category: 'Electronics', 
      demand: 'High',
      orders: '500+',
      rating: 4.8,
      verified: true,
      email: 'contact@globaltrade.com',
      phone: '+1-555-0100',
      established: '2015',
      responseTime: '2 hours',
      description: 'Leading electronics importer in North America with strong distribution network'
    },
    { 
      id: 2,
      company: 'Euro Import Ltd.', 
      country: 'Germany', 
      category: 'Textiles', 
      demand: 'Medium',
      orders: '250+',
      rating: 4.5,
      verified: true,
      email: 'info@euroimport.de',
      phone: '+49-555-0200',
      established: '2018',
      responseTime: '4 hours',
      description: 'Premium textile importer serving European fashion industry'
    },
    { 
      id: 3,
      company: 'Asia Pacific Corp.', 
      country: 'Singapore', 
      category: 'Food Products', 
      demand: 'High',
      orders: '750+',
      rating: 4.9,
      verified: true,
      email: 'sales@asiapacific.sg',
      phone: '+65-555-0300',
      established: '2012',
      responseTime: '1 hour',
      description: 'Major food distributor covering Southeast Asian markets'
    },
    { 
      id: 4,
      company: 'Middle East Traders', 
      country: 'UAE', 
      category: 'Furniture', 
      demand: 'Medium',
      orders: '350+',
      rating: 4.6,
      verified: true,
      email: 'trade@metraders.ae',
      phone: '+971-555-0400',
      established: '2016',
      responseTime: '3 hours',
      description: 'Luxury furniture importer for Gulf region markets'
    },
    { 
      id: 5,
      company: 'Nordic Imports', 
      country: 'Sweden', 
      category: 'Machinery', 
      demand: 'High',
      orders: '600+',
      rating: 4.7,
      verified: true,
      email: 'order@nordicimports.se',
      phone: '+46-555-0500',
      established: '2014',
      responseTime: '2 hours',
      description: 'Industrial machinery specialist for Scandinavian manufacturing sector'
    },
    { 
      id: 6,
      company: 'Latin Trade Co.', 
      country: 'Brazil', 
      category: 'Agriculture', 
      demand: 'Medium',
      orders: '400+',
      rating: 4.4,
      verified: true,
      email: 'contato@latintrade.br',
      phone: '+55-555-0600',
      established: '2017',
      responseTime: '5 hours',
      description: 'Agricultural products trader with extensive South American network'
    },
    { 
      id: 7,
      company: 'Pacific Ventures', 
      country: 'Australia', 
      category: 'Electronics', 
      demand: 'High',
      orders: '450+',
      rating: 4.6,
      verified: true,
      email: 'info@pacificventures.au',
      phone: '+61-555-0700',
      established: '2019',
      responseTime: '3 hours',
      description: 'Tech hardware distributor for Australian and New Zealand markets'
    },
    { 
      id: 8,
      company: 'African Trade Hub', 
      country: 'South Africa', 
      category: 'Textiles', 
      demand: 'High',
      orders: '320+',
      rating: 4.5,
      verified: true,
      email: 'sales@africantradehub.za',
      phone: '+27-555-0800',
      established: '2016',
      responseTime: '4 hours',
      description: 'Pan-African textile distributor with growing market presence'
    },
    { 
      id: 9,
      company: 'UK Commerce Group', 
      country: 'United Kingdom', 
      category: 'Food Products', 
      demand: 'Medium',
      orders: '380+',
      rating: 4.7,
      verified: true,
      email: 'trade@ukcommerce.uk',
      phone: '+44-555-0900',
      established: '2013',
      responseTime: '2 hours',
      description: 'Specialty food importer for British retail chains'
    }
  ];

  const categories = ['Electronics', 'Textiles', 'Food Products', 'Furniture', 'Machinery', 'Agriculture'];
  const countries = ['USA', 'Germany', 'Singapore', 'UAE', 'Sweden', 'Brazil', 'Australia', 'South Africa', 'United Kingdom'];

  const handleSearch = () => {
    const results = buyers.filter(buyer => {
      const matchCategory = searchCategory === '' || buyer.category.toLowerCase().includes(searchCategory.toLowerCase());
      const matchCountry = searchCountry === '' || buyer.country.toLowerCase().includes(searchCountry.toLowerCase());
      return matchCategory && matchCountry;
    });
    setFilteredBuyers(results);
  };

  const handleReset = () => {
    setSearchCategory('');
    setSearchCountry('');
    setFilteredBuyers([]);
  };

  const displayBuyers = filteredBuyers.length > 0 ? filteredBuyers : buyers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 mr-3" style={{ color: '#bc1823' }} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#bc1823] to-[#ffa629] bg-clip-text text-transparent">
              Buyer Matchmaking Platform
            </h1>
          </div>
          <p className="text-xl font-medium" style={{ color: '#3d3d3d' }}>
            Connect with verified international buyers and grow your export business
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg border-t-4 hover:shadow-xl transition-all" style={{ borderColor: '#bc1823' }}>
            <div className="flex flex-col items-center text-center">
              <Users className="w-10 h-10 mb-2" style={{ color: '#bc1823' }} />
              <p className="text-sm font-bold mb-1" style={{ color: '#bc1823' }}>Active Buyers</p>
              <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>2,450+</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-t-4 hover:shadow-xl transition-all" style={{ borderColor: '#ffa629' }}>
            <div className="flex flex-col items-center text-center">
              <Globe className="w-10 h-10 mb-2" style={{ color: '#ffa629' }} />
              <p className="text-sm font-bold mb-1" style={{ color: '#ffa629' }}>Countries</p>
              <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>150+</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-t-4 hover:shadow-xl transition-all" style={{ borderColor: '#bc1823' }}>
            <div className="flex flex-col items-center text-center">
              <Package className="w-10 h-10 mb-2" style={{ color: '#bc1823' }} />
              <p className="text-sm font-bold mb-1" style={{ color: '#bc1823' }}>Categories</p>
              <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>50+</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg border-t-4 hover:shadow-xl transition-all" style={{ borderColor: '#ffa629' }}>
            <div className="flex flex-col items-center text-center">
              <TrendingUp className="w-10 h-10 mb-2" style={{ color: '#ffa629' }} />
              <p className="text-sm font-bold mb-1" style={{ color: '#ffa629' }}>Success Rate</p>
              <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>96%</p>
            </div>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8 border-2" style={{ borderColor: '#bc1823' }}>
          <div className="flex items-center mb-6">
            <Search className="w-8 h-8 mr-3" style={{ color: '#bc1823' }} />
            <h2 className="text-3xl font-bold" style={{ color: '#bc1823' }}>Find Your Perfect Buyer Match</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="px-4 py-4 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none text-base font-medium"
              style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="px-4 py-4 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none text-base font-medium"
              style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
            >
              <option value="">All Countries</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
            <button 
              onClick={handleSearch}
              className="px-6 py-4 rounded-lg text-white font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center" 
              style={{ backgroundColor: '#bc1823' }}
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </button>
            <button 
              onClick={handleReset}
              className="px-6 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 border-2"
              style={{ color: '#bc1823', borderColor: '#bc1823', backgroundColor: 'white' }}
            >
              Reset Filters
            </button>
          </div>
          {filteredBuyers.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <p className="font-bold text-lg" style={{ color: '#3d3d3d' }}>
                <CheckCircle className="w-5 h-5 inline mr-2" style={{ color: '#bc1823' }} />
                Found {filteredBuyers.length} matching buyer{filteredBuyers.length !== 1 ? 's' : ''} for your search
              </p>
            </div>
          )}
        </div>

        {/* Buyer Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBuyers.map((buyer) => (
            <div key={buyer.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 hover:border-[#bc1823]" style={{ borderColor: '#e5e7eb' }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start flex-1">
                  <Building2 className="w-6 h-6 mr-2 mt-1" style={{ color: '#bc1823' }} />
                  <div>
                    <h3 className="font-bold text-xl mb-1" style={{ color: '#3d3d3d' }}>{buyer.company}</h3>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-1" style={{ color: '#ffa629' }} />
                      <p className="text-sm font-semibold" style={{ color: '#3d3d3d' }}>{buyer.country}</p>
                    </div>
                  </div>
                </div>
                {buyer.verified && (
                  <div className="flex flex-col items-end">
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 mb-1" style={{ color: '#3d3d3d' }}>
                      ✓ Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm font-medium mb-4 p-3 bg-gray-50 rounded-lg" style={{ color: '#3d3d3d' }}>
                {buyer.description}
              </p>

              {/* Key Info */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="font-bold text-sm" style={{ color: '#3d3d3d' }}>Category</span>
                  <span className="font-bold" style={{ color: '#bc1823' }}>{buyer.category}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                  <span className="font-bold text-sm" style={{ color: '#3d3d3d' }}>Demand Level</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${buyer.demand === 'High' ? 'bg-green-100' : 'bg-yellow-100'}`} style={{ color: '#3d3d3d' }}>
                    {buyer.demand}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-bold text-sm flex items-center" style={{ color: '#3d3d3d' }}>
                    <Package className="w-4 h-4 mr-1" style={{ color: '#ffa629' }} />
                    Total Orders
                  </span>
                  <span className="font-bold" style={{ color: '#ffa629' }}>{buyer.orders}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-bold text-sm" style={{ color: '#3d3d3d' }}>Rating</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" style={{ color: '#ffa629' }} />
                    <span className="font-bold" style={{ color: '#3d3d3d' }}>{buyer.rating}/5.0</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-bold text-sm flex items-center" style={{ color: '#3d3d3d' }}>
                    <Clock className="w-4 h-4 mr-1" style={{ color: '#bc1823' }} />
                    Response Time
                  </span>
                  <span className="font-bold" style={{ color: '#bc1823' }}>{buyer.responseTime}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-bold text-sm flex items-center" style={{ color: '#3d3d3d' }}>
                    <Award className="w-4 h-4 mr-1" style={{ color: '#ffa629' }} />
                    Established
                  </span>
                  <span className="font-bold" style={{ color: '#3d3d3d' }}>{buyer.established}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border" style={{ borderColor: '#ffa629' }}>
                <p className="font-bold text-xs mb-2" style={{ color: '#bc1823' }}>CONTACT INFORMATION</p>
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#bc1823' }} />
                  <span className="text-xs font-semibold break-all" style={{ color: '#3d3d3d' }}>{buyer.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#bc1823' }} />
                  <span className="text-xs font-semibold" style={{ color: '#3d3d3d' }}>{buyer.phone}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => setSelectedBuyer(buyer)}
                className="w-full py-3 rounded-lg text-white font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center" 
                style={{ backgroundColor: '#ffa629' }}
              >
                Connect Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedBuyer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedBuyer(null)}>
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#bc1823' }}>
                Connect with {selectedBuyer.company}
              </h2>
              <p className="font-medium mb-6" style={{ color: '#3d3d3d' }}>
                Your connection request will be sent to this verified buyer. They typically respond within {selectedBuyer.responseTime}.
              </p>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl mb-6 border-2" style={{ borderColor: '#ffa629' }}>
                <h3 className="font-bold text-xl mb-4" style={{ color: '#3d3d3d' }}>Buyer Information</h3>
                <div className="space-y-3">
                  <p className="font-semibold" style={{ color: '#3d3d3d' }}>
                    <span style={{ color: '#bc1823' }}>Company:</span> {selectedBuyer.company}
                  </p>
                  <p className="font-semibold" style={{ color: '#3d3d3d' }}>
                    <span style={{ color: '#bc1823' }}>Location:</span> {selectedBuyer.country}
                  </p>
                  <p className="font-semibold" style={{ color: '#3d3d3d' }}>
                    <span style={{ color: '#bc1823' }}>Category:</span> {selectedBuyer.category}
                  </p>
                  <p className="font-semibold" style={{ color: '#3d3d3d' }}>
                    <span style={{ color: '#bc1823' }}>Email:</span> {selectedBuyer.email}
                  </p>
                  <p className="font-semibold" style={{ color: '#3d3d3d' }}>
                    <span style={{ color: '#bc1823' }}>Phone:</span> {selectedBuyer.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedBuyer(null)}
                  className="flex-1 py-3 rounded-lg font-bold text-lg border-2 hover:shadow-lg transition-all"
                  style={{ color: '#bc1823', borderColor: '#bc1823', backgroundColor: 'white' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert(`Connection request sent to ${selectedBuyer.company}!`);
                    setSelectedBuyer(null);
                  }}
                  className="flex-1 py-3 rounded-lg text-white font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center"
                  style={{ backgroundColor: '#ffa629' }}
                >
                  Send Request
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerMatchmaking;