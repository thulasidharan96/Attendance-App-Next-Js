import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardCards } from "@/components/dashboard/cards";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardSidebar />
      <DashboardHeader />
      
        <WelcomeCard
          name="Ayodele Irepodum"
          message="You have 27 new student added to your domain. Please reach out to the Head Teacher if you want them excluded from your domain."
        />
        <DashboardCards />

    </div>
  );
}
