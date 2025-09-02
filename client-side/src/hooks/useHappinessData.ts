import { useState, useEffect } from "react";
import { dataApi } from "../services/api";
import { HappinessQolItem } from "../types";

export interface UseHappinessDataResult {
  data: HappinessQolItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useHappinessData = (city: string): UseHappinessDataResult => {
  const [data, setData] = useState<HappinessQolItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    if (!city) {
      setData([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await dataApi.getHappinessQol(city);
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch happiness data";
      setError(errorMessage);
      console.error("Failed to fetch happiness data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
