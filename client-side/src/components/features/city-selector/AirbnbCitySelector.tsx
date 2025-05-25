/**
 * Airbnb-style city selector component
 */
import React, { useState, useRef, useEffect } from 'react';
import type { CitySelectorProps } from '../../../types';

/**
 * City selector component with Airbnb-inspired design
 * @param props - Component props
 * @returns React component
 */
const AirbnbCitySelector: React.FC<CitySelectorProps> = ({ cities, selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Find the currently selected city object
  const currentCity = cities.find(c => c.city === selectedCity) || { city: '', country: '' };
  
  // Filter cities based on search term
  const filteredCities = searchTerm.trim() === '' 
    ? cities 
    : cities.filter(c => 
        c.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Reference City
      </label>
      
      {/* Search input that also acts as dropdown trigger */}
      <div className="relative">
        <div 
          className="w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            {currentCity.city ? (
              <>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                  {currentCity.city.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-base font-medium text-gray-800">{currentCity.city}</div>
                  <div className="text-sm text-gray-500">{currentCity.country}</div>
                </div>
              </>
            ) : (
              <div className="text-gray-500">Select a city</div>
            )}
            <div className="ml-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg max-h-96 overflow-auto border border-gray-200">
            {/* Search box */}
            <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            {/* City list */}
            <ul className="py-1">
              {filteredCities.length > 0 ? (
                filteredCities.map((item, index) => (
                  <li 
                    key={index}
                    className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                      item.city === selectedCity ? 'bg-rose-50' : ''
                    }`}
                    onClick={() => {
                      onCityChange(item.city);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                        item.city === selectedCity ? 'bg-rose-500' : 'bg-gray-400'
                      }`}>
                        {item.city.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{item.city}</div>
                        <div className="text-xs text-gray-500">{item.country}</div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-6 text-center text-gray-500">
                  No cities found matching "{searchTerm}"
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AirbnbCitySelector;
