import { useState, useEffect } from "react";
import { dataApi } from "../services/api";
import { CostOfLivingItem } from "../types";

export interface UseCostOfLivingDataResult {
  data: CostOfLivingItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCostOfLivingData = (
  city: string,
): UseCostOfLivingDataResult => {
  const [data, setData] = useState<CostOfLivingItem[]>([]);
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
      const result = await dataApi.getCostOfLiving(city);

      if (result && Array.isArray(result)) {
        setData(result);
      } else {
        throw new Error("Invalid cost of living data format");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch cost of living data";
      setError(errorMessage);
      console.error("Failed to fetch cost of living data:", err);
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
