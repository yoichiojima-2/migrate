import { happinessQOLRow } from "../types/types";

interface happinessQOLProps {
  city: string;
  data: happinessQOLRow[];
}

const HappinessQOL: React.FC<happinessQOLProps> = ({ city, data }) => {
  const scale = 20;
  const filteredData = data.filter((row) => row.city === city);

  filteredData.map((row) => {
    console.log(row.diff * scale);
  });

  return (
    <div className="mb-4">
      <h3 className="text-xl pb-3">compare with selected city</h3>
      {filteredData.map((row, index) => (
        <div key={index} className="flex justify-between h-5 text-sm">
          <span className="w-5/12 text-right">{row.feature}</span>
          <span className="relative w-1/12 text-right">{row.value}</span>
          <span className="relative w-3/12 overflow-hidden">
            <div
              className="absolute right-0 bg-pink-500 h-4 rounded-l"
              style={{
                width: `${row.diff <= 0 ? Math.abs(row.diff * scale) : 0}%`,
              }}
            />
          </span>
          <span className="relative w-3/12 overflow-hidden">
            <div
              className="absolute left-0 bg-teal-500 h-4 rounded-r"
              style={{
                width: `${row.diff >= 0 ? row.diff * scale : 0}%`,
              }}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default HappinessQOL;
