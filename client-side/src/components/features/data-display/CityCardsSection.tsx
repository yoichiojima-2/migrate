/**
 * City cards section component
 */
import React from 'react';
import CityCard from './CityCard';
import type { GroupedHappiness, GroupedCost } from '../../../types';

interface CityCardsSectionProps {
  title: string;
  data: GroupedHappiness[] | GroupedCost[];
  type: 'happiness' | 'cost';
  getProgressWidth: (value: number) => string;
}

/**
 * Component for displaying a section of city cards
 * @param props - Component props
 * @returns React component
 */
const CityCardsSection: React.FC<CityCardsSectionProps> = ({ title, data, type, getProgressWidth }) => {
  return (
    <section className="mb-8">
      <h3 className="text-3xl font-bold mb-6 text-center">{title}</h3>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((group, index) => (
            <CityCard
              key={index}
              city={group.city}
              country={group.country}
              features={group.features}
              type={type}
              getProgressWidth={getProgressWidth}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">No city data available.</p>
        </div>
      )}
    </section>
  );
};

export default CityCardsSection;
