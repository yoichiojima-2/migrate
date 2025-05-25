/**
 * Footer component
 */
import React from 'react';

/**
 * Footer component with information about how to interpret the data
 * @returns React component
 */
const Footer: React.FC = () => {
  return (
    <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl shadow-xl border border-gray-100">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 opacity-20 rounded-full -mr-20 -mt-20" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-100 opacity-20 rounded-full -ml-10 -mb-10" aria-hidden="true"></div>
      
      <h3 className="text-3xl font-extrabold mb-8 text-center text-gray-800 relative z-10">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
          How to Interpret the Data
        </span>
      </h3>
      
      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-xl font-bold mb-3 text-blue-800">Grouped View</h4>
          <p className="text-gray-700">
            In the grouped view, metrics are averaged across all compared cities, giving you a broad overview of how your reference city compares to others overall.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-xl font-bold mb-3 text-green-800">Individual Cards</h4>
          <p className="text-gray-700">
            The individual card view shows raw comparisons for each city relative to your reference city, allowing for direct city-to-city comparison.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-xl font-bold mb-3 text-purple-800">Happiness & Quality of Life</h4>
          <p className="text-gray-700">
            For Happiness & Quality of Life metrics, a positive difference (green) means the reference city excels in that category compared to other cities.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow duration-300">
          <h4 className="text-xl font-bold mb-3 text-red-800">Cost of Living</h4>
          <p className="text-gray-700">
            In Cost of Living comparisons, a negative difference (red) indicates better affordability in the reference city compared to others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
