import React from 'react';

const DataCard = ({ title, data, description, icon: Icon, className = '' }) => {
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden card-hover ${className}`}>
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/20 dark:to-accent-900/20 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          {Icon && (
            <div className="p-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-xl mr-3">
              <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{description}</p>
        )}
        
        <div className="flex justify-center items-center">
          <div className="text-4xl font-bold gradient-text animate-pulse-slow">
            {typeof data === 'number' ? data.toLocaleString() : data}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
