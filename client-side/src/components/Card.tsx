import HappinessQOL from "./HappinessQOL";
import CostOfLiving from "./CostOfLiving";
import Line from "./Line";
import { happinessQOLRow, costOfLivingRow } from "../interfaces/interfaces";

interface CardProps {
  city: string;
  country: string;
  happinessQOLData: happinessQOLRow[];
  costOfLivingData: costOfLivingRow[];
  isCostOfLivingVisible: boolean;
  isHappinessQOLVisible: boolean;
}

const Card: React.FC<CardProps> = ({
  city,
  country,
  happinessQOLData,
  costOfLivingData,
  isCostOfLivingVisible,
  isHappinessQOLVisible,
}) => (
  <div className="m-1 p-8 rounded-2xl border border-gray-600">
    <div className="text-center">
      <h2 className="py-2 text-3xl">{city}</h2>
      <p className="pb-8 text-xs">{country}</p>
    </div>
    {isHappinessQOLVisible && (
      <>
        <Line />
        <HappinessQOL city={city} data={happinessQOLData} />
      </>
    )}
    {isCostOfLivingVisible && (
      <>
        <Line />
        <CostOfLiving city={city} data={costOfLivingData} />
      </>
    )}
  </div>
);

export default Card;
