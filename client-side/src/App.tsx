import { useEffect, useState } from "react";

import Picker from "./components/picker";
import Happiness from "./pages/happiness";
import { API_URL } from "./constants/api";

import "./App.css";

function App() {
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [country, setCountry] = useState<string>("japan");
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/country?city=${currentCity}`);
        const json = await res.json();
        setCountry(json);
        console.log(`country fetched: ${currentCity} -> ${country}`);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currentCity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/cities`);
        const json = await res.json();
        setCities(json);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Picker picked={currentCity} options={cities} onPick={setCurrentCity} />
      <Happiness country={country} />
    </div>
  );
}

export default App;
