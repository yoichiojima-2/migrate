import { useEffect, useState } from "react";
import "./App.css";

const api_endpoint: string = "http://127.0.0.1:8000";

interface SummaryData {
  [key: string]: {
    [key: string]: {
      value: number;
      value_in_current_city: number;
      diff_amount: number;
      diff_rate: number;
    };
  };
}

function App() {
  // fetch server
  const [cities, setCities] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [summary, setSummary] = useState<SummaryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api_endpoint}/cities`);
        const json = await res.json();
        setCities(json);
        console.log("cities updated");
        console.log(json);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api_endpoint}/summary?city=${currentCity}`);
        const json = await res.json();
        setSummary(json);
        console.log(`summary updated: ${currentCity}`);
        console.log(json);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currentCity]);

  return (
    <div>
      <h1>migrate</h1>
      <div>
        <select
          id="city-select"
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <p>Data goes here</p>
    </div>
  );
}

export default App;
