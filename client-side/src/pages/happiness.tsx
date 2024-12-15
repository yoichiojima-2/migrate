import { useEffect, useState } from "react";
import { API_URL } from "../constants/api";

const groupByCountry = (happiness: any) => (
  happiness.reduce((acc: any, row: any) => {
    if (!acc[row.country]) {
      acc[row.country] = [];
    }
    const { country, ...rest } = row;
    acc[row.country].push(rest);
    return acc;
  }, {})
)

const Happiness: JSX.elements = ({ country }: { country: string }) => {
  const [happiness, setHappiness] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/happiness?country=${country}`);
        const json = await res.json();
        setHappiness(groupByCountry(json));
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [country]);

  return (
    <div>
      {Object.keys(happiness).map((country: string) => (
        <div key={country}>
        <h3>{country}</h3>
        {happiness[country].map((row: any) => (
          <div key={row.feature} className="flex flex-row">
            <div>{row.feature}</div>
            <div>{row.value} / {row.diff_rate}</div>
          </div>
        ))}
        </div>
      ))}
    </div>
  )
}

export default Happiness;