import React, { useState, useEffect } from "react";
import { useCitySelection } from "../context/CitySelectionContext";
import { useData } from "../context/DataContext";
import CitySelector from "../components/CitySelector";
import FeatureCard from "../components/FeatureCard";
import ComparisonChart from "../components/ComparisonChart";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaHeart,
  FaShieldAlt,
  FaLeaf,
  FaHospital,
  FaSmile,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { ChartData } from "chart.js";
import { HappinessQolItem } from "../types";

interface ChartDataState {
  labels: string[];
  datasets: ChartData<"bar">["datasets"];
}

const QualityOfLifePage: React.FC = () => {
  const { selectedCity, setSelectedCity, comparisonCity, setComparisonCity } = useCitySelection();
  const { happinessData } = useData();
  const { loading } = happinessData;

  const [qolCategories, setQolCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<ChartDataState | null>(null);

  // Extract unique quality of life categories
  useEffect(() => {
    if (happinessData.data.length > 0) {
      const categories = [
        ...new Set(happinessData.data.map((item) => item.feature)),
      ];
      setQolCategories(categories);

      // Prepare chart data
      prepareChartData(categories);
    }
  }, [happinessData.data, selectedCity, comparisonCity]);

  // Prepare data for the chart
  const prepareChartData = (categories: string[]) => {
    if (!categories.length || !selectedCity) return;

    const labels = categories;

    // Data for selected city
    // The API returns data where value_in_current_city is the value for the selected city
    const selectedCityData = categories.map((category) => {
      // Get any item for this category to extract the selected city's value
      const item = happinessData.data.find((data) => data.feature === category);
      return item ? item.value_in_current_city : 0;
    });

    // Data for comparison city (if selected)
    const comparisonCityData = comparisonCity
      ? categories.map((category) => {
          const item = happinessData.data.find(
            (data) => data.city === comparisonCity && data.feature === category,
          );
          return item ? item.value : 0;
        })
      : [];

    // Use a color-blind friendly palette for the chart
    // Primary city: Blue (accessible and neutral)
    // Comparison city: Teal (distinct from blue but still neutral)
    const datasets = [
      {
        label: selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1),
        data: selectedCityData,
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Blue
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ];

    if (comparisonCity) {
      datasets.push({
        label: comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1),
        data: comparisonCityData,
        backgroundColor: "rgba(20, 184, 166, 0.6)", // Teal
        borderColor: "rgb(20, 184, 166)",
        borderWidth: 1,
      });
    }

    setChartData({ labels, datasets });
  };

  // Get icon for a specific category
  const getCategoryIcon = (category: string): IconType => {
    switch (category.toLowerCase()) {
      case "safety":
        return FaShieldAlt;
      case "health care":
        return FaHospital;
      case "pollution":
        return FaLeaf;
      case "happiness score":
        return FaSmile;
      default:
        return FaHeart;
    }
  };

  // Get data for a specific category and city
  const getCategoryData = (
    category: string,
    city: string,
  ): HappinessQolItem | null => {
    if (city === selectedCity) {
      // For selected city, get value_in_current_city from any item with this category
      const item = happinessData.data.find((data) => data.feature === category);
      return item
        ? { ...item, city: selectedCity, value: item.value_in_current_city }
        : null;
    } else {
      // For comparison city, find the item directly
      const compItem = happinessData.data.find(
        (data) => data.city === city && data.feature === category,
      );

      if (compItem) {
        // The API calculates diff and diff_rate, but the diff_rate needs to be adjusted
        // It seems the API returns diff_rate as a decimal between -1 and 1
        // We need to multiply by 100 to get the percentage and invert it
        // because we want to show how the comparison city compares to the selected city

        // Calculate the correct diff_rate
        const selectedValue = compItem.value_in_current_city;
        const comparisonValue = compItem.value;

        if (selectedValue && comparisonValue) {
          // Calculate the percentage difference
          const diff = comparisonValue - selectedValue;

          return {
            ...compItem,
            diff: parseFloat(diff.toString()),
          };
        }

        return compItem;
      }

      return null;
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
          Quality of Life Comparison
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

      {selectedCity && happinessData.data.length > 0 ? (
        <>
          {/* Chart Section */}
          {chartData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Quality of Life Metrics Comparison
              </h2>
              <ComparisonChart
                datasets={chartData.datasets}
                labels={chartData.labels}
                height={400}
                horizontal={true}
              />
            </div>
          )}

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qolCategories.map((category) => {
              const selectedCityData = getCategoryData(category, selectedCity);
              const comparisonCityData = comparisonCity
                ? getCategoryData(category, comparisonCity)
                : null;

              if (!selectedCityData) return null;

              const Icon = getCategoryIcon(category);

              return (
                <FeatureCard
                  key={category}
                  feature={category}
                  value={selectedCityData.value}
                  comparisonValue={comparisonCityData?.value}
                  diff={comparisonCityData?.diff}
                  diffUnit="pt"
                  icon={Icon}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FaHeart className="mx-auto text-4xl text-indigo-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Select a city to view quality of life data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a city from the dropdown above to see detailed quality of
            life metrics.
          </p>
        </div>
      )}
    </div>
  );
};

export default QualityOfLifePage;
