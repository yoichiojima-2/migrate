/**
 * Visual city card component with bar charts
 */
import React from 'react';

interface VisualCityCardProps {
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
 * Component for displaying city data in a compact visual card with bar charts
 * @param props - Component props
 * @returns React component
 */
const VisualCityCard: React.FC<VisualCityCardProps> = ({ city, country, features, type, getProgressWidth }) => {
  const isHappiness = type === 'happiness';
  const borderColor = isHappiness ? '#10b981' : '#ef4444';
  const decorationClass = isHappiness ? 'happiness-decoration' : 'cost-decoration';
  
  // Get top features with the most significant differences
  const sortedFeatures = [...features].sort((a, b) => {
    const aValue = isHappiness ? Math.abs(a.diff || 0) : Math.abs(a.diff_rate || 0);
    const bValue = isHappiness ? Math.abs(b.diff || 0) : Math.abs(b.diff_rate || 0);
    return bValue - aValue;
  });
  
  // Get max absolute difference for scaling
  const maxDiff = sortedFeatures.reduce((max, feat) => {
    const diffValue = isHappiness ? Math.abs(feat.diff || 0) : Math.abs(feat.diff_rate || 0);
    return Math.max(max, diffValue);
  }, 0);
  
  // Calculate bar width as percentage of max difference
  const getBarWidth = (value: number): string => {
    if (maxDiff === 0) return '0%';
    const percentage = (Math.abs(value) / maxDiff) * 100;
    return `${Math.min(percentage, 100)}%`;
  };
  
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderLeftWidth: '4px',
        borderLeftColor: borderColor,
        position: 'relative',
        overflow: 'hidden'
      }}
      className={`relative overflow-hidden ${decorationClass}`}
    >
      <h4 className="text-lg font-bold tracking-tight relative z-10 mb-3">
        {city} <span className="text-sm text-gray-500">({country})</span>
      </h4>
      
      <div className="space-y-1 relative z-10">
        {sortedFeatures.slice(0, 5).map((feat, i) => {
          const diffValue = isHappiness ? feat.diff : feat.diff_rate;
          const diffUnit = isHappiness ? '' : '%';
          const isPositive = diffValue && diffValue >= 0;
          
          return (
            <div key={i} className="relative h-6 flex items-center">
              {/* Feature name (truncated with tooltip) */}
              <div className="w-1/3 pr-2">
                <span 
                  className="text-xs font-medium text-gray-700 truncate block" 
                  title={feat.feature}
                >
                  {feat.feature.length > 15 ? `${feat.feature.substring(0, 15)}...` : feat.feature}
                </span>
              </div>
              
              {/* Bar chart */}
              <div className="w-2/3 relative h-4">
                {/* Center line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2"></div>
                
                {/* Bar */}
                <div 
                  className={`absolute top-0 h-full ${isPositive ? 'right-1/2' : 'left-1/2'} ${isPositive ? 'bg-green-500' : 'bg-red-500'} rounded-sm`}
                  style={{ 
                    width: getBarWidth(diffValue || 0),
                    maxWidth: '50%'
                  }}
                ></div>
                
                {/* Value label */}
                <div 
                  className={`absolute top-1/2 transform -translate-y-1/2 text-xs font-semibold ${
                    isPositive ? 'left-1/2 ml-1 text-green-700' : 'right-1/2 mr-1 text-red-700'
                  }`}
                >
                  {isPositive ? '+' : ''}{diffValue}{diffUnit}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary at the bottom */}
      <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
        <span>Top {Math.min(5, sortedFeatures.length)} features shown</span>
        <span>{isHappiness ? 'Higher is better' : 'Lower is better'}</span>
      </div>
    </div>
  );
};

export default VisualCityCard;
