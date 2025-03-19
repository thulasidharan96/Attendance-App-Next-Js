import { DashboardHeader } from "@/components/dashboard/header";
import { Layout } from "@/components/layout";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card } from "@/components/ui/card";

const chartData = [
  {
    month: "Jan",
    attendance: 90,
    sickLeave: 2,
    casualLeave: 3,
    marks: 85,
    activity: 70,
  },
  {
    month: "Feb",
    attendance: 80,
    sickLeave: 4,
    casualLeave: 6,
    marks: 78,
    activity: 75,
  },
  {
    month: "Mar",
    attendance: 95,
    sickLeave: 1,
    casualLeave: 1,
    marks: 88,
    activity: 80,
  },
  {
    month: "Apr",
    attendance: 85,
    sickLeave: 3,
    casualLeave: 5,
    marks: 82,
    activity: 85,
  },
  {
    month: "May",
    attendance: 92,
    sickLeave: 2,
    casualLeave: 2,
    marks: 90,
    activity: 90,
  },
];

const leaveChartData = [
  { name: "Sick Leave", value: 12, color: "#ff5e57" },
  { name: "Casual Leave", value: 17, color: "#feca57" },
];

const radarChartData = [
  { subject: "Math", marks: 85, fullMark: 100 },
  { subject: "Science", marks: 78, fullMark: 100 },
  { subject: "English", marks: 92, fullMark: 100 },
  { subject: "History", marks: 80, fullMark: 100 },
  { subject: "Sports", marks: 95, fullMark: 100 },
];

const Index = () => {
  const [chartSize, setChartSize] = useState({ width: 400, height: 250 });

  useEffect(() => {
    const handleResize = () => {
      setChartSize({ width: window.innerWidth < 768 ? 300 : 400, height: 250 });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 p-4 min-h-screen overflow-auto">
        {/* Attendance Bar Chart */}
        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Attendance Overview
          </h1>
          <BarChart
            width={chartSize.width}
            height={chartSize.height}
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" fontSize={14} tick={{ fill: "#333" }} />
            <YAxis fontSize={14} tick={{ fill: "#333" }} />
            <Tooltip
              wrapperStyle={{
                borderRadius: "10px",
                background: "white",
                padding: "5px",
              }}
            />
            <Legend />
            <Bar
              dataKey="attendance"
              fill="#2563eb"
              name="Attendance"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </Card>

        {/* Leave Distribution */}
        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Leave Distribution
          </h1>
          <PieChart width={chartSize.width} height={chartSize.height}>
            <Pie
              data={leaveChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {leaveChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Card>

        {/* Marks Trend */}
        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Marks Trend
          </h1>
          <LineChart
            width={chartSize.width}
            height={chartSize.height}
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" fontSize={14} tick={{ fill: "#333" }} />
            <YAxis fontSize={14} tick={{ fill: "#333" }} />
            <Tooltip
              wrapperStyle={{
                borderRadius: "10px",
                background: "white",
                padding: "5px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="marks"
              stroke="#82ca9d"
              strokeWidth={3}
              name="Marks"
              dot={{ stroke: "#82ca9d", strokeWidth: 2 }}
            />
          </LineChart>
        </Card>

        {/* Activity Performance */}
        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Activity Performance
          </h1>
          <RadarChart
            outerRadius={90}
            width={chartSize.width}
            height={chartSize.height}
            data={radarChartData}
          >
            <PolarGrid stroke="#ddd" />
            <PolarAngleAxis
              dataKey="subject"
              fontSize={14}
              tick={{ fill: "#333" }}
            />
            <PolarRadiusAxis fontSize={14} tick={{ fill: "#333" }} />
            <Radar
              name="Marks"
              dataKey="marks"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
