import { useEffect, useState } from "react";
// import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Layout } from "@/components/layout";

export default function DashboardPage() {
  const [name, setName] = useState("User!");

  useEffect(() => {
    setName(localStorage.getItem("name") || "User!");
  }, []);

  return (
    <Layout>
      {/* <DashboardHeader /> */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full">
          <WelcomeCard
            name={name}
            message="Welcome to Admin dashboard. Here you can find all the information you need to manage."
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
