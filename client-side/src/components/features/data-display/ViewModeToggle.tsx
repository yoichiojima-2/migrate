/**
 * View mode toggle component
 */
import React from 'react';
import type { ViewMode } from '../../../types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

/**
 * Component for toggling between grouped and individual view modes
 * @param props - Component props
 * @returns React component
 */
const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex justify-center">
      <div 
        className="inline-flex rounded-full overflow-hidden shadow-lg p-1 bg-white/90 backdrop-blur-sm border border-gray-100" 
        role="group"
        aria-label="View mode toggle"
      >
        <button
          type="button"
          onClick={() => setViewMode('grouped')}
          className={`px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 ease-in-out ${
            viewMode === 'grouped' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-105' 
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
          aria-pressed={viewMode === 'grouped'}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Grouped View
          </span>
        </button>
        <button
          type="button"
          onClick={() => setViewMode('individual')}
          className={`px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 ease-in-out ${
            viewMode === 'individual' 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg transform scale-105' 
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
          aria-pressed={viewMode === 'individual'}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Individual Cards
          </span>
        </button>
      </div>
    </div>
  );
};

export default ViewModeToggle;
