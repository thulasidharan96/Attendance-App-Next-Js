import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { Layout } from "@/components/layout";

export default function DashboardPage() {
  return (
    <Layout>
      <DashboardHeader />
      <div className="flex flex-wrap gap-4">
        <div className="w-full">
          <WelcomeCard
            name="John Doe"
            message="Welcome to your dashboard. Here you can find all the information you need to manage your college."
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
