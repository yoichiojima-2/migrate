import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChartBar, FaMoneyBillWave, FaHeart, FaGlobe } from 'react-icons/fa';
import { useCityContext } from '../context/CityContext';
import CitySelector from '../components/CitySelector';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const { cities, selectedCity, setSelectedCity, loading } = useCityContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [activeTab, setActiveTab] = useState('cities'); // 'cities' or 'countries'
  const [selectedCountry, setSelectedCountry] = useState('');
  
  // Extract unique countries from cities data
  const countries = [...new Set(cities.map(city => city.country))].sort();

  // Filter cities or countries based on search term and active tab
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCities([]);
      return;
    }

    if (activeTab === 'cities') {
      const filtered = cities.filter(city => 
        city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.country.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6); // Limit to 6 results
      
      setFilteredCities(filtered);
    } else {
      // For countries tab, filter unique countries
      const filtered = countries
        .filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 6);
      
      setFilteredCities(filtered);
    }
  }, [searchTerm, cities, activeTab, countries]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchTerm('');
    setFilteredCities([]);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSearchTerm('');
    setFilteredCities([]);
    // Get the first city from the selected country
    const countryCity = cities.find(city => city.country === country);
    if (countryCity) {
      setSelectedCity(countryCity.city);
    }
  };

  const features = [
    {
      title: 'Quality of Life Comparison',
      description: 'Compare happiness, safety, healthcare, and more between cities.',
      icon: FaHeart,
      path: '/quality-of-life',
      color: 'bg-pink-500',
    },
    {
      title: 'Cost of Living Analysis',
      description: 'Compare rent, food, transportation, and other living expenses.',
      icon: FaMoneyBillWave,
      path: '/cost-of-living',
      color: 'bg-green-500',
    },
    {
      title: 'Detailed City Comparison',
      description: 'Side-by-side comparison of all metrics between cities.',
      icon: FaChartBar,
      path: '/comparison',
      color: 'bg-blue-500',
    },
    {
      title: 'Country Rankings',
      description: 'See how countries rank across different quality of life and cost metrics.',
      icon: FaGlobe,
      path: '/rankings',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl shadow-2xl p-8 md:p-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slideIn">
            <span className="gradient-text">Find Your Perfect</span>
            <br />
            <span className="text-white">City to Live</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 text-gray-100 opacity-90 max-w-2xl mx-auto animate-slideIn" style={{animationDelay: '0.1s'}}>
            Compare quality of life and cost of living across cities worldwide with real-time data
          </p>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8 animate-slideIn" style={{animationDelay: '0.15s'}}>
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-1 flex">
              <button
                onClick={() => setActiveTab('cities')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'cities' 
                    ? 'bg-white text-primary-600 shadow-lg' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Cities
              </button>
              <button
                onClick={() => setActiveTab('countries')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'countries' 
                    ? 'bg-white text-primary-600 shadow-lg' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Countries
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto animate-slideIn" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl hover:shadow-glow transition-all duration-300">
              <FaSearch className="ml-4 text-primary-500 w-5 h-5" />
              <input
                type="text"
                placeholder={activeTab === 'cities' ? "Search for any city..." : "Search for any country..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 px-4 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-transparent"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {filteredCities.length > 0 && (
              <div className="absolute z-20 w-full mt-2 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl text-left overflow-hidden animate-slideIn">
                {activeTab === 'cities' ? (
                  filteredCities.map((city, index) => (
                    <div
                      key={city.city}
                      className="p-4 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 cursor-pointer text-gray-800 transition-all duration-200 border-b border-gray-100 last:border-0"
                      onClick={() => handleCitySelect(city.city)}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      <div className="font-semibold text-gray-900">
                        {city.city.charAt(0).toUpperCase() + city.city.slice(1)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {city.country.charAt(0).toUpperCase() + city.country.slice(1)}
                      </div>
                    </div>
                  ))
                ) : (
                  filteredCities.map((country, index) => (
                    <div
                      key={country}
                      className="p-4 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 cursor-pointer text-gray-800 transition-all duration-200 border-b border-gray-100 last:border-0"
                      onClick={() => handleCountrySelect(country)}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      <div className="font-semibold text-gray-900">
                        {country.charAt(0).toUpperCase() + country.slice(1)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {cities.filter(c => c.country === country).length} cities
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          {/* City/Country Selector */}
          <div className="mt-10 animate-slideIn" style={{animationDelay: '0.3s'}}>
            {activeTab === 'cities' ? (
              <CitySelector
                label="Or select a city from our database"
                value={selectedCity}
                onChange={setSelectedCity}
              />
            ) : (
              <>
                <p className="text-white/80 mb-4">Or select a country from our database</p>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountrySelect(e.target.value)}
                  className="w-full max-w-md mx-auto bg-white backdrop-blur-lg text-gray-800 px-4 py-3 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 appearance-none cursor-pointer"
                >
                  <option value="">Select a country...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>
                      {country.charAt(0).toUpperCase() + country.slice(1)} ({cities.filter(c => c.country === country).length} cities)
                    </option>
                  ))}
                </select>
              </>
            )}
            
            {selectedCity && (
              <div className="mt-6 animate-fadeIn">
                <Link
                  to="/quality-of-life"
                  className="inline-flex items-center bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 btn-hover"
                >
                  <span>Explore {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="gradient-text">Discover</span> What Makes a City Great
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive data and insights to help you make informed decisions about your next move
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 card-hover animate-slideIn"
              style={{animationDelay: `${0.5 + index * 0.1}s`}}
            >
              <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <feature.icon className="text-white text-2xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium">Learn more</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl animate-slideIn">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-center text-gray-700 dark:text-gray-300 font-medium">Loading city data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
