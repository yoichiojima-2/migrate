// Re-export from the new API structure for backward compatibility
export * from "./api/index";
export { cityApi, dataApi } from "./api/index";

// Create a default export that matches the old API structure for backward compatibility
import { cityApi, dataApi } from "./api/index";

const api = {
  getCitiesAndCountries: () => cityApi.getCitiesAndCountries(),
  getCountry: (city: string) => cityApi.getCountry(city),
  getHappinessQol: (city: string) => dataApi.getHappinessQol(city),
  getCostOfLiving: (city: string) => dataApi.getCostOfLiving(city),
};

export default api;
