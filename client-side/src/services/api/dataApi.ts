import { BaseApiService } from "./baseApi";
import { HappinessQolItem, CostOfLivingItem } from "../../types";

export class DataApiService extends BaseApiService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async getHappinessQol(city: string): Promise<HappinessQolItem[]> {
    const formattedCity = encodeURIComponent(city.toLowerCase().trim());
    return this.get<HappinessQolItem[]>(`/happiness_qol?city=${formattedCity}`);
  }

  async getCostOfLiving(city: string): Promise<CostOfLivingItem[]> {
    const formattedCity = encodeURIComponent(city.toLowerCase().trim());
    return this.get<CostOfLivingItem[]>(
      `/cost_of_living?city=${formattedCity}`,
    );
  }
}
