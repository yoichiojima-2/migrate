import { HappinessQolItem, CostOfLivingItem } from "../../types";

export interface TransformedDataItem {
  feature: string;
  description?: string;
  value: number;
  city: string;
}

export class CityDataTransformer {
  static getFilteredDataForCity(
    cityName: string,
    selectedCity: string,
    dataSource: HappinessQolItem[] | CostOfLivingItem[],
  ): TransformedDataItem[] {
    if (!cityName || !dataSource.length) return [];

    if (cityName === selectedCity) {
      // For the selected city, use value_in_current_city
      return [...new Set(dataSource.map((item) => item.feature))]
        .map((feature) => {
          const item = dataSource.find((data) => data.feature === feature);
          if (!item) return null;

          return {
            feature: item.feature,
            description: item.description,
            value: item.value_in_current_city,
            city: selectedCity,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);
    } else {
      // For comparison cities, filter directly
      return dataSource
        .filter((item) => item.city === cityName)
        .map((item) => ({
          feature: item.feature,
          description: item.description,
          value: item.value,
          city: item.city,
        }));
    }
  }

  static getUniqueFeatures(
    dataSource: HappinessQolItem[] | CostOfLivingItem[],
  ): string[] {
    return [...new Set(dataSource.map((item) => item.feature))];
  }

  static getSelectedCityData(
    selectedCity: string,
    dataSource: HappinessQolItem[] | CostOfLivingItem[],
  ): TransformedDataItem[] {
    if (!selectedCity || !dataSource.length) return [];

    return [...new Set(dataSource.map((item) => item.feature))]
      .map((feature) => {
        const item = dataSource.find((data) => data.feature === feature);
        if (!item) return null;

        return {
          feature: item.feature,
          description: item.description,
          value: item.value_in_current_city,
          city: selectedCity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }
}
