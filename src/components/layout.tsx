"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen rounded-2xl">
      <div className="flex w-full h-screen">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto m-2 lg:m-2 p-2">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </main>
      </div>
    </div>
  );
}
