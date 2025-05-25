/**
 * Airbnb-style city card component
 */
import React, { useState } from 'react';

interface AirbnbCityCardProps {
  city: string;
  country: string;
  features: Array<{
    feature: string;
    value: number;
    value_in_current_city: number;
    diff?: number;
    diff_rate?: number;
  }>;
  type: 'happiness' | 'cost';
  getProgressWidth: (value: number) => string;
}

/**
 * Component for displaying city data in an Airbnb-style card
 * @param props - Component props
 * @returns React component
 */
const AirbnbCityCard: React.FC<AirbnbCityCardProps> = ({ city, country, features, type, getProgressWidth }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isHappiness = type === 'happiness';
  
  // Get top features with the most significant differences
  const sortedFeatures = [...features].sort((a, b) => {
    const aValue = isHappiness ? Math.abs(a.diff || 0) : Math.abs(a.diff_rate || 0);
    const bValue = isHappiness ? Math.abs(b.diff || 0) : Math.abs(b.diff_rate || 0);
    return bValue - aValue;
  });
  
  // Calculate average score
  const avgScore = sortedFeatures.reduce((sum, feat) => {
    const value = isHappiness ? feat.diff || 0 : -(feat.diff_rate || 0);
    return sum + value;
  }, 0) / (sortedFeatures.length || 1);
  
  // Normalize score to 0-5 range for display
  const normalizedScore = Math.max(0, Math.min(5, (avgScore + 100) / 40));
  
  // Format score for display with one decimal place
  const displayScore = normalizedScore.toFixed(1);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card header with city image */}
      <div 
        className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"
        style={{
          backgroundImage: `url("https://source.unsplash.com/featured/?${city},skyline")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="text-xl font-bold text-white">{city}</h3>
          <p className="text-white text-opacity-90">{country}</p>
        </div>
        
        {/* Score badge */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md px-3 py-2 flex items-center">
          <div className="flex mr-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`w-4 h-4 ${star <= Math.round(normalizedScore) ? 'text-rose-500' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-bold text-gray-800">{displayScore}</span>
        </div>
      </div>
      
      {/* Card content */}
      <div className="p-4">
        {/* Top 3 features */}
        <div className="space-y-3">
          {sortedFeatures.slice(0, 3).map((feat, i) => {
            const diffValue = isHappiness ? feat.diff : feat.diff_rate;
            const diffUnit = isHappiness ? '' : '%';
            const isPositive = diffValue && diffValue >= 0;
            const textColorClass = isPositive ? 'text-green-600' : 'text-rose-600';
            
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate max-w-[70%]" title={feat.feature}>
                  {feat.feature}
                </span>
                <span className={`text-sm font-semibold ${textColorClass}`}>
                  {isPositive ? '+' : ''}{diffValue}{diffUnit}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Show more/less button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 w-full text-sm text-rose-600 hover:text-rose-800 font-medium focus:outline-none"
        >
          {showDetails ? 'Show less' : 'Show more details'}
        </button>
        
        {/* Expanded details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-3">
              {sortedFeatures.slice(3).map((feat, i) => {
                const diffValue = isHappiness ? feat.diff : feat.diff_rate;
                const diffUnit = isHappiness ? '' : '%';
                const isPositive = diffValue && diffValue >= 0;
                const textColorClass = isPositive ? 'text-green-600' : 'text-rose-600';
                
                return (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 truncate max-w-[70%]" title={feat.feature}>
                      {feat.feature}
                    </span>
                    <span className={`text-sm font-semibold ${textColorClass}`}>
                      {isPositive ? '+' : ''}{diffValue}{diffUnit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      {/* Card footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {isHappiness ? 'Quality of Life' : 'Cost of Living'}
        </span>
        <button className="px-4 py-1 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors duration-300">
          Compare
        </button>
      </div>
    </div>
  );
};

export default AirbnbCityCard;
