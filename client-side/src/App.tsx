import { useEffect, useState } from "react";
import Card from "./components/Card";
import Picker from "./components/Picker";
import { happinessQOLRow } from "./types/types";
import { API_URL } from "./constants/api";
import "./App.css";

function App() {
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [cities, setCities] = useState<string[]>([]);
  const [happinessQOLData, setHappinessQOLData] = useState<happinessQOLRow[]>([]); // prettier-ignore

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/cities`);
        const json = await res.json();
        setCities(json);
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

  return (
    <div>
      <Picker picked={currentCity} options={cities} onPick={setCurrentCity} />
      {cities
        .filter((city) => city != currentCity)
        .map((city) => (
          <Card key={city} city={city} happinessQOLData={happinessQOLData} />
        ))}
    </div>
  );
}

export default App;
