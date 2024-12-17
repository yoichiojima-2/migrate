import React, { useEffect, useState } from "react";
import { API_URL } from "../constants/api";

interface CountryCardProps {
  country: string;
  data: HappinessData[];
}

const CountryCard: React.FC<CountryCardProps> = ({ country, data }) => {
  return (
    <div>
      <h2>{country}</h2>
      <table>
        <thead>
          <tr>
            <th>feature</th>
            <th>value</th>
            <th>value in current city</th>
            <th>diff (amount)</th>
            <th>diff (rate)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.feature}>
              <td>{item.feature}</td>
              <td>{item.value}</td>
              <td>{item.value_in_current_country}</td>
              <td>{item.diff_amount}</td>
              <td>{item.diff_rate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const groupByCountry = (data: HappinessData[]) => {
  return data.reduce<Record<string, HappinessData[]>>((acc, item) => {
    if (!acc[item.country]) {
      acc[item.country] = [];
    }
    acc[item.country].push(item);
    return acc;
  }, {});
};


interface HappinessProps {
  country: string;
}

interface HappinessData {
  country: string;
  feature: string;
  value: number;
  value_in_current_country: number;
  diff_amount: number;
  diff_rate: number;
}

const Happiness: React.FC<HappinessProps> = ({ country }) => {
  const [happiness, setHappiness] = useState<HappinessData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/happiness?country=${country}`);
        const json = await res.json();
        setHappiness(json);
        console.log(`happiness data fetched: ${country}`);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [country]);

  const groupedData = groupByCountry(happiness);

  return (
    <div>
      {Object.entries(groupedData).map(([country, data]) => (
        <CountryCard key={country} country={country} data={data} />
      ))}
    </div>
  );
};

export default Happiness;
