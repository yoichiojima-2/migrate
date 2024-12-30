export interface happinessQOLRow {
  country: string;
  city: string;
  feature: string;
  value: number;
  value_in_current_city: number;
  diff: number;
}

export interface citiesAndCountriesRow {
  city: string;
  country: string;
}

export interface costOfLivingRow {
  country: string;
  city: string;
  feature: string;
  description: string;
  value: number;
  value_in_current_city: number;
  diff_rate: number;
}
