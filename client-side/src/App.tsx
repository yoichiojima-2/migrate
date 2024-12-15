import { useEffect, useState } from "react";
import Happiness from "./pages/happiness";
import { API_URL } from "./constants/api";
import "./App.css";



function App(): JSX.Element {
  const [currentCity, setCurrentCity] = useState<string>("tokyo");
  const [country, setCountry] = useState<string>("japan");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/country?city=${currentCity}`);
        const json = await res.json();
        setCountry(json);
        console.log(country);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currentCity]);

  return (
    <div>
      <Happiness country={country} />
    </div>
  )
}

export default App;
