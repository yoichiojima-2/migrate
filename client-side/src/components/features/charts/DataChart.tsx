/**
 * Data chart component
 */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartProps } from '../../../types';

/**
 * Component for displaying data in a chart
 * @param props - Component props
 * @returns React component
 */
const DataChart: React.FC<ChartProps> = ({ title, data, referenceKey, comparedKey }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-10 overflow-hidden border border-gray-100">
      <div className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 opacity-20 rounded-full -mr-16 -mt-16"></div>
        
        <h3 className="text-2xl font-bold mb-6 text-center relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
            {title}
          </span>
        </h3>
        
        {data.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="feature" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [Number(value).toFixed(2), '']}
                  labelFormatter={(label) => `Feature: ${label}`}
                />
                <Legend />
                <Bar 
                  dataKey={referenceKey} 
                  name="Reference City" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey={comparedKey} 
                  name="Compared Cities (Avg)" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-lg">No data available for chart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataChart;
