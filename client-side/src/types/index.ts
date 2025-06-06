// API Response Types
export interface City {
  city: string;
  country: string;
}

export interface HappinessQolItem {
  city: string;
  feature: string;
  value: number;
  value_in_current_city: number;
  description?: string;
  diff?: number;
}

export interface CostOfLivingItem {
  city: string;
  feature: string;
  value: number;
  value_in_current_city: number;
  description?: string;
  diff?: number;
  diff_rate?: number;
}

// Data Types
export interface DataItem {
  feature: string;
  description?: string;
  value: number;
  city: string;
}

// Legacy Context Type (deprecated - use individual contexts instead)
export interface CityContextType {
  cities: City[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  comparisonCity: string;
  setComparisonCity: (city: string) => void;
  happinessQolData: HappinessQolItem[];
  costOfLivingData: CostOfLivingItem[];
  loading: boolean;
  error: string | null;
  getFilteredDataForCity: (
    cityName: string,
    dataType: "happiness" | "costOfLiving",
  ) => any[];
  getUniqueFeatures: (dataType: "happiness" | "costOfLiving") => string[];
  getSelectedCityData: (dataType: "happiness" | "costOfLiving") => any[];
}

// Component Props Types
export type Size = "sm" | "md" | "lg" | "xl";
