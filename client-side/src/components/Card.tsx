import HappinessQOL from "./HappinessQOL";
import { happinessQOLRow } from "../types/types";

interface CardProps {
  city: string;
  happinessQOLData: happinessQOLRow[];
}

const Card: React.FC<CardProps> = ({ city, happinessQOLData }) => (
  <div>
    <h2>{city}</h2>
    <HappinessQOL city={city} data={happinessQOLData} />
  </div>
);

export default Card;
