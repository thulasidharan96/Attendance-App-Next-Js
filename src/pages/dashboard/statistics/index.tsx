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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import Router from "next/router";
import { isAuthenticated } from "@/components/services/auth";
import { UserApi } from "@/pages/api/User";
import { format, parseISO } from "date-fns";

interface AttendanceData {
  dateOnly: string;
  attendanceStatus: string;
}

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

const transformDataByMonth = (data: AttendanceData[]) => {
  const monthData: Record<string, number> = {};
  data.forEach(({ dateOnly, attendanceStatus }) => {
    const month = format(parseISO(dateOnly), "MMM yyyy");
    if (!(month in monthData)) monthData[month] = 0;
    if (attendanceStatus === "present") monthData[month] += 1;
  });
  return Object.entries(monthData)
    .map(([month, attendance]) => ({ month, attendance }))
    .sort(
      (a, b) =>
        new Date(`01 ${a.month}`).getTime() -
        new Date(`01 ${b.month}`).getTime()
    );
};

const Index: React.FC = () => {
  const [attendanceData, setAttendanceData] = useState<
    { month: string; attendance: number }[]
  >([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }

    const fetchAttendance = async () => {
      try {
        const response = await UserApi();
        if (response?.data) {
          setAttendanceData(transformDataByMonth(response.data));
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <Layout>
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Attendance Overview
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="month" fontSize={14} tick={{ fill: "#333" }} />
              <YAxis fontSize={14} tick={{ fill: "#333" }} />
              <Tooltip
                contentStyle={{ borderRadius: "10px", background: "white" }}
              />
              <Legend />
              <Bar
                dataKey="attendance"
                fill="#2563eb"
                name="Total Present"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Leave Distribution
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {leaveChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Activity Performance
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={110} data={radarChartData}>
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
          </ResponsiveContainer>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
