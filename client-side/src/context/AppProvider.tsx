import React, { ReactNode } from "react";
import { CitySelectionProvider } from "./CitySelectionContext";
import { DataProvider } from "./DataContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <CitySelectionProvider>
      <DataProvider>{children}</DataProvider>
    </CitySelectionProvider>
  );
};
