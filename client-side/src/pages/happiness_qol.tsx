import React, { useEffect, useState } from "react";
import { API_URL } from "../constants/api";

interface cityCardProps {
  city: string;
  data: HappinessData[];
}

const CityCard: React.FC<cityCardProps> = ({ city, data }) => (
  <div>
    <h2>{city}</h2>
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
            <td>{item.value_in_current_city}</td>
            <td>{item.diff_amount}</td>
            <td>{item.diff_rate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface HappinessProps {
  city: string;
}

interface HappinessData {
  city: string;
  feature: string;
  value: number;
  value_in_current_city: number;
  diff_amount: number;
  diff_rate: number;
}

const groupBycity = (data: HappinessData[]) => {
  return data.reduce<Record<string, HappinessData[]>>((acc, item) => {
    if (!acc[item.city]) {
      acc[item.city] = [];
    }
    acc[item.city].push(item);
    return acc;
  }, {});
};

const HappinessQOL: React.FC<HappinessProps> = ({ city }) => {
  const [happiness, setHappiness] = useState<HappinessData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/happiness_qol?city=${city}`);
        const json = await res.json();
        setHappiness(json);
        console.log(`happiness data fetched: ${city}`);
        console.log(json);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [city]);

  const groupedData = groupBycity(happiness);

  return (
    <div>
      {Object.entries(groupedData).map(([city, data]) => (
        <CityCard key={city} city={city} data={data} />
      ))}
    </div>
  );
};

export default HappinessQOL;
