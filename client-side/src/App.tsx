import { useEffect, useState } from "react";
import Card from "./components/Card";
import Picker from "./components/Picker";
import { happinessQOLRow, citiesAndCountriesRow, costOfLivingRow } from "./interfaces/interfaces"; // prettier-ignore
import { API_URL } from "./constants/api";
import "./App.css";

function App() {
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [citiesAndCountries, setcitiesAndCountries] = useState<citiesAndCountriesRow[]>([]); // prettier-ignore
  const [happinessQOLData, setHappinessQOLData] = useState<happinessQOLRow[]>([]); // prettier-ignore
  const [costOfLivingData, setCostOfLivingData] = useState<[costOfLivingRow]>([]); // prettier-ignore

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
      <Picker
        picked={currentCity}
        options={citiesAndCountries.map((row) => row.city)}
        onPick={setCurrentCity}
      />
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
            />
          ))}
      </div>
    </div>
  );
}

export default App;
