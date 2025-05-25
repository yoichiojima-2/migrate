/**
 * City card component
 */
import React from 'react';

interface CityCardProps {
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
 * Component for displaying city data in a card
 * @param props - Component props
 * @returns React component
 */
const CityCard: React.FC<CityCardProps> = ({ city, country, features, type, getProgressWidth }) => {
  const isHappiness = type === 'happiness';
  const borderColor = isHappiness ? '#10b981' : '#ef4444';
  const decorationClass = isHappiness ? 'happiness-decoration' : 'cost-decoration';
  
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '1.75rem',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        borderLeftWidth: '8px',
        borderLeftColor: borderColor,
        position: 'relative',
        overflow: 'hidden'
      }}
      className={`relative overflow-hidden ${decorationClass}`}
    >
      <h4 className="text-2xl font-extrabold mb-5 text-center tracking-tight relative z-10">
        {city} ({country})
      </h4>
      <ul className="space-y-4 relative z-10">
        {features.map((feat, i) => {
          const diffValue = isHappiness ? feat.diff : feat.diff_rate;
          const diffLabel = isHappiness ? 'Diff' : 'Diff';
          const diffUnit = isHappiness ? '' : '%';
          
          return (
            <li key={i} className="pb-3 border-b border-gray-100 last:border-b-0">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{feat.feature}:</span>
                <span className={diffValue && diffValue >= 0 ? "diff-positive text-green-600 font-semibold" : "diff-negative text-red-600 font-semibold"}>
                  {diffLabel}: {diffValue}{diffUnit}
                </span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden my-2 shadow-inner">
                <div
                  className={`absolute h-full rounded-full progress-fill ${diffValue && diffValue >= 0 ? "positive" : "negative"}`}
                  style={{ width: getProgressWidth(diffValue || 0) }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {feat.value} vs {feat.value_in_current_city}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CityCard;
