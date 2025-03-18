"use client";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className={`flex min-h-screen ${inter.className}`}>
        <div className="flex w-full h-screen overflow-hidden">
          {" "}
          {/* ✅ Fix scroll issue */}
          <DashboardSidebar />
          <main className="flex-1 m-2 lg:m-2 p-2">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
