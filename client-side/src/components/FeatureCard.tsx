import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import { IconType } from "react-icons";

interface FeatureCardProps {
  feature: string;
  value?: number;
  comparisonValue?: number;
  diff?: number;
  diffUnit?: string;
  description?: string;
  className?: string;
  icon?: IconType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  value,
  comparisonValue,
  diff,
  diffUnit = "%",
  description,
  className = "",
}) => {
  // Determine if the difference is positive, negative, or neutral
  const getDiffIndicator = () => {
    if (!diff || diff === 0) return <FaMinus className="text-gray-500" />;
    return diff > 0 ? (
      <FaArrowUp className="text-green-500" />
    ) : (
      <FaArrowDown className="text-red-500" />
    );
  };

  // Format the diff rate as a percentage
  const formattedDiffRate = diff
    ? `${Math.abs(diff).toFixed(1)}${diffUnit}`
    : `0${diffUnit}`;

  // Determine the background color based on the diff rate
  const getBgColor = () => {
    if (!diff || diff === 0) return "bg-gray-100 dark:bg-gray-700";
    return diff > 0
      ? "bg-green-50 dark:bg-green-900/20"
      : "bg-red-50 dark:bg-red-900/20";
  };

  return (
    <div className={`rounded-lg shadow-md p-4 ${getBgColor()} ${className}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {feature}
        </h3>
        <div className="flex items-center">
          {getDiffIndicator()}
          <span
            className={`ml-1 font-medium ${
              diff && diff > 0
                ? "text-green-600 dark:text-green-400"
                : diff && diff < 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {formattedDiffRate}
          </span>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {description}
        </p>
      )}

      <div className="flex justify-between mt-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Current City
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {value?.toLocaleString() || "N/A"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Comparison City
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {comparisonValue?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
