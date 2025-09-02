import React, { useState, useEffect } from 'react';
import { useCityContext } from '../context/CityContext';
import CitySelector from '../components/CitySelector';
import FeatureCard from '../components/FeatureCard';
import ComparisonChart from '../components/ComparisonChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaMoneyBillWave, FaHome, FaUtensils, FaBus, FaGraduationCap } from 'react-icons/fa';

const CostOfLivingPage = () => {
  const { 
    selectedCity, 
    setSelectedCity, 
    comparisonCity, 
    setComparisonCity, 
    costOfLivingData, 
    loading,
    error
  } = useCityContext();

  const [categories, setCategories] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chartData, setChartData] = useState(null);

  // Extract unique categories
  useEffect(() => {
    if (costOfLivingData.length > 0) {
      // Get unique features
      const uniqueFeatures = [...new Set(costOfLivingData.map(item => item.feature))];
      setCategories(uniqueFeatures);
    }
  }, [costOfLivingData]);

  // Filter data when category, city, or data changes
  useEffect(() => {
    if (costOfLivingData.length > 0 && selectedCity && categories.length > 0) {
      filterDataByCategory(selectedCategory);
    }
  }, [costOfLivingData, selectedCategory, selectedCity, comparisonCity, categories]);

  // Filter data by category
  const filterDataByCategory = (category) => {
    if (!costOfLivingData.length || !selectedCity) return;

    // Important: The API returns data for all cities EXCEPT the selected city
    // with value_in_current_city being the value for the selected city

    let filtered;
    if (category === 'all') {
      // Create an array to hold all filtered items
      const allFilteredItems = [];
      
      // Process each category
      categories.forEach(feature => {
        // Find all items for this feature
        const items = costOfLivingData.filter(item => item.feature === feature);
        
        // Get unique descriptions for this feature
        const uniqueDescriptions = [...new Set(items.map(item => item.description))];
        
        // Take the first item for each unique feature-description combination
        uniqueDescriptions.forEach(description => {
          const item = items.find(i => i.description === description);
          if (item) {
            allFilteredItems.push({
              feature: item.feature,
              description: item.description,
              city: selectedCity,
              value: item.value_in_current_city
            });
          }
        });
      });
      
      filtered = allFilteredItems;
    } else {
      // Get all items for the selected feature
      const items = costOfLivingData.filter(item => item.feature === category);
      
      // Get unique descriptions for this feature to avoid duplicates
      const uniqueDescriptions = [...new Set(items.map(item => item.description))];
      
      // Create one item per unique description
      filtered = uniqueDescriptions.map(description => {
        // Find the first item with this feature and description
        const item = items.find(i => i.description === description);
        
        if (item) {
          return {
            feature: item.feature,
            description: item.description,
            city: selectedCity,
            value: item.value_in_current_city,
            // Include any other properties needed
          };
        }
        return null;
      }).filter(Boolean);
    }

    console.log(`Filtered ${filtered.length} items for category: ${category}`);
    setFilteredData(filtered);

    // Only prepare chart data if we have filtered data
    if (filtered && filtered.length > 0) {
      prepareChartData(filtered);
    }
  };

  // Prepare data for the chart
  const prepareChartData = (data) => {
    if (!data.length || !selectedCity) return;

    // Use description as labels if available, otherwise use feature
    const labels = data.map(item => item.description || item.feature);
    
    // Data for selected city (which is now in the value field of our filtered data)
    const selectedCityData = data.map(item => item.value);

    // Data for comparison city (if selected)
    const comparisonCityData = comparisonCity ? data.map(item => {
      // Normalize the comparison city for case-insensitive comparison
      const normalizedComparisonCity = comparisonCity.toLowerCase().trim();
      
      // Find the comparison city data in the original costOfLivingData
      // The API returns data where city is the comparison city and value is its value
      const compItem = costOfLivingData.find(
        d => d.city.toLowerCase().trim() === normalizedComparisonCity && 
             d.feature === item.feature && 
             d.description === item.description
      );
      
      // If found, use its value, otherwise use 0
      return compItem ? compItem.value : 0;
    }) : [];

    console.log('Chart data prepared:', {
      selectedCity,
      selectedCityData,
      comparisonCity,
      comparisonCityData
    });

    const datasets = [
      {
        label: selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1),
        data: selectedCityData,
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1
      }
    ];

    if (comparisonCity && comparisonCityData.some(value => value !== 0)) {
      datasets.push({
        label: comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1),
        data: comparisonCityData,
        backgroundColor: 'rgba(20, 184, 166, 0.6)', // Teal (consistent with QualityOfLifePage)
        borderColor: 'rgb(20, 184, 166)',
        borderWidth: 1
      });
    }

    setChartData({ labels, datasets });
  };

  // Get icon for a specific category
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'rent':
        return FaHome;
      case 'eating-out':
        return FaUtensils;
      case 'commute':
      case 'public transportation':
        return FaBus;
      case 'school':
        return FaGraduationCap;
      default:
        return FaMoneyBillWave;
    }
  };

  // Get comparison data for a specific item
  const getComparisonData = (item) => {
    if (!comparisonCity) return null;
    
    // Normalize the comparison city for case-insensitive comparison
    const normalizedComparisonCity = comparisonCity.toLowerCase().trim();
    
    // Find the comparison city data in the original costOfLivingData
    const comparisonData = costOfLivingData.find(
      d => d.city.toLowerCase().trim() === normalizedComparisonCity && 
           d.feature === item.feature && 
           d.description === item.description
    );
    
    if (comparisonData) {
      // Return the comparison data with the correct value
      return {
        ...comparisonData,
        // diff_rate is already calculated by the API
        // value is the value for the comparison city
      };
    }
    
    return null;
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
          Cost of Living Comparison
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


      {selectedCity && costOfLivingData.length > 0 ? (
        <>
          {/* Category Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All Categories
              </button>
              
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          {chartData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {selectedCategory === 'all' 
                  ? 'Cost of Living Overview' 
                  : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Costs`}
              </h2>
              <ComparisonChart
                datasets={chartData.datasets}
                labels={chartData.labels}
                height={400}
                horizontal={true}
              />
            </div>
          )}

          {/* Data Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => {
              const comparisonItem = getComparisonData(item);
              const Icon = getCategoryIcon(item.feature);
              
              return (
                <FeatureCard
                  key={`${item.feature}-${item.description}-${index}`}
                  feature={item.feature}
                  description={item.description}
                  value={item.value}
                  comparisonValue={comparisonItem?.value}
                  diff={comparisonItem?.diff_rate}
                  icon={Icon}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FaMoneyBillWave className="mx-auto text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Select a city to view cost of living data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a city from the dropdown above to see detailed cost of living metrics.
          </p>
        </div>
      )}
    </div>
  );
};

export default CostOfLivingPage;
