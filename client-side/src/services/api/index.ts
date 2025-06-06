import { CityApiService } from "./cityApi";
import { DataApiService } from "./dataApi";

const API_URL =
  "https://sign-to-migrate-serverside-96573724290.us-central1.run.app";

export const cityApi = new CityApiService(API_URL);
export const dataApi = new DataApiService(API_URL);

export * from "./baseApi";
export * from "./cityApi";
export * from "./dataApi";
