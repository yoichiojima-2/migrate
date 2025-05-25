/**
 * Common type definitions for the application
 */

/**
 * Represents a city and its country
 */
export interface CityCountry {
  country: string;
  city: string;
}

/**
 * Represents a happiness record for a city
 */
export interface HappinessRecord {
  country: string;
  city: string;
  feature: string;
  value: number;
  value_in_current_city: number;
  diff: number;
}

/**
 * Represents a cost of living record for a city
 */
export interface CostOfLivingRecord {
  country: string;
  city: string;
  feature: string;
  description: string;
  value: number;
  value_in_current_city: number;
  diff_rate: number;
}

/**
 * Represents grouped happiness data for a city
 */
export interface GroupedHappiness {
  city: string;
  country: string;
  features: HappinessRecord[];
}

/**
 * Represents grouped cost of living data for a city
 */
export interface GroupedCost {
  city: string;
  country: string;
  features: CostOfLivingRecord[];
}

/**
 * Represents an aggregated happiness data item
 */
export interface AggregatedHappinessItem {
  feature: string;
  reference: number;
  compared: number;
  difference: number;
}

/**
 * Represents an aggregated cost of living data item
 */
export interface AggregatedCostItem {
  feature: string;
  reference: number;
  compared: number;
  diffRate: number;
}

/**
 * View mode for the data display
 */
export type ViewMode = "grouped" | "individual";

/**
 * Props for data table components
 */
export interface TableProps {
  title: string;
  headers: string[];
  data: Array<Record<string, string | number>>;
}

/**
 * Props for chart components
 */
export interface ChartProps {
  title: string;
  data: Array<Record<string, string | number>>;
  referenceKey: string;
  comparedKey: string;
}

/**
 * Props for city selector components
 */
export interface CitySelectorProps {
  cities: CityCountry[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

/**
 * API response types
 */
export type CitiesResponse = CityCountry[];
export type HappinessResponse = HappinessRecord[];
export type CostOfLivingResponse = CostOfLivingRecord[];
