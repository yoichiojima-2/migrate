/**
 * Airbnb-style loading and error state component
 */
import React from 'react';

interface AirbnbLoadingErrorProps {
  loading: boolean;
  error: string | null;
}

/**
 * Component for displaying loading and error states with Airbnb-inspired design
 * @param props - Component props
 * @returns React component
 */
const AirbnbLoadingError: React.FC<AirbnbLoadingErrorProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="my-12">
        <div className="max-w-lg mx-auto">
          {/* Loading skeleton */}
          <div className="animate-pulse space-y-8">
            {/* Skeleton header */}
            <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
            
            {/* Skeleton cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gray-300"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <div className="inline-block h-12 w-12 rounded-full border-4 border-rose-500 border-t-transparent animate-spin"></div>
            <p className="mt-4 text-lg font-medium text-gray-900">Loading city data...</p>
            <p className="mt-2 text-gray-500">This may take a few moments</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-12 max-w-lg mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-red-50 p-4 border-b border-red-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">Error Loading Data</h3>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-700 mb-6">{error}</p>
            
            <div className="flex justify-center">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                onClick={() => window.location.reload()}
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AirbnbLoadingError;
