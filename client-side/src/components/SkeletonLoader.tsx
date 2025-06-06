import React from "react";

interface SkeletonLoaderProps {
  type?: "text" | "card" | "list" | "chart";
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "text",
  lines = 3,
  className = "",
}) => {
  const baseClass = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded";

  if (type === "text") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClass} h-4 ${
              index === lines - 1 ? "w-3/4" : "w-full"
            }`}
          />
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className={`${baseClass} ${className}`}>
        <div className="p-6 space-y-4">
          <div className={`${baseClass} h-6 w-1/2`} />
          <div className="space-y-2">
            <div className={`${baseClass} h-4 w-full`} />
            <div className={`${baseClass} h-4 w-3/4`} />
          </div>
          <div className={`${baseClass} h-10 w-1/4`} />
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`${baseClass} h-12 w-12 rounded-full`} />
            <div className="flex-1 space-y-2">
              <div className={`${baseClass} h-4 w-3/4`} />
              <div className={`${baseClass} h-3 w-1/2`} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className={`${baseClass} ${className}`}>
        <div className="p-6">
          <div className={`${baseClass} h-6 w-1/3 mb-6`} />
          <div className="space-y-4">
            <div className="flex items-end space-x-2 h-32">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className={`${baseClass} w-8`}
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
