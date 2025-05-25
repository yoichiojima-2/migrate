/**
 * Overview page component with Airbnb-style design
 */
import React from 'react';
import AirbnbHeader from '../components/layout/AirbnbHeader';
import AirbnbFooter from '../components/layout/AirbnbFooter';
import AirbnbCitySelector from '../components/features/city-selector/AirbnbCitySelector';
import AirbnbViewModeToggle from '../components/features/data-display/AirbnbViewModeToggle';
import AirbnbDataTable from '../components/features/data-display/AirbnbDataTable';
import AirbnbDataChart from '../components/features/charts/AirbnbDataChart';
import AirbnbCityCardsSection from '../components/features/data-display/AirbnbCityCardsSection';
import AirbnbLoadingError from '../components/common/AirbnbLoadingError';
import { useCities } from '../hooks/useCities';
import { useCityData } from '../hooks/useCityData';
import { useViewMode } from '../hooks/useViewMode';

/**
 * Main overview page component
 * @returns React component
 */
const OverviewPage: React.FC = () => {
  // Use custom hooks for data and state management
  const { cities, selectedCity, setSelectedCity, loading: citiesLoading, error: citiesError } = useCities();
  const { 
    happinessData, 
    costData, 
    happinessAggregated, 
    costAggregated, 
    groupedHappiness, 
    groupedCost, 
    getProgressWidth, 
    loading: dataLoading, 
    error: dataError 
  } = useCityData(selectedCity);
  const { viewMode, setViewMode } = useViewMode('grouped');

  // Combine loading and error states
  const loading = citiesLoading || dataLoading;
  const error = citiesError || dataError;

  return (
    <div className="bg-white">
      <AirbnbHeader 
        title="Discover the Best Cities to Live In" 
        subtitle="Compare Quality of Life and Cost of Living across global destinations" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        <AirbnbViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        
        <div className="mt-8">
          <AirbnbCitySelector 
            cities={cities} 
            selectedCity={selectedCity} 
            onCityChange={setSelectedCity} 
          />
        </div>

        <AirbnbLoadingError loading={loading} error={error} />

      {!loading && !error && (
        <>
          {viewMode === 'grouped' ? (
            <>
              <AirbnbDataTable
                title="Happiness & Quality of Life (Aggregated)"
                headers={['feature', 'Reference', 'Avg Compared', 'Difference']}
                data={happinessAggregated.map(item => ({
                  feature: item.feature,
                  Reference: item.reference,
                  'Avg Compared': item.compared,
                  Difference: item.difference,
                }))}
              />

              <AirbnbDataTable
                title="Cost of Living (Aggregated)"
                headers={['feature', 'Reference', 'Avg Compared', 'Avg Diff Rate (%)']}
                data={costAggregated.map(item => ({
                  feature: item.feature,
                  Reference: item.reference,
                  'Avg Compared': item.compared,
                  'Avg Diff Rate (%)': item.diffRate,
                }))}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AirbnbDataChart
                  title="Happiness Trends"
                  data={happinessAggregated.map(item => ({
                    feature: item.feature,
                    Reference: item.reference,
                    'Avg Compared': item.compared,
                  }))}
                  referenceKey="Reference"
                  comparedKey="Avg Compared"
                />
                <AirbnbDataChart
                  title="Cost of Living Trends"
                  data={costAggregated.map(item => ({
                    feature: item.feature,
                    Reference: item.reference,
                    'Avg Compared': item.compared,
                  }))}
                  referenceKey="Reference"
                  comparedKey="Avg Compared"
                />
              </div>
            </>
          ) : (
            <>
              <AirbnbCityCardsSection
                title="Happiness & Quality of Life by City"
                data={groupedHappiness}
                type="happiness"
                getProgressWidth={getProgressWidth}
              />

              <AirbnbCityCardsSection
                title="Cost of Living by City"
                data={groupedCost}
                type="cost"
                getProgressWidth={getProgressWidth}
              />
            </>
          )}

          <AirbnbFooter />
        </>
      )}
      </div>
    </div>
  );
};

export default OverviewPage;
