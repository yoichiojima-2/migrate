import React, { createContext, useContext, ReactNode } from "react";
import { useHappinessData, useCostOfLivingData } from "../hooks";
import { useCitySelection } from "./CitySelectionContext";
import {
  CityDataTransformer,
  TransformedDataItem,
} from "../services/dataTransform";

export interface DataContextType {
  happinessData: ReturnType<typeof useHappinessData>;
  costOfLivingData: ReturnType<typeof useCostOfLivingData>;
  getFilteredDataForCity: (
    cityName: string,
    dataType: "happiness" | "costOfLiving",
  ) => TransformedDataItem[];
  getUniqueFeatures: (dataType: "happiness" | "costOfLiving") => string[];
  getSelectedCityData: (
    dataType: "happiness" | "costOfLiving",
  ) => TransformedDataItem[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const { selectedCity } = useCitySelection();
  const happinessData = useHappinessData(selectedCity);
  const costOfLivingData = useCostOfLivingData(selectedCity);

  const getFilteredDataForCity = (
    cityName: string,
    dataType: "happiness" | "costOfLiving",
  ): TransformedDataItem[] => {
    const dataSource =
      dataType === "happiness" ? happinessData.data : costOfLivingData.data;
    return CityDataTransformer.getFilteredDataForCity(
      cityName,
      selectedCity,
      dataSource,
    );
  };

  const getUniqueFeatures = (
    dataType: "happiness" | "costOfLiving",
  ): string[] => {
    const dataSource =
      dataType === "happiness" ? happinessData.data : costOfLivingData.data;
    return CityDataTransformer.getUniqueFeatures(dataSource);
  };

  const getSelectedCityData = (
    dataType: "happiness" | "costOfLiving",
  ): TransformedDataItem[] => {
    const dataSource =
      dataType === "happiness" ? happinessData.data : costOfLivingData.data;
    return CityDataTransformer.getSelectedCityData(selectedCity, dataSource);
  };

  return (
    <DataContext.Provider
      value={{
        happinessData,
        costOfLivingData,
        getFilteredDataForCity,
        getUniqueFeatures,
        getSelectedCityData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
