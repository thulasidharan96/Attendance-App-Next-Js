import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // ✅ Use `useRouter` instead of `Router.push`
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Layout } from "@/components/layout";
import { location } from "@/components/services/location";
import { isAuthenticated } from "@/components/services/auth";

export default function DashboardPage() {
  const [name, setName] = useState("User!");
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/");
      return;
    }

    setName(localStorage.getItem("name") || "User!");

    if (typeof location.tryGetLocation === "function") {
      location.tryGetLocation().then((locData) => {
        console.log("Location found!", locData);
      });
    }
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
