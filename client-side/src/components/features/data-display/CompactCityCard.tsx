/**
 * Compact city card component
 */
import React, { useState } from 'react';

interface CompactCityCardProps {
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
 * Component for displaying city data in a compact, collapsible card
 * @param props - Component props
 * @returns React component
 */
const CompactCityCard: React.FC<CompactCityCardProps> = ({ city, country, features, type, getProgressWidth }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHappiness = type === 'happiness';
  const borderColor = isHappiness ? '#10b981' : '#ef4444';
  const decorationClass = isHappiness ? 'happiness-decoration' : 'cost-decoration';
  
  // Get top 3 features with the most significant differences
  const sortedFeatures = [...features].sort((a, b) => {
    const aValue = isHappiness ? Math.abs(a.diff || 0) : Math.abs(a.diff_rate || 0);
    const bValue = isHappiness ? Math.abs(b.diff || 0) : Math.abs(b.diff_rate || 0);
    return bValue - aValue;
  });
  
  const topFeatures = sortedFeatures.slice(0, 3);
  
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
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold tracking-tight relative z-10">
          {city} <span className="text-sm text-gray-500">({country})</span>
        </h4>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-expanded={isExpanded}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Always show top 3 features */}
      <ul className="space-y-2 relative z-10">
        {topFeatures.map((feat, i) => {
          const diffValue = isHappiness ? feat.diff : feat.diff_rate;
          const diffUnit = isHappiness ? '' : '%';
          
          return (
            <li key={i} className="border-b border-gray-100 pb-2 last:border-b-0">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-800 truncate max-w-[60%]" title={feat.feature}>
                  {feat.feature}
                </span>
                <span className={diffValue && diffValue >= 0 ? "diff-positive text-green-600 font-semibold" : "diff-negative text-red-600 font-semibold"}>
                  {diffValue}{diffUnit}
                </span>
              </div>
              <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden my-1 shadow-inner">
                <div
                  className={`absolute h-full rounded-full progress-fill ${diffValue && diffValue >= 0 ? "positive" : "negative"}`}
                  style={{ width: getProgressWidth(diffValue || 0) }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
      
      {/* Expandable section for remaining features */}
      {isExpanded && features.length > 3 && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <ul className="space-y-2 relative z-10">
            {sortedFeatures.slice(3).map((feat, i) => {
              const diffValue = isHappiness ? feat.diff : feat.diff_rate;
              const diffUnit = isHappiness ? '' : '%';
              
              return (
                <li key={i} className="border-b border-gray-100 pb-2 last:border-b-0">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-800 truncate max-w-[60%]" title={feat.feature}>
                      {feat.feature}
                    </span>
                    <span className={diffValue && diffValue >= 0 ? "diff-positive text-green-600 font-semibold" : "diff-negative text-red-600 font-semibold"}>
                      {diffValue}{diffUnit}
                    </span>
                  </div>
                  <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden my-1 shadow-inner">
                    <div
                      className={`absolute h-full rounded-full progress-fill ${diffValue && diffValue >= 0 ? "positive" : "negative"}`}
                      style={{ width: getProgressWidth(diffValue || 0) }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      
      {/* Show/hide button for more than 3 features */}
      {features.length > 3 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2 text-xs text-center text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {isExpanded ? 'Show less' : `Show ${features.length - 3} more features`}
        </button>
      )}
    </div>
  );
};

export default CompactCityCard;
