import { useEffect, useState } from "react";
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
  // fetch server
  const [summary, setSummary] = useState<CityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/summary?city=tokyo");
        const json = await res.json();
        setSummary(json);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // log data
  for (let i = 0; i < summary.length; i++) {
    console.log(summary[i]);
  }

  return (
    <>
      <div>
        <h1>migrate</h1>
      </div>
    </>
  );
}

export default App;
