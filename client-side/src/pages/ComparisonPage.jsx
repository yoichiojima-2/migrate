import React, { useState, useEffect } from 'react';
import { useCityContext } from '../context/CityContext';
import CitySelector from '../components/CitySelector';
import DataCard from '../components/DataCard';
import ComparisonChart from '../components/ComparisonChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaChartBar, FaMoneyBillWave, FaHeart, FaHome, FaUtensils } from 'react-icons/fa';

const ComparisonPage = () => {
  const { 
    selectedCity, 
    setSelectedCity, 
    comparisonCity, 
    setComparisonCity, 
    happinessQolData, 
    costOfLivingData, 
    loading 
  } = useCityContext();

  const [qolSummary, setQolSummary] = useState({});
  const [colSummary, setColSummary] = useState({});
  const [chartData, setChartData] = useState(null);

  // Prepare summary data when cities or data changes
  useEffect(() => {
    if (selectedCity && (happinessQolData.length > 0 || costOfLivingData.length > 0)) {
      prepareQolSummary();
      prepareColSummary();
      prepareChartData();
    }
  }, [selectedCity, comparisonCity, happinessQolData, costOfLivingData]);

  // Prepare quality of life summary
  const prepareQolSummary = () => {
    if (!happinessQolData.length) return;

    const selectedCityData = {};
    const comparisonCityData = {};

    // Key metrics to highlight
    const keyMetrics = ['Happiness Score', 'Quality of Life', 'Safety', 'Health Care'];

    // Get data for selected city
    // For the selected city, we need to use value_in_current_city
    keyMetrics.forEach(metric => {
      // Find any item with this feature to get the selected city's value
      const data = happinessQolData.find(item => item.feature === metric);
      if (data) {
        selectedCityData[metric] = data.value_in_current_city;
      }
    });

    // Get data for comparison city
    if (comparisonCity) {
      keyMetrics.forEach(metric => {
        const data = happinessQolData.find(
          item => item.city === comparisonCity && item.feature === metric
        );
        if (data) {
          comparisonCityData[metric] = data.value;
        }
      });
    }

    setQolSummary({
      selectedCity: selectedCityData,
      comparisonCity: comparisonCityData
    });
  };

  // Prepare cost of living summary
  const prepareColSummary = () => {
    if (!costOfLivingData.length) return;

    const selectedCityData = {};
    const comparisonCityData = {};

    // Key metrics to highlight
    const keyMetrics = [
      { feature: 'rent', description: '1 bedroom, in city centre' },
      { feature: 'salary', description: 'monthly' },
      { feature: 'eating-out', description: 'for 2 people, mid-range' }
    ];

    // Get data for selected city
    // For the selected city, we need to use value_in_current_city
    keyMetrics.forEach(metric => {
      // Find any item with this feature and description to get the selected city's value
      const data = costOfLivingData.find(
        item => item.feature === metric.feature && 
               item.description === metric.description
      );
      if (data) {
        selectedCityData[`${metric.feature} (${metric.description})`] = data.value_in_current_city;
      }
    });

    // Get data for comparison city
    if (comparisonCity) {
      keyMetrics.forEach(metric => {
        const data = costOfLivingData.find(
          item => item.city === comparisonCity && 
                 item.feature === metric.feature && 
                 item.description === metric.description
        );
        if (data) {
          comparisonCityData[`${metric.feature} (${metric.description})`] = data.value;
        }
      });
    }

    setColSummary({
      selectedCity: selectedCityData,
      comparisonCity: comparisonCityData
    });
  };

  // Prepare data for the radar chart
  const prepareChartData = () => {
    if (!happinessQolData.length) return;

    // Key metrics for radar chart
    const metrics = [
      'Happiness Score', 
      'Quality of Life', 
      'Safety', 
      'Cost of Living', 
      'Purchasing Power',
      'Health Care',
      'Climate'
    ];

    const labels = metrics;
    
    // Data for selected city
    // For the selected city, we need to use value_in_current_city
    const selectedCityData = metrics.map(metric => {
      // Find any item with this feature to get the selected city's value
      const item = happinessQolData.find(data => data.feature === metric);
      // Normalize values to be positive for better visualization
      return item ? (item.value_in_current_city + 3) : 0;
    });

    // Data for comparison city (if selected)
    const comparisonCityData = comparisonCity ? metrics.map(metric => {
      const item = happinessQolData.find(
        data => data.city === comparisonCity && data.feature === metric
      );
      // Normalize values to be positive for better visualization
      return item ? (item.value + 3) : 0;
    }) : [];

    const datasets = [
      {
        label: selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1),
        data: selectedCityData,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)'
      }
    ];

    if (comparisonCity) {
      datasets.push({
        label: comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1),
        data: comparisonCityData,
        backgroundColor: 'rgba(20, 184, 166, 0.2)', // Teal (consistent with other pages)
        borderColor: 'rgb(20, 184, 166)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(20, 184, 166)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(20, 184, 166)'
      });
    }

    setChartData({ labels, datasets });
  };

  // Get icon for a specific metric
  const getMetricIcon = (metric) => {
    if (metric.toLowerCase().includes('happiness') || metric.toLowerCase().includes('quality')) {
      return FaHeart;
    } else if (metric.toLowerCase().includes('rent') || metric.toLowerCase().includes('apartment')) {
      return FaHome;
    } else if (metric.toLowerCase().includes('eating') || metric.toLowerCase().includes('food')) {
      return FaUtensils;
    } else if (metric.toLowerCase().includes('cost') || metric.toLowerCase().includes('salary')) {
      return FaMoneyBillWave;
    } else {
      return FaChartBar;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          City Comparison Dashboard
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <CitySelector
            label="Select your base city"
            value={selectedCity}
            onChange={setSelectedCity}
          />
          
          <CitySelector
            label="Select a city to compare with (optional)"
            value={comparisonCity}
            onChange={setComparisonCity}
            excludeCity={selectedCity}
          />
        </div>
      </div>

      {selectedCity && (happinessQolData.length > 0 || costOfLivingData.length > 0) ? (
        <>
          {/* City Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Selected City */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Quality of Life</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(qolSummary.selectedCity || {}).map(([metric, value]) => (
                    <DataCard
                      key={metric}
                      title={metric}
                      data={value.toFixed(1)}
                      icon={getMetricIcon(metric)}
                      className="bg-indigo-50 dark:bg-indigo-900/20"
                    />
                  ))}
                </div>
                
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-6">Cost of Living</h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(colSummary.selectedCity || {}).map(([metric, value]) => (
                    <DataCard
                      key={metric}
                      title={metric}
                      data={value.toLocaleString()}
                      icon={getMetricIcon(metric)}
                      className="bg-green-50 dark:bg-green-900/20"
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Comparison City (if selected) */}
            {comparisonCity && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1)}
                </h2>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Quality of Life</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(qolSummary.comparisonCity || {}).map(([metric, value]) => (
                      <DataCard
                        key={metric}
                        title={metric}
                        data={value.toFixed(1)}
                        icon={getMetricIcon(metric)}
                        className="bg-red-50 dark:bg-red-900/20"
                      />
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mt-6">Cost of Living</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(colSummary.comparisonCity || {}).map(([metric, value]) => (
                      <DataCard
                        key={metric}
                        title={metric}
                        data={value.toLocaleString()}
                        icon={getMetricIcon(metric)}
                        className="bg-red-50 dark:bg-red-900/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Radar Chart Comparison */}
          {chartData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                City Metrics Comparison
              </h2>
              <div className="h-96">
                <ComparisonChart
                  datasets={chartData.datasets}
                  labels={chartData.labels}
                  height={400}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
                Higher values indicate better performance in each category
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FaChartBar className="mx-auto text-4xl text-indigo-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Select a city to view comparison data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a city from the dropdown above to see detailed comparison metrics.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonPage;
