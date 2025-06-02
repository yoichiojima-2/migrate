import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaMoneyBillWave, FaHeart, FaInfoCircle, FaGlobe } from 'react-icons/fa';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/quality-of-life', label: 'Quality of Life', icon: FaHeart },
    { path: '/cost-of-living', label: 'Cost of Living', icon: FaMoneyBillWave },
    { path: '/comparison', label: 'Comparison', icon: FaChartBar },
    { path: '/rankings', label: 'Rankings', icon: FaGlobe },
    { path: '/about', label: 'About', icon: FaInfoCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-black dark:to-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity duration-300">
              CityCompare
            </Link>
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/25'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow pb-24 md:pb-12 animate-fadeIn">
        {children}
      </main>

      {/* Footer - Hidden on mobile, visible on desktop */}
      <footer className="hidden md:block bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-center text-gray-600 dark:text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} CityCompare. All rights reserved.
            </p>
            <p className="text-center text-gray-500 dark:text-gray-500 text-xs">
              Empowering informed relocation decisions worldwide
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation - Acts as footer on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30'
                    : ''
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1 font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
        {/* Mobile Footer Text */}
        <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-500 text-xs font-medium">
            © {new Date().getFullYear()} CityCompare
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
