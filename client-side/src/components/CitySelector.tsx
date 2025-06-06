import React, { useState, useRef, useEffect } from "react";
import { useCity } from "../hooks";
import { FaChevronDown, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

interface CitySelectorProps {
  label: string;
  value: string;
  onChange: (city: string) => void;
  excludeCity?: string | null;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  label,
  value,
  onChange,
  excludeCity = null,
}) => {
  const { cities } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter out the excluded city if provided
  const filteredCities = excludeCity
    ? cities.filter((city) => city.city !== excludeCity)
    : cities;

  // Filter cities based on search term
  const searchFilteredCities = filteredCities.filter(
    (city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get selected city display text
  const selectedCity = filteredCities.find((city) => city.city === value);
  const displayText = selectedCity
    ? `${selectedCity.city.charAt(0).toUpperCase() + selectedCity.city.slice(1)} (${selectedCity.country.charAt(0).toUpperCase() + selectedCity.country.slice(1)})`
    : "Select a city";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCitySelect = (cityName: string) => {
    onChange(cityName);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="mb-6" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {/* Custom Select Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border-2 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            isOpen
              ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt
                className={`text-sm ${value ? "text-indigo-500" : "text-gray-400"}`}
              />
              <span
                className={`${value ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              >
                {displayText}
              </span>
            </div>
            <FaChevronDown
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-600">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto">
              {searchFilteredCities.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                  No cities found
                </div>
              ) : (
                searchFilteredCities.map((city) => (
                  <button
                    key={city.city}
                    type="button"
                    onClick={() => handleCitySelect(city.city)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3 ${
                      value === city.city
                        ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    <FaMapMarkerAlt
                      className={`text-sm ${value === city.city ? "text-indigo-500" : "text-gray-400"}`}
                    />
                    <div>
                      <div className="font-medium">
                        {city.city.charAt(0).toUpperCase() + city.city.slice(1)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {city.country.charAt(0).toUpperCase() +
                          city.country.slice(1)}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySelector;
