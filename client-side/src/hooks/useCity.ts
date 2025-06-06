import { useState, useEffect } from "react";
import { cityApi } from "../services/api";
import { City } from "../types";

export interface UseCityResult {
  cities: City[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCity = (): UseCityResult => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const data = await cityApi.getCitiesAndCountries();
      setCities(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch cities";
      setError(errorMessage);
      console.error("Failed to fetch cities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return {
    cities,
    loading,
    error,
    refetch: fetchCities,
  };
};
