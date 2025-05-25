/**
 * Airbnb-style header component
 */
import React from 'react';

interface AirbnbHeaderProps {
  title: string;
  subtitle: string;
}

/**
 * Header component for the application with Airbnb-inspired design
 * @param props - Component props
 * @returns React component
 */
const AirbnbHeader: React.FC<AirbnbHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Top navigation bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-auto text-rose-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z" />
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-900">CityCompare</span>
            </div>
            
            {/* Navigation links */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Explore
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Compare
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
            </nav>
            
            {/* User menu */}
            <div className="flex items-center">
              <button className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero section */}
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{title}</span>
              <span className="block text-rose-500 mt-3 text-3xl sm:text-4xl">Find your perfect city</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              {subtitle}
            </p>
          </div>
          
          {/* Search bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="flex shadow-lg rounded-full overflow-hidden">
              <input
                type="text"
                className="flex-1 px-6 py-4 text-gray-700 focus:outline-none"
                placeholder="Search for a city..."
              />
              <button className="bg-rose-500 text-white px-6 py-4 hover:bg-rose-600 focus:outline-none">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirbnbHeader;
