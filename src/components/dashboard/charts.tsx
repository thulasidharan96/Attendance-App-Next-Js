"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function DashboardCharts() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration issues

  const isDarkMode = resolvedTheme === "dark";

  const themeColors = {
    text: isDarkMode ? "#E5E7EB" : "#1F2937",
    grid: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
    background: isDarkMode ? "#1F2937" : "#FFFFFF",
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: themeColors.text,
          font: { size: 12 },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: themeColors.text },
        grid: { color: themeColors.grid },
      },
      x: {
        ticks: { color: themeColors.text },
        grid: { color: themeColors.grid },
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: "bottom" as const,
        labels: { color: themeColors.text },
      },
    },
    cutout: "70%",
  };

  const doughnutData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#22C55E", "#EF4444"],
        hoverBackgroundColor: ["#16A34A", "#DC2626"],
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance %",
        data: [90, 85, 88, 92, 87, 91],
        backgroundColor: isDarkMode ? "#818CF8" : "#6366F1",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Doughnut Chart */}
      <div
        className={`p-4 rounded-xl shadow-lg border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <h3
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          } mb-4`}
        >
          Attendance History
        </h3>

        <div className="flex justify-center">
          <div className="h-64 w-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div
        className={`p-4 rounded-xl shadow-lg border ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-300"
        }`}
      >
        <div className="flex flex-row items-center justify-between mb-4">
          <h3
            className={`text-lg font-medium ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            School Analytics
          </h3>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              className="px-2 py-1 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
              disabled
            >
              This Month
            </button>
          </div>
        </div>
        <div className="h-[300px]">
          <Bar data={barData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
