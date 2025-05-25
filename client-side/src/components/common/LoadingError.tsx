/**
 * Loading and error state component
 */
import React from 'react';

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
}

/**
 * Component for displaying loading and error states
 * @param props - Component props
 * @returns React component
 */
const LoadingError: React.FC<LoadingErrorProps> = ({ loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-blue-400 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-blue-400 rounded w-32 mb-2"></div>
          <div className="h-3 bg-blue-300 rounded w-24"></div>
          <p className="text-center text-2xl mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md my-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <div className="mt-2 text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => window.location.reload()}
              >
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

export default LoadingError;
