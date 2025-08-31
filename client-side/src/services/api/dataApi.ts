import { BaseApiService } from "./baseApi";
import { HappinessQolItem, CostOfLivingItem } from "../../types";

export class DataApiService extends BaseApiService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async getHappinessQol(city: string, comparisonCity?: string): Promise<HappinessQolItem[]> {
    const formattedCity = encodeURIComponent(city.toLowerCase().trim());
    let url = `/happiness_qol?city=${formattedCity}`;
    
    if (comparisonCity) {
      const formattedComparisonCity = encodeURIComponent(comparisonCity.toLowerCase().trim());
      url += `&comparison_city=${formattedComparisonCity}`;
    }
    
    return this.get<HappinessQolItem[]>(url);
  }

  async getCostOfLiving(city: string, comparisonCity?: string): Promise<CostOfLivingItem[]> {
    const formattedCity = encodeURIComponent(city.toLowerCase().trim());
    let url = `/cost_of_living?city=${formattedCity}`;
    
    if (comparisonCity) {
      const formattedComparisonCity = encodeURIComponent(comparisonCity.toLowerCase().trim());
      url += `&comparison_city=${formattedComparisonCity}`;
    }
    
    return this.get<CostOfLivingItem[]>(url);
  }
}
