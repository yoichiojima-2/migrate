/**
 * Data table component
 */
import React from 'react';
import type { TableProps } from '../../../types';

/**
 * Component for displaying tabular data
 * @param props - Component props
 * @returns React component
 */
const DataTable: React.FC<TableProps> = ({ title, headers, data }) => {
  // Helper function to determine if a value is positive or negative
  const getValueClass = (value: string | number): string => {
    if (typeof value === 'number') {
      return value >= 0 ? 'text-green-600' : 'text-red-600';
    }
    
    // Try to parse string as number
    const numValue = parseFloat(String(value));
    if (!isNaN(numValue)) {
      return numValue >= 0 ? 'text-green-600' : 'text-red-600';
    }
    
    return '';
  };
  
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th 
                      key={index} 
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        index === 0 ? 'sticky left-0 bg-white z-10' : ''
                      }`}
                      scope="col"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    {headers.map((header, colIndex) => {
                      const cellValue = row[header];
                      const isFirstColumn = colIndex === 0;
                      const isNumericColumn = colIndex > 0;
                      
                      return (
                        <td 
                          key={colIndex} 
                          className={`px-6 py-4 whitespace-nowrap ${
                            isFirstColumn 
                              ? 'sticky left-0 font-medium text-gray-900 bg-inherit z-10' 
                              : isNumericColumn 
                                ? 'text-right ' + getValueClass(cellValue)
                                : ''
                          }`}
                        >
                          {isNumericColumn && typeof cellValue === 'number' ? (
                            <span className="font-semibold">
                              {cellValue >= 0 ? '+' : ''}{cellValue}
                            </span>
                          ) : (
                            cellValue
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">No data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
