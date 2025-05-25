/**
 * Airbnb-style view mode toggle component
 */
import React from 'react';
import type { ViewMode } from '../../../types';

interface AirbnbViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

/**
 * Component for toggling between grouped and individual view modes with Airbnb-style design
 * @param props - Component props
 * @returns React component
 */
const AirbnbViewModeToggle: React.FC<AirbnbViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">View Options</h2>
      
      <div className="inline-flex bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setViewMode('grouped')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            viewMode === 'grouped' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-pressed={viewMode === 'grouped'}
        >
          <span className="flex items-center">
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Aggregated View
          </span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('individual')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            viewMode === 'individual' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-pressed={viewMode === 'individual'}
        >
          <span className="flex items-center">
            <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            City Cards
          </span>
        </button>
      </div>
    </div>
  );
};

export default AirbnbViewModeToggle;
