import { happinessQOLRow } from "../interfaces/interfaces";

interface happinessQOLProps {
  city: string;
  data: happinessQOLRow[];
}

const HappinessQOL: React.FC<happinessQOLProps> = ({ city, data }) => {
  const scale = 30;

  return (
    <div className="text-xs pb-5 mb-5">
      <h2 className="text-lg text-center pb-8">
        Quality of Life
      </h2>
      {data
        .filter((row) => row.city === city)
        .map((row, index) => (
          <div key={index} className="flex justify-between h-5">
            <span className="w-5/12 text-right text-nowrap overflow-hidden">
              {row.feature}
            </span>
            <span className="relative w-1/12 text-right">{row.value}</span>
            <span className="relative w-3/12 overflow-hidden">
              <div
                className="absolute right-0 bg-pink-500 h-4 rounded-l"
                style={{
                  width: `${row.value < 0 ? Math.abs(row.value * scale) : 0}%`,
                }}
              />
            </span>
            <span className="relative w-3/12 overflow-hidden">
              <div
                className="absolute left-0 bg-teal-500 h-4 rounded-r"
                style={{
                  width: `${row.value > 0 ? row.value * scale : 0}%`,
                }}
              />
            </span>
          </div>
        ))}
    </div>
  );
};

export default HappinessQOL;
