import React from "react";
import { Size } from "../types";

interface LoadingSpinnerProps {
  size?: Size;
  className?: string;
  message?: string;
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  message,
  overlay = false,
}) => {
  const sizeClasses: Record<Size, string> = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`${sizeClass} border-4 border-gray-200 dark:border-gray-600 border-t-indigo-600 rounded-full animate-spin`}
      ></div>
      {message && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 text-center">
          {message}
        </p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
