/**
 * Hook for fetching and managing cities data
 */
import { useState, useEffect } from 'react';
import type { CityCountry } from '../types';
import { fetchCities } from '../services/api';

/**
 * Custom hook for fetching and managing cities data
 * @returns Object containing cities data, loading state, error state, and selected city state
 */
export function useCities() {
  const [cities, setCities] = useState<CityCountry[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cities on component mount
  useEffect(() => {
    async function loadCities() {
      try {
        setLoading(true);
        setError(null);
        
        const citiesData = await fetchCities();
        setCities(citiesData);
        
        // Set the first city as the selected city if there are cities and no city is selected
        if (citiesData.length > 0 && !selectedCity) {
          setSelectedCity(citiesData[0].city);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cities');
        console.error('Error loading cities:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCities();
  }, []);

  // Get the current city object
  const currentCity = cities.find(c => c.city === selectedCity) || { city: '', country: '' };

  return {
    cities,
    selectedCity,
    setSelectedCity,
    currentCity,
    loading,
    error
  };
}
