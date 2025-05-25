/**
 * Visual city cards section component
 */
import React, { useState } from 'react';
import VisualCityCard from './VisualCityCard';
import type { GroupedHappiness, GroupedCost } from '../../../types';

interface VisualCityCardsSectionProps {
  title: string;
  data: GroupedHappiness[] | GroupedCost[];
  type: 'happiness' | 'cost';
  getProgressWidth: (value: number) => string;
}

/**
 * Component for displaying a section of visual city cards with pagination
 * @param props - Component props
 * @returns React component
 */
const VisualCityCardsSection: React.FC<VisualCityCardsSectionProps> = ({ title, data, type, getProgressWidth }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 9; // Show 9 cards per page (3x3 grid)
  
  // Calculate total pages
  const totalPages = Math.ceil(data.length / cardsPerPage);
  
  // Get current page data
  const currentData = data.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of section
    window.scrollTo({
      top: document.getElementById('visual-city-cards-section')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <section id="visual-city-cards-section" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        
        {totalPages > 1 && (
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`px-3 py-1 rounded ${
                currentPage === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              aria-label="Previous page"
            >
              &laquo;
            </button>
            
            <span className="px-3 py-1 bg-white border border-gray-300 rounded">
              {currentPage + 1} / {totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages - 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              aria-label="Next page"
            >
              &raquo;
            </button>
          </div>
        )}
      </div>
      
      {data.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.map((group, index) => (
              <VisualCityCard
                key={index}
                city={group.city}
                country={group.country}
                features={group.features}
                type={type}
                getProgressWidth={getProgressWidth}
              />
            ))}
          </div>
          
          {/* Pagination for mobile */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center md:hidden">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`mx-1 w-8 h-8 rounded-full ${
                    currentPage === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                  aria-label={`Page ${index + 1}`}
                  aria-current={currentPage === index ? 'page' : undefined}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-6 text-gray-500 bg-white rounded-xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No city data available.</p>
        </div>
      )}
    </section>
  );
};

export default VisualCityCardsSection;
