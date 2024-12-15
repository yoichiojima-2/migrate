import { useEffect, useState } from "react";
import "./App.css";

const api_endpoint: string = "http://127.0.0.1:8000";

const Card = () => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    <div className="px-6 py-4">
      <h2 className="font-bold text-xl mb-2">Card Title</h2>
      <p className="text-gray-700 text-base">
        This is a simple card description. It gives a brief overview of the
        card's content.
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
        Action
      </button>
    </div>
  </div>
);

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
        console.log(cities);
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
        setCountry(json);
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
        const data = json["data"];
        setHappiness(data);
        console.log(happiness);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [country]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Card/>
      <Card/>
    </div>
  )
}

export default App;
