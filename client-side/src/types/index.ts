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


// Component Props Types
export type Size = "sm" | "md" | "lg" | "xl";
