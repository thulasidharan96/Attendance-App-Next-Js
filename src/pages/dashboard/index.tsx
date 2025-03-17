import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Layout } from "@/components/layout";
import { location } from "@/components/services/location";
import { isAuthenticated } from "@/components/services/auth";
import Router from "next/router";

export default function DashboardPage() {
  const [name, setName] = useState("User!");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("AuthToken") || "";
    console.log(token);

    if (isAuthenticated(token)) {
      setAuth(true);
    } else {
      Router.push("/");
    }
    setName(localStorage.getItem("name") || "User!");
    location.tryGetLocation();
  }, []);
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
        <div className="flex justify-between w-full"></div>
      </div>
    </Layout>
  );
}
