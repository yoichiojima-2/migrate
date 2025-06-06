import { BaseApiService } from "./baseApi";
import { City } from "../../types";

export interface CountryResponse {
  country: string;
}

export class CityApiService extends BaseApiService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async getCitiesAndCountries(): Promise<City[]> {
    return this.get<City[]>("/cities_and_countries");
  }

  async getCountry(city: string): Promise<CountryResponse> {
    const formattedCity = encodeURIComponent(city.toLowerCase().trim());
    return this.get<CountryResponse>(`/country?city=${formattedCity}`);
  }
}
