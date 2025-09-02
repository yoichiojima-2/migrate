import React from 'react';

const DataCard = ({ title, data, description, icon: Icon, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      )}
      
      <div className="flex justify-center items-center">
        <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
          {typeof data === 'number' ? data.toLocaleString() : data}
        </div>
      </div>
    </div>
  );
};

export default DataCard;
