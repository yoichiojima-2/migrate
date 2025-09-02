import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ComparisonChartProps {
  title?: string;
  labels: string[];
  datasets: ChartData<"bar">["datasets"];
  className?: string;
  horizontal?: boolean;
  height?: number;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title,
  labels,
  datasets,
  className = "",
  horizontal = false,
  height = 300,
}) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data: ChartData<"bar"> = {
    labels,
    datasets,
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}
    >
      <div style={{ height: `${height}px` }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default ComparisonChart;
