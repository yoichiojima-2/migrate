import HappinessQOL from "./HappinessQOL";
import { happinessQOLRow } from "../types";

interface CardProps {
  city: string;
  happinessQOLData: happinessQOLRow[];
}

const Card: React.FC<CardProps> = ({ city, happinessQOLData }) => (
  <div className="m-4 p-4 rounded-2xl border border-gray-600">
    <h2 className="py-10 m-1 text-3xl text-center">{city}</h2>
    <HappinessQOL city={city} data={happinessQOLData} />
  </div>
);

export default Card;
