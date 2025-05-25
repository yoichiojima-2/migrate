/**
 * City selector component
 */
import React, { useState } from 'react';
import type { CitySelectorProps } from '../../../types';

/**
 * City selector component for selecting a reference city
 * @param props - Component props
 * @returns React component
 */
const CitySelector: React.FC<CitySelectorProps> = ({ cities, selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find the currently selected city object
  const currentCity = cities.find(c => c.city === selectedCity) || { city: '', country: '' };
  
  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          REFERENCE CITY
        </label>
        
        {/* Custom dropdown button */}
        <button
          type="button"
          className="w-full bg-white border border-gray-300 rounded-md shadow-sm px-4 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
              {currentCity.city ? currentCity.city.charAt(0).toUpperCase() : ''}
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{currentCity.city}</div>
              <div className="text-sm text-gray-500">{currentCity.country}</div>
            </div>
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
        </button>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div 
            className="absolute z-10 mt-1 w-full max-w-md bg-white shadow-lg rounded-md max-h-60 overflow-auto"
            role="listbox"
            aria-labelledby="city-selector"
          >
            <ul className="py-1">
              {cities.map((item, index) => (
                <li 
                  key={index}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    item.city === selectedCity ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    onCityChange(item.city);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={item.city === selectedCity}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                      item.city === selectedCity ? 'bg-blue-600' : 'bg-gray-400'
                    }`}>
                      {item.city.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{item.city}</div>
                      <div className="text-xs text-gray-500">{item.country}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Hidden select for accessibility */}
        <select
          id="city-select"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="sr-only"
          aria-hidden="true"
        >
          {cities.map((item, index) => (
            <option key={index} value={item.city}>
              {item.city} ({item.country})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CitySelector;
