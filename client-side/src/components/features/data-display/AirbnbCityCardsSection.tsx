/**
 * Airbnb-style city cards section component
 */
import React, { useState } from 'react';
import AirbnbCityCard from './AirbnbCityCard';
import type { GroupedHappiness, GroupedCost } from '../../../types';

interface AirbnbCityCardsSectionProps {
  title: string;
  data: GroupedHappiness[] | GroupedCost[];
  type: 'happiness' | 'cost';
  getProgressWidth: (value: number) => string;
}

/**
 * Component for displaying a section of Airbnb-style city cards
 * @param props - Component props
 * @returns React component
 */
const AirbnbCityCardsSection: React.FC<AirbnbCityCardsSectionProps> = ({ title, data, type, getProgressWidth }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Filter options based on data
  const getUniqueCountries = () => {
    const countries = data.map(item => item.country);
    return ['all', ...Array.from(new Set(countries))];
  };
  
  const filters = getUniqueCountries();
  
  // Filter data based on active filter
  const filteredData = activeFilter === 'all' 
    ? data 
    : data.filter(item => item.country === activeFilter);
  
  // Load more function
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredData.length));
  };
  
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1">Compare cities based on {type === 'happiness' ? 'quality of life' : 'cost of living'} metrics</p>
      </div>
      
      {/* Horizontal scrolling filters */}
      <div className="relative mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                setVisibleCount(6); // Reset visible count when filter changes
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {filter === 'all' ? 'All Countries' : filter}
            </button>
          ))}
        </div>
      </div>
      
      {filteredData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.slice(0, visibleCount).map((group, index) => (
              <AirbnbCityCard
                key={index}
                city={group.city}
                country={group.country}
                features={group.features}
                type={type}
                getProgressWidth={getProgressWidth}
              />
            ))}
          </div>
          
          {/* Load more button */}
          {visibleCount < filteredData.length && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center"
              >
                <span>Show more cities</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No cities found</h3>
          <p className="mt-1 text-gray-500">Try changing your filter selection.</p>
          <div className="mt-6">
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors duration-300"
            >
              View all cities
            </button>
          </div>
        </div>
      )}
      
      {/* CSS for hiding scrollbars is in card-styles-airbnb.css */}
    </section>
  );
};

export default AirbnbCityCardsSection;
