import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaMoneyBillWave, FaHeart, FaInfoCircle } from 'react-icons/fa';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: FaHome },
    { path: '/quality-of-life', label: 'Quality of Life', icon: FaHeart },
    { path: '/cost-of-living', label: 'Cost of Living', icon: FaMoneyBillWave },
    { path: '/comparison', label: 'Comparison', icon: FaChartBar },
    { path: '/about', label: 'About', icon: FaInfoCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              CityCompare
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 ${
                  location.pathname === item.path
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mb-16 md:mb-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} CityCompare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
