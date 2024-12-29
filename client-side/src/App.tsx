import { useEffect, useState } from "react";

import Picker from "./components/picker";
import HappinessQOL from "./pages/happiness_qol";
import { API_URL } from "./constants/api";

import "./App.css";

function App() {
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [city, setCity] = useState<string>("japan");
  const [cities, setCities] = useState<string[]>([]);

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
      <HappinessQOL city={currentCity} />
    </div>
  );
}

export default App;
