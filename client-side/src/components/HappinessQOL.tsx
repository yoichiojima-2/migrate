import { happinessQOLRow } from "../types/types";

interface happinessQOLProps {
  city: string;
  data: happinessQOLRow[];
}

const HappinessQOL: React.FC<happinessQOLProps> = ({ city, data }) => {
  const filteredData = data.filter((row) => row.city === city);
  return (
    <div>
      {filteredData.map((row) => (
        <div key={row.feature}>
          <p>
            {row.feature}: {row.value} {row.value_in_current_city} {row.diff}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HappinessQOL;
