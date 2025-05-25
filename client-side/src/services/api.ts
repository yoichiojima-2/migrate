/**
 * API service for fetching data from the server
 */
import type { CitiesResponse, HappinessResponse, CostOfLivingResponse } from '../types';

// Base URL for the API
const API_BASE_URL = 'https://sign-to-migrate-serverside-96573724290.us-central1.run.app';

/**
 * Generic fetch function with error handling
 * @param url - The URL to fetch
 * @returns The response data
 * @throws Error if the fetch fails
 */
async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/**
 * Fetch the list of cities and countries
 * @returns Promise with the cities data
 */
export async function fetchCities(): Promise<CitiesResponse> {
  return fetchData<CitiesResponse>(`${API_BASE_URL}/cities_and_countries`);
}

/**
 * Fetch happiness and quality of life data for a city
 * @param city - The city to fetch data for
 * @returns Promise with the happiness data
 */
export async function fetchHappinessData(city: string): Promise<HappinessResponse> {
  return fetchData<HappinessResponse>(`${API_BASE_URL}/happiness_qol?city=${encodeURIComponent(city)}`);
}

/**
 * Fetch cost of living data for a city
 * @param city - The city to fetch data for
 * @returns Promise with the cost of living data
 */
export async function fetchCostOfLivingData(city: string): Promise<CostOfLivingResponse> {
  return fetchData<CostOfLivingResponse>(`${API_BASE_URL}/cost_of_living?city=${encodeURIComponent(city)}`);
}

/**
 * Fetch all data for a city (happiness and cost of living)
 * @param city - The city to fetch data for
 * @returns Promise with both happiness and cost of living data
 */
export async function fetchCityData(city: string): Promise<{
  happiness: HappinessResponse;
  costOfLiving: CostOfLivingResponse;
}> {
  try {
    const [happiness, costOfLiving] = await Promise.all([
      fetchHappinessData(city),
      fetchCostOfLivingData(city)
    ]);
    
    return { happiness, costOfLiving };
  } catch (error) {
    console.error('Error fetching city data:', error);
    throw error;
  }
}
