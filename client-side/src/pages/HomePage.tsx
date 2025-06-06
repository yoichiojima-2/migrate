import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChartBar, FaMoneyBillWave, FaHeart, FaGlobe } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useCityContext } from '../context/CityContext';
import CitySelector from '../components/CitySelector';
import LoadingSpinner from '../components/LoadingSpinner';
import { City } from '../types';

interface Feature {
  title: string;
  description: string;
  icon: IconType;
  path: string;
  color: string;
}

const HomePage: React.FC = () => {
  const { cities, selectedCity, setSelectedCity, loading } = useCityContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  // Filter cities based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCities([]);
      return;
    }

    const filtered = cities.filter(city => 
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 6); // Limit to 6 results
    
    setFilteredCities(filtered);
  }, [searchTerm, cities]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setSearchTerm('');
    setFilteredCities([]);
  };

  const features: Feature[] = [
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
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white rounded-lg shadow-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your Perfect City to Live
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Compare quality of life and cost of living across cities worldwide
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md">
              <FaSearch className="ml-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-lg text-gray-800 focus:outline-none"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {filteredCities.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg text-left">
                {filteredCities.map((city) => (
                  <div
                    key={city.city}
                    className="p-3 hover:bg-gray-100 cursor-pointer text-gray-800"
                    onClick={() => handleCitySelect(city.city)}
                  >
                    <div className="font-medium">
                      {city.city.charAt(0).toUpperCase() + city.city.slice(1)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {city.country.charAt(0).toUpperCase() + city.country.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* City Selector */}
          <div className="mt-8">
            <CitySelector
              label="Or select a city to explore"
              value={selectedCity}
              onChange={setSelectedCity}
            />
            
            {selectedCity && (
              <div className="mt-4">
                <Link
                  to="/quality-of-life"
                  className="inline-block bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-colors"
                >
                  Explore {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Discover What Makes a City Great
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                <feature.icon className="text-white text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-center text-gray-700 dark:text-gray-300">Loading data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
