import React, { createContext, useState, useContext, ReactNode } from "react";

export interface CitySelectionContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  comparisonCity: string;
  setComparisonCity: (city: string) => void;
}

const CitySelectionContext = createContext<
  CitySelectionContextType | undefined
>(undefined);

export const useCitySelection = () => {
  const context = useContext(CitySelectionContext);
  if (!context) {
    throw new Error(
      "useCitySelection must be used within a CitySelectionProvider",
    );
  }
  return context;
};

interface CitySelectionProviderProps {
  children: ReactNode;
}

export const CitySelectionProvider: React.FC<CitySelectionProviderProps> = ({
  children,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [comparisonCity, setComparisonCity] = useState<string>("");

  return (
    <CitySelectionContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        comparisonCity,
        setComparisonCity,
      }}
    >
      {children}
    </CitySelectionContext.Provider>
  );
};
