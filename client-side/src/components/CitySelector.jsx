import { useCityContext } from '../context/CityContext';

const CitySelector = ({ label, value, onChange, excludeCity = null }) => {
  const { cities } = useCityContext();

  // Filter out the excluded city if provided
  const filteredCities = excludeCity 
    ? cities.filter(city => city.city !== excludeCity)
    : cities;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 dark:border-gray-600"
      >
        <option value="">Select a city</option>
        {filteredCities.map((city) => (
          <option key={city.city} value={city.city}>
            {city.city.charAt(0).toUpperCase() + city.city.slice(1)} ({city.country.charAt(0).toUpperCase() + city.country.slice(1)})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
