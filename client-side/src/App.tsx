import React, { useEffect, useState } from "react";
import "./App.css";

interface CityData {
  city: string;
  country: string;
  feature: string;
  value: number;
  value_in_current_city: number;
  diff_amount: number;
  diff_rate: number;
}

function App() {
  const [data, setData] = useState<CityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/summary?city=tokyo");
        const json = await res.json();
        setData(json);
        console.log("App.tsx::fetchData::json", json);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>client-side</h1>
        <h2>client-side</h2>
        <h3>client-side</h3>
        <h4>client-side</h4>
        <h5>client-side</h5>
        <p>client-side</p>
      </div>
    </>
  );
}

export default App;
