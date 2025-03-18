import { useEffect, useState } from "react";
import Router from "next/router";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Layout } from "@/components/layout";
import { isAuthenticated } from "@/components/services/auth";

export default function DashboardPage() {
  const [name, setName] = useState("User!");

  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }

    setName(localStorage.getItem("name") || "User!");

    
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
      </div>
    </Layout>
  );
}
