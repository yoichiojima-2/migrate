import { costOfLivingRow } from "../interfaces/interfaces";

interface costOfLivingProps {
  city: string;
  data: costOfLivingRow[];
}

const costOfLiving: React.FC<costOfLivingProps> = ({ city, data }) => {
  const scale = 0.3;

  return (
    <div className="text-xs py-3 my-3">
      <h2 className="text-lg text-center pb-8">Cost of Living</h2>
      {data
        .filter((row) => row.city === city)
        .map((row, index) => (
          <div key={index} className="flex h-8 mb-3">
            <span className="w-6/12 h-full text-right text-nowrap">
              <div>
                <p>{row.feature}</p>
                <p className="scale-75 origin-right overflow-hidden">{row.description}</p>
              </div>
            </span>
            <span className="relative w-2/12 flex items-center justify-end">{row.value}</span>
            <span className="relative w-2/12">
              <div
                className="absolute right-0 bg-pink-500 h-8 rounded-l"
                style={{
                  width: `${row.diff_rate < 0 ? Math.abs(row.diff_rate * scale) : 0}%`,
                }}
              />
            </span>
            <span className="relative w-2/12 overflow-hidden">
              <div
                className="absolute left-0 bg-teal-500 h-8 rounded-r"
                style={{
                  width: `${row.diff_rate > 0 ? row.diff_rate * scale : 0}%`,
                }}
              />
            </span>
          </div>
        ))}
    </div>
  );
};

export default costOfLiving;
