/**
 * Airbnb-style data chart component
 */
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ChartProps } from '../../../types';

/**
 * Component for displaying data in a chart with Airbnb-inspired design
 * @param props - Component props
 * @returns React component
 */
const AirbnbDataChart: React.FC<ChartProps> = ({ title, data, referenceKey, comparedKey }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-8">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>
      
      {data.length > 0 ? (
        <div className="p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70
              }}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="feature" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={{ stroke: '#e5e7eb' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={{ stroke: '#e5e7eb' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip 
                formatter={(value) => [Number(value).toFixed(2), '']}
                labelFormatter={(label) => `Feature: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => <span style={{ color: '#4b5563', fontSize: 14 }}>{value}</span>}
              />
              <Bar 
                dataKey={referenceKey} 
                name="Reference City" 
                fill="#f43f5e" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey={comparedKey} 
                name="Compared Cities (Avg)" 
                fill="#3b82f6" 
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
  );
};

export default AirbnbDataChart;
