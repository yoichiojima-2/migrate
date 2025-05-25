/**
 * Hook for fetching and managing city data
 */
import { useState, useEffect } from 'react';
import type { 
  HappinessRecord, 
  CostOfLivingRecord, 
  GroupedHappiness, 
  GroupedCost,
  AggregatedHappinessItem,
  AggregatedCostItem
} from '../types';
import { fetchCityData } from '../services/api';
import { aggregateHappinessData, aggregateCostData } from '../utils/dataAggregation';

/**
 * Custom hook for fetching and managing city data
 * @param selectedCity - The currently selected city
 * @returns Object containing city data, loading state, and error state
 */
export function useCityData(selectedCity: string) {
  const [happinessData, setHappinessData] = useState<HappinessRecord[]>([]);
  const [costData, setCostData] = useState<CostOfLivingRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data when selected city changes
  useEffect(() => {
    if (!selectedCity) return;

    async function loadCityData() {
      try {
        setLoading(true);
        setError(null);
        
        const { happiness, costOfLiving } = await fetchCityData(selectedCity);
        setHappinessData(happiness);
        setCostData(costOfLiving);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch city data');
        console.error('Error loading city data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCityData();
  }, [selectedCity]);

  // Aggregate data
  const happinessAggregated: AggregatedHappinessItem[] = aggregateHappinessData(happinessData);
  const costAggregated: AggregatedCostItem[] = aggregateCostData(costData);

  // Group happiness data by city
  const groupHappinessByCity = (): GroupedHappiness[] => {
    const groups: { [key: string]: { country: string; features: HappinessRecord[] } } = {};
    
    happinessData.forEach(record => {
      if (record.city === selectedCity) return;
      
      if (!groups[record.city]) {
        groups[record.city] = { country: record.country, features: [] };
      }
      
      groups[record.city].features.push(record);
    });
    
    return Object.keys(groups).map(city => ({
      city,
      country: groups[city].country,
      features: groups[city].features,
    }));
  };

  // Group cost data by city
  const groupCostByCity = (): GroupedCost[] => {
    const groups: { [key: string]: { country: string; features: CostOfLivingRecord[] } } = {};
    
    costData.forEach(record => {
      if (record.city === selectedCity) return;
      
      if (!groups[record.city]) {
        groups[record.city] = { country: record.country, features: [] };
      }
      
      groups[record.city].features.push(record);
    });
    
    return Object.keys(groups).map(city => ({
      city,
      country: groups[city].country,
      features: groups[city].features,
    }));
  };

  const groupedHappiness = groupHappinessByCity();
  const groupedCost = groupCostByCity();

  // Helper to compute progress bar width (normalize to at most 100%)
  const getProgressWidth = (value: number): string => {
    const width = Math.min(Math.abs(value), 100);
    return width + "%";
  };

  return {
    happinessData,
    costData,
    happinessAggregated,
    costAggregated,
    groupedHappiness,
    groupedCost,
    getProgressWidth,
    loading,
    error
  };
}
