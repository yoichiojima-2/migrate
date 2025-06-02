import { useState, useRef, useEffect } from 'react';
import { useCityContext } from '../context/CityContext';
import { FaChevronDown, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const CitySelector = ({ label, value, onChange, excludeCity = null }) => {
  const { cities } = useCityContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Filter out the excluded city if provided
  const filteredCities = excludeCity 
    ? cities.filter(city => city.city !== excludeCity)
    : cities;

  // Filter cities based on search term
  const searchFilteredCities = filteredCities.filter(city =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected city display text
  const selectedCity = filteredCities.find(city => city.city === value);
  const displayText = selectedCity 
    ? `${selectedCity.city.charAt(0).toUpperCase() + selectedCity.city.slice(1)} (${selectedCity.country.charAt(0).toUpperCase() + selectedCity.country.slice(1)})`
    : 'Select a city';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCitySelect = (cityName) => {
    onChange(cityName);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="mb-6" ref={dropdownRef}>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
        {label}
      </label>
      
      {/* Custom Select Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-5 py-4 text-left bg-white dark:bg-gray-800 backdrop-blur-sm border-2 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 ${
            isOpen 
              ? 'border-primary-500 ring-4 ring-primary-500/20 dark:ring-primary-500/30 shadow-glow' 
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl transition-colors duration-300 ${
                value ? 'bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30' : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <FaMapMarkerAlt className={`text-sm ${value ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
              </div>
              <span className={`font-medium ${value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {displayText}
              </span>
            </div>
            <FaChevronDown 
              className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} 
            />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-3 bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-h-80 overflow-hidden animate-slideIn">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  autoFocus
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {searchFilteredCities.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                  No cities found
                </div>
              ) : (
                searchFilteredCities.map((city, index) => (
                  <button
                    key={city.city}
                    type="button"
                    onClick={() => handleCitySelect(city.city)}
                    className={`w-full px-4 py-3.5 text-left hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 dark:hover:from-primary-900/20 dark:hover:to-accent-900/20 transition-all duration-200 flex items-center space-x-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0 ${
                      value === city.city 
                        ? 'bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/30 dark:to-accent-900/30' 
                        : 'text-gray-900 dark:text-white'
                    }`}
                    style={{animationDelay: `${index * 0.03}s`}}
                  >
                    <div className={`p-2 rounded-xl transition-colors duration-300 ${
                      value === city.city 
                        ? 'bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <FaMapMarkerAlt className={`text-sm ${value === city.city ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {city.city.charAt(0).toUpperCase() + city.city.slice(1)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {city.country.charAt(0).toUpperCase() + city.country.slice(1)}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
