import React, { useEffect, useState } from "react";
import { API_URL } from "../constants/api";

const groupByCountry = (happiness) => (
  happiness.reduce((acc, row) => {
    if (!acc[row.country]) {
      acc[row.country] = [];
    }
    const { country, ...rest } = row;
    acc[row.country].push(rest);
    return acc;
  }, {})
)

interface HappinessProps {
  country: string;
}

interface HappinessRow {
  feature: string;
  value: number;
  diff_rate: number;
}

const Happiness: React.FC<HappinessProps> = ({ country }) => {
  const [happiness, setHappiness] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/happiness?country=${country}`);
        const json = await res.json();
        setHappiness(groupByCountry(json));
        console.log(`happiness data fetched: ${country}`);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [country]);

  return (
    <div>
      {Object.keys(happiness).map((country: string) => (
        <div id={`happiness-${country}`} key={country}>
        <h3>{country}</h3>
          {happiness[country].map((row: HappinessRow) => (
            <div key={row.feature} className="flex">
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