import React, { useState, useEffect } from "react";
import { useCityContext } from "../context/CityContext";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaChevronDown,
  FaChevronUp,
  FaGlobe,
} from "react-icons/fa";

interface CityRanking {
  city: string;
  country: string;
  value: number;
  rank?: number;
}

type DataType = "happiness" | "cost";
type SortOrder = "asc" | "desc";

const CountryRankingsPage: React.FC = () => {
  const { cities, happinessQolData, costOfLivingData, loading } =
    useCityContext();
  const [selectedMetric, setSelectedMetric] = useState<string>("");
  const [rankings, setRankings] = useState<CityRanking[]>([]);
  const [availableMetrics, setAvailableMetrics] = useState<string[]>([]);
  const [dataType, setDataType] = useState<DataType>("happiness");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Extract available metrics when data changes
  useEffect(() => {
    const metrics = [];

    if (dataType === "happiness" && happinessQolData.length > 0) {
      const uniqueFeatures = [
        ...new Set(happinessQolData.map((item) => item.feature)),
      ];
      metrics.push(...uniqueFeatures);
    } else if (dataType === "cost" && costOfLivingData.length > 0) {
      const uniqueFeatures = [
        ...new Set(costOfLivingData.map((item) => item.feature)),
      ];
      metrics.push(...uniqueFeatures);
    }

    setAvailableMetrics(metrics);

    // Set default metric if none selected
    if (metrics.length > 0 && !selectedMetric) {
      setSelectedMetric(metrics[0]);
    }
  }, [dataType, happinessQolData, costOfLivingData, selectedMetric]);

  // Calculate city rankings when metric or data changes
  useEffect(() => {
    if (selectedMetric && cities.length > 0) {
      calculateCityRankings();
    }
  }, [
    selectedMetric,
    dataType,
    sortOrder,
    cities,
    happinessQolData,
    costOfLivingData,
  ]);

  const calculateCityRankings = () => {
    const dataSource =
      dataType === "happiness" ? happinessQolData : costOfLivingData;
    const cityRankings: CityRanking[] = [];

    // Get data for each city
    cities.forEach((cityInfo) => {
      const city = cityInfo.city;
      const country = cityInfo.country;

      // Find data for this city and metric
      let cityValue = null;

      if (dataType === "happiness") {
        // For happiness data, we need to handle two cases:
        // 1. This city appears as a comparison city (use dataPoint.value)
        // 2. This city might be the "current city" (use value_in_current_city)

        // First, check if this city appears as a comparison city
        const comparisonDataPoint = dataSource.find(
          (item) => item.feature === selectedMetric && item.city === city,
        );

        if (comparisonDataPoint) {
          cityValue = comparisonDataPoint.value;
        } else {
          // If not found as comparison city, we need to check if any data point
          // could represent this city as the "current city"
          // Since we can't definitively know which city value_in_current_city refers to
          // from the API response alone, we'll need to make an assumption
          // or modify the API to include the current city name

          // For now, let's try to infer from the data structure
          // If there's only one unique value_in_current_city for this metric,
          // and this city doesn't appear as a comparison city anywhere,
          // it might be the current city
          const dataPointsForMetric = dataSource.filter(
            (item) => item.feature === selectedMetric,
          );
          const uniqueCurrentCityValues = [
            ...new Set(
              dataPointsForMetric.map((item) => item.value_in_current_city),
            ),
          ];

          if (
            uniqueCurrentCityValues.length === 1 &&
            uniqueCurrentCityValues[0] !== null
          ) {
            // Check if this city appears as a comparison city for this metric
            const appearsAsComparison = dataPointsForMetric.some(
              (item) => item.city === city,
            );

            if (!appearsAsComparison) {
              // This city might be the current city
              cityValue = uniqueCurrentCityValues[0];
            }
          }
        }
      } else {
        // For cost of living data, handle similarly
        const comparisonDataPoint = dataSource.find(
          (item) => item.feature === selectedMetric && item.city === city,
        );

        if (comparisonDataPoint) {
          cityValue = comparisonDataPoint.value;
        } else {
          // Similar logic for cost of living data
          const dataPointsForMetric = dataSource.filter(
            (item) => item.feature === selectedMetric,
          );
          const uniqueCurrentCityValues = [
            ...new Set(
              dataPointsForMetric.map((item) => item.value_in_current_city),
            ),
          ];

          if (
            uniqueCurrentCityValues.length === 1 &&
            uniqueCurrentCityValues[0] !== null
          ) {
            const appearsAsComparison = dataPointsForMetric.some(
              (item) => item.city === city,
            );

            if (!appearsAsComparison) {
              cityValue = uniqueCurrentCityValues[0];
            }
          }
        }
      }

      if (cityValue !== null && !isNaN(cityValue)) {
        cityRankings.push({
          city,
          country,
          value: cityValue,
        });
      }
    });

    // Sort cities by their values
    cityRankings.sort((a, b) => {
      if (sortOrder === "desc") {
        return b.value - a.value;
      } else {
        return a.value - b.value;
      }
    });

    setRankings(cityRankings);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="text-yellow-500 text-xl" />;
      case 2:
        return <FaMedal className="text-gray-400 text-xl" />;
      case 3:
        return <FaAward className="text-amber-600 text-xl" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
            #{rank}
          </span>
        );
    }
  };

  const getMetricDescription = (metric: string) => {
    // Add descriptions for better UX
    const descriptions: { [key: string]: string } = {
      "Happiness Score": "Overall happiness and life satisfaction",
      "Quality of Life": "General quality of life index",
      Safety: "Safety and security levels",
      "Health Care": "Healthcare quality and accessibility",
      "Cost of Living": "Overall cost of living index",
      Pollution: "Environmental pollution levels",
      Climate: "Climate and weather conditions",
      rent: "Average rental costs",
      salary: "Average salary levels",
      "eating-out": "Restaurant and dining costs",
      commute: "Transportation and commuting costs",
    };

    return descriptions[metric] || metric;
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
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
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          City Rankings
        </h1>

        {/* Data Category Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button
              onClick={() => {
                setDataType("happiness");
                setSelectedMetric(""); // Reset metric when changing data type
              }}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                dataType === "happiness"
                  ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Quality of Life
            </button>
            <button
              onClick={() => {
                setDataType("cost");
                setSelectedMetric(""); // Reset metric when changing data type
              }}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                dataType === "cost"
                  ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Cost of Living
            </button>
          </div>
        </div>

        {/* Metrics Selection */}
        {availableMetrics.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Select Metric to Rank By:
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableMetrics.map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedMetric === metric
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort Order */}
        {selectedMetric && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Sort Order:
            </span>
            <button
              onClick={toggleSortOrder}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center space-x-2 transition-colors"
            >
              <span>
                {sortOrder === "desc"
                  ? "Highest to Lowest"
                  : "Lowest to Highest"}
              </span>
              {sortOrder === "desc" ? <FaChevronDown /> : <FaChevronUp />}
            </button>
          </div>
        )}

        {selectedMetric && (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              <strong>Showing rankings for:</strong>{" "}
              {getMetricDescription(selectedMetric)}
            </p>
          </div>
        )}
      </div>

      {/* Rankings */}
      {selectedMetric && rankings.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}{" "}
              Rankings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Ranking {rankings.length} cities
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-600">
            {rankings.map((ranking, index) => (
              <div
                key={`${ranking.city}-${ranking.country}`}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 flex justify-center">
                      {getRankIcon(index + 1)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {ranking.city.charAt(0).toUpperCase() +
                          ranking.city.slice(1)}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ranking.country.charAt(0).toUpperCase() +
                          ranking.country.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {dataType === "cost"
                        ? Math.round(ranking.value).toLocaleString()
                        : ranking.value.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {dataType === "cost" ? "yen" : "Score"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : selectedMetric && rankings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FaGlobe className="mx-auto text-4xl text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            No ranking data available
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            There is insufficient data to generate rankings for the selected
            metric.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <FaGlobe className="mx-auto text-4xl text-indigo-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            Select a metric to view city rankings
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose a data category and metric from the options above to see how
            cities rank.
          </p>
        </div>
      )}
    </div>
  );
};

export default CountryRankingsPage;
