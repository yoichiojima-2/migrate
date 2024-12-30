import { useEffect, useState } from "react";
import Card from "./components/Card";
import Picker from "./components/Picker";
import Button from "./components/Button";
import { happinessQOLRow, citiesAndCountriesRow, costOfLivingRow } from "./interfaces/interfaces";
import { API_URL } from "./constants/api";
import "./App.css";

function App() {
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [citiesAndCountries, setcitiesAndCountries] = useState<citiesAndCountriesRow[]>([]);
  const [happinessQOLData, setHappinessQOLData] = useState<happinessQOLRow[]>([]);
  const [costOfLivingData, setCostOfLivingData] = useState<costOfLivingRow[]>([]);
  const [isHappinessQOLVisible, setIsHappinessQOLVisible] = useState<boolean>(true);
  const [isCostOfLivingVisible, setIsCostOfLivingVisible] = useState<boolean>(true);

  const toggleHappinessQOLVisibility = () => setIsHappinessQOLVisible(!isHappinessQOLVisible);
  const toggleCostOfLivingVisibility = () => setIsCostOfLivingVisible(!isCostOfLivingVisible);

  // fetch city and country
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/cities_and_countries`);
        const json = await res.json();
        setcitiesAndCountries(json);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  // fetch happiness and QOL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/happiness_qol?city=${currentCity}`);
        const json = await res.json();
        setHappinessQOLData(json);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [currentCity]);

  // fetch cost of living
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/cost_of_living?city=${currentCity}`);
        const json = await res.json();
        setCostOfLivingData(json);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [currentCity]);

  return (
    <div className="bg-gray-800 w-screen min-h-screen text-gray-300">
      <div className="flex justify-between">
        <Picker picked={currentCity} options={citiesAndCountries.map((row) => row.city)} onPick={setCurrentCity} />
        <Button text="Cost of Living" onClick={toggleCostOfLivingVisibility} />
        <Button text="Quality of Life" onClick={toggleHappinessQOLVisibility} />
      </div>
      <div className="grid grid-cols-5">
        {citiesAndCountries
          .filter((row) => row.city != currentCity)
          .map((row, index) => (
            <Card
              key={index}
              city={row.city}
              country={row.country}
              happinessQOLData={happinessQOLData}
              costOfLivingData={costOfLivingData}
              isCostOfLivingVisible={isCostOfLivingVisible}
              isHappinessQOLVisible={isHappinessQOLVisible}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
