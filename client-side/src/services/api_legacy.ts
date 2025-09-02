import axios from "axios";
import { City, HappinessQolItem, CostOfLivingItem } from "../types";

const API_URL =
  "https://sign-to-migrate-serverside-96573724290.us-central1.run.app";

interface CountryResponse {
  country: string;
}

const api = {
  // Get list of all cities and countries
  getCitiesAndCountries: async (): Promise<City[]> => {
    try {
      const response = await axios.get<City[]>(
        `${API_URL}/cities_and_countries`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching cities and countries:", error);
      throw error;
    }
  },

  // Get country for a specific city
  getCountry: async (city: string): Promise<CountryResponse> => {
    try {
      const formattedCity = encodeURIComponent(city.toLowerCase().trim());
      const response = await axios.get<CountryResponse>(
        `${API_URL}/country?city=${formattedCity}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching country for city ${city}:`, error);
      throw error;
    }
  },

  // Get happiness and quality of life data for comparison with a given city
  getHappinessQol: async (city: string): Promise<HappinessQolItem[]> => {
    try {
      const formattedCity = encodeURIComponent(city.toLowerCase().trim());
      const response = await axios.get<HappinessQolItem[]>(
        `${API_URL}/happiness_qol?city=${formattedCity}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching happiness and QOL data for city ${city}:`,
        error,
      );
      throw error;
    }
  },

  // Get cost of living data for comparison with a given city
  getCostOfLiving: async (city: string): Promise<CostOfLivingItem[]> => {
    try {
      // Ensure city is properly formatted (lowercase, URL encoded)
      const formattedCity = encodeURIComponent(city.toLowerCase().trim());
      const response = await axios.get<CostOfLivingItem[]>(
        `${API_URL}/cost_of_living?city=${formattedCity}`,
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching cost of living data for city ${city}:`,
        error,
      );
      throw error;
    }
  },
};

export default api;
