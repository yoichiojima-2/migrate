import React from 'react';
import { Size } from '../types';

interface LoadingSpinnerProps {
  size?: Size;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses: Record<Size, string> = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClass} border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;
