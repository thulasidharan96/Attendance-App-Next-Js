import { useCallback, useEffect, useState, useMemo } from "react";
import Router from "next/router";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Layout } from "@/components/layout";
import { isAuthenticated } from "@/components/services/auth";
import {
  FIXED_LOCATION,
  PROXIMITY_THRESHOLD,
  getDistance,
} from "@/components/ui/locationBtn";
import { location } from "@/components/services/location";

export default function DashboardPage() {
  const [name, setName] = useState("User!");
  const [locationStatus, setLocationStatus] = useState<
    "unknown" | "nearby" | "far" | "checking"
  >("unknown");

  const handleLocation = useCallback(async () => {
    setLocationStatus("checking");
    try {
      const userLocation = await location.tryGetLocation();
      if (!userLocation) {
        return setLocationStatus("unknown");
      }

      const distance = getDistance(
        userLocation.latitude,
        userLocation.longitude,
        FIXED_LOCATION.latitude,
        FIXED_LOCATION.longitude
      );

      setLocationStatus(distance <= PROXIMITY_THRESHOLD ? "nearby" : "far");
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationStatus("unknown");
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }

    setName(localStorage.getItem("name") || "User!");
    handleLocation();
  }, [handleLocation]);

  const handleAttendance = () => {
    const message =
      locationStatus === "nearby"
        ? "Attendance marked as present"
        : "You are not nearby. Attendance cannot be marked.";
    alert(message);
  };

  const attendanceButtonClass = useMemo(
    () =>
      `flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium shadow-md transition-all text-white w-full md:w-auto ${
        locationStatus === "nearby"
          ? "bg-green-600 hover:bg-green-700"
          : locationStatus === "far"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-gray-600 hover:bg-gray-700"
      }`,
    [locationStatus]
  );

  return (
    <Layout>
      <DashboardHeader />
      <div className="flex flex-wrap gap-4">
        <div className="w-full">
          <WelcomeCard
            name={name}
            message="Welcome to your dashboard. Here you can find all the information you need to manage."
          />
        </div>
        <div className="w-full">
          <DashboardCards />
        </div>
        <div>
          <button onClick={handleAttendance} className={attendanceButtonClass}>
            Attendance
          </button>
        </div>
      </div>
    </Layout>
  );
}
