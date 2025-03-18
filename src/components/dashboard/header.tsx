"use client";

import { MoonIcon, SunIcon, Bell, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LocationButton from "../ui/locationBtn";
import Image from "next/image";
import Frame from "@/assets/Student_Avatar.svg";
import { useThemeStyles } from "@/components/Hook/useThemeStyles"; // Import the hook

export function DashboardHeader() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isDarkMode, themeStyles } = useThemeStyles();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ✅ Prevent hydration issues

  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center px-6 mb-6 rounded-2xl shadow-md transition-colors duration-300 ${themeStyles.background}`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="w-full max-w-sm ml-12 md:ml-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="search"
              className={`w-full rounded-full p-2 pl-10 text-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-300 ${themeStyles.inputBg}`}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LocationButton />
          <button
            className={`rounded-full p-2 ml-2 transition-colors duration-300 ${themeStyles.text} ${themeStyles.hoverBg}`}
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
          <button
            className={`rounded-full p-2 transition-colors duration-300 ${themeStyles.text} ${themeStyles.hoverBg}`}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <Image
              src={Frame}
              alt="User Avatar"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
