"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Load specific font weights
  display: "swap",
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen rounded-2xl ${inter.className}`}>
      <div className="flex w-full h-screen">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto m-2 lg:m-2 p-2">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </main>
      </div>
    </div>
  );
}
