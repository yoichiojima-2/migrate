import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '../services/api';
import { CityContextType, City, HappinessQolItem, CostOfLivingItem } from '../types';

const CityContext = createContext<CityContextType | undefined>(undefined);

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
};

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [comparisonCity, setComparisonCity] = useState<string>('');
  const [happinessQolData, setHappinessQolData] = useState<HappinessQolItem[]>([]);
  const [costOfLivingData, setCostOfLivingData] = useState<CostOfLivingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cities and countries on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const data = await api.getCitiesAndCountries();
        setCities(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cities');
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Fetch happiness and QOL data when a city is selected
  useEffect(() => {
    if (!selectedCity) return;

    const fetchHappinessQolData = async () => {
      try {
        setLoading(true);
        const data = await api.getHappinessQol(selectedCity);
        setHappinessQolData(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch happiness and QOL data:', err);
        setError('Failed to fetch happiness and QOL data');
        setLoading(false);
      }
    };

    fetchHappinessQolData();
  }, [selectedCity]);

  // Fetch cost of living data when a city is selected
  useEffect(() => {
    if (!selectedCity) return;

    const fetchCostOfLivingData = async () => {
      try {
        setLoading(true);
        const data = await api.getCostOfLiving(selectedCity);
        
        if (data && Array.isArray(data)) {
          setCostOfLivingData(data);
        } else {
          setError('Invalid cost of living data format');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cost of living data:', err);
        setError(`Failed to fetch cost of living data: ${err instanceof Error ? err.message : 'Unknown error'}`);
        setLoading(false);
      }
    };

    fetchCostOfLivingData();
  }, [selectedCity]); // Removed comparisonCity from dependency array as it's not needed for fetching

  // Get filtered data for a specific city
  const getFilteredDataForCity = (cityName: string, dataType: 'happiness' | 'costOfLiving') => {
    if (!cityName) return [];

    const dataSource = dataType === 'happiness' ? happinessQolData : costOfLivingData;
    
    // If the city is the selected city, we need to handle it differently
    if (cityName === selectedCity) {
      // For the selected city, create a new array with the data from value_in_current_city
      return [...new Set(dataSource.map(item => item.feature))].map(feature => {
        const item = dataSource.find(data => data.feature === feature);
        if (!item) return null;
        
        return {
          ...item,
          city: selectedCity,
          value: item.value_in_current_city,
          // Keep other properties like description, etc.
        };
      }).filter(Boolean);
    } else {
      // For comparison cities, filter directly
      return dataSource.filter(item => item.city === cityName);
    }
  };

  // Get unique features from data
  const getUniqueFeatures = (dataType: 'happiness' | 'costOfLiving') => {
    const dataSource = dataType === 'happiness' ? happinessQolData : costOfLivingData;
    return [...new Set(dataSource.map(item => item.feature))];
  };

  // Get data for the selected city
  const getSelectedCityData = (dataType: 'happiness' | 'costOfLiving') => {
    if (!selectedCity) return [];
    
    const dataSource = dataType === 'happiness' ? happinessQolData : costOfLivingData;
    if (dataSource.length === 0) return [];
    
    // Create a new array with the data from value_in_current_city
    return [...new Set(dataSource.map(item => item.feature))].map(feature => {
      const item = dataSource.find(data => data.feature === feature);
      if (!item) return null;
      
      return {
        feature: item.feature,
        description: item.description,
        value: item.value_in_current_city,
        city: selectedCity,
        // Include any other properties needed
      };
    }).filter(Boolean);
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        selectedCity,
        setSelectedCity,
        comparisonCity,
        setComparisonCity,
        happinessQolData,
        costOfLivingData,
        loading,
        error,
        getFilteredDataForCity,
        getUniqueFeatures,
        getSelectedCityData
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export default CityContext;
