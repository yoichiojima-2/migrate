import React from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const FeatureCard = ({ 
  feature, 
  value, 
  comparisonValue, 
  diff, 
  diffUnit = "%",
  description, 
  className = '' 
}) => {
  // Determine if the difference is positive, negative, or neutral
  const getDiffIndicator = () => {
    if (!diff || diff === 0) return <FaMinus className="text-gray-400" />;
    return diff > 0 
      ? <FaArrowUp className="text-emerald-500" /> 
      : <FaArrowDown className="text-rose-500" />;
  };

  // Format the diff rate as a percentage
  const formattedDiffRate = diff ? `${Math.abs(diff).toFixed(1)}${diffUnit}` : `0${diffUnit}`;

  // Determine the background color based on the diff rate
  const getBgColor = () => {
    if (!diff || diff === 0) return 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900';
    return diff > 0 
      ? 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20' 
      : 'bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20';
  };

  return (
    <div className={`relative rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden ${getBgColor()} ${className}`}>
      {/* Decorative Element */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 ${
        diff > 0 ? 'bg-emerald-500' : diff < 0 ? 'bg-rose-500' : 'bg-gray-500'
      }"></div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{feature}</h3>
        <div className="flex items-center bg-white/50 dark:bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
          {getDiffIndicator()}
          <span className={`ml-1.5 font-semibold text-sm ${
            diff > 0 ? 'text-emerald-600 dark:text-emerald-400' : 
            diff < 0 ? 'text-rose-600 dark:text-rose-400' : 
            'text-gray-600 dark:text-gray-400'
          }`}>
            {formattedDiffRate}
          </span>
        </div>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{description}</p>
      )}
      
      <div className="flex justify-between mt-4 space-x-4">
        <div className="flex-1 bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-xl p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Current City</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {value?.toLocaleString() || 'N/A'}
          </p>
        </div>
        <div className="flex-1 bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-xl p-3 text-right">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Comparison City</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {comparisonValue?.toLocaleString() || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
