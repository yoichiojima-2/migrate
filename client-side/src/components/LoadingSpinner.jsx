import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="relative">
        <div className={`${sizeClass} border-4 border-gray-200 dark:border-gray-700 rounded-full`}></div>
        <div className={`absolute top-0 left-0 ${sizeClass} border-4 border-transparent border-t-primary-500 border-r-accent-500 rounded-full animate-spin`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-pulse`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
