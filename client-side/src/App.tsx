import { useEffect, useState } from "react";
import "./App.css";

const api_endpoint: string = "http://127.0.0.1:8000";


function App() {
  const [cities, setCities] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [country, setCountry] = useState("japan");
  const [happiness, setHappiness] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api_endpoint}/cities`);
        const json = await res.json();
        setCities(json);
        console.log("cities updated.");
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
        const res = await fetch(`${api_endpoint}/country?city=${currentCity}`);
        const json = await res.json();
        console.log(json);
        setCountry(json);
        console.log(`country name fetched: ${country}`)
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currentCity]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${api_endpoint}/happiness?country=${country}`);
        const json = await res.json();
        const data = json["data"]
        setHappiness(data);
        console.log("happiness fetched:")
        console.log(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [country]);


  return (
    <div>
      <h1>migrate</h1>
      <div>
        <p>select the city you currently live in</p>
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
        <div></div>
      </div>
    </div>
  );
}

export default App;
