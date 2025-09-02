import React from "react";
import { FaGlobe, FaChartLine, FaDatabase, FaCode } from "react-icons/fa";
import { IconType } from "react-icons";

interface Feature {
  title: string;
  description: string;
  icon: IconType;
}

const AboutPage: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Global City Data",
      description:
        "Compare cities from around the world with comprehensive data on quality of life and cost of living.",
      icon: FaGlobe,
    },
    {
      title: "Data Visualization",
      description:
        "Interactive charts and visual comparisons make it easy to understand complex city metrics at a glance.",
      icon: FaChartLine,
    },
    {
      title: "Reliable Data Sources",
      description:
        "Our data is sourced from reputable global indices and regularly updated to ensure accuracy.",
      icon: FaDatabase,
    },
    {
      title: "Open Source",
      description:
        "This project is built with open-source technologies and is continuously improved.",
      icon: FaCode,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          About CityCompare
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          CityCompare helps you make informed decisions about where to live by
          providing comprehensive comparisons of cities around the world.
          Whether you're planning to relocate for work, study, or simply seeking
          a change of scenery, our platform offers valuable insights into
          quality of life and cost of living metrics.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          How It Works
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          CityCompare aggregates data from various sources to provide a
          comprehensive view of cities worldwide. Our platform allows you to:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            Compare quality of life metrics such as happiness, safety, and
            healthcare
          </li>
          <li>
            Analyze cost of living data including rent, food, transportation,
            and more
          </li>
          <li>View side-by-side comparisons of multiple cities</li>
          <li>Make data-driven decisions about where to live or travel</li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Data Sources
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our data is sourced from reputable global indices and databases,
          including:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>World Happiness Report</li>
          <li>Quality of Life Indices</li>
          <li>Cost of Living Databases</li>
          <li>Safety and Crime Statistics</li>
          <li>Healthcare Quality Metrics</li>
          <li>Climate and Environmental Data</li>
        </ul>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          We regularly update our database to ensure the most current
          information is available to our users.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
