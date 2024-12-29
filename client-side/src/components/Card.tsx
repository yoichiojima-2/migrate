import HappinessQOL from "./HappinessQOL";
import { happinessQOLRow } from "../types/types";

interface CardProps {
  city: string;
  happinessQOLData: happinessQOLRow[];
}

const Card: React.FC<CardProps> = ({ city, happinessQOLData }) => (
  <div className="m-4 p-4 border-2 rounded-2xl">
    <h2 className="text-3xl p-4 mb-4">{city}</h2>
    <HappinessQOL city={city} data={happinessQOLData} />
  </div>
);

export default Card;
