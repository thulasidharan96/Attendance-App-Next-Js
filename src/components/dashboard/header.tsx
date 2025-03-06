"use client";

import { MoonIcon, SunIcon, Bell, Search, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DashboardHeader() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration issues

  const isDarkMode = resolvedTheme === "dark";

  const themeStyles = {
    background: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    text: isDarkMode ? "text-gray-300" : "text-gray-700",
    hoverBg: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
    inputBg: isDarkMode
      ? "bg-gray-700 border-gray-600"
      : "bg-gray-100 border-gray-300",
    inputText: isDarkMode ? "text-white" : "text-gray-900",
  };

  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center px-6 mb-6 rounded-2xl shadow-md transition-colors duration-300 ${themeStyles.background}`}
    >
      <div className="flex w-full items-center justify-between">
        {/* Search Bar */}
        <div className="w-full max-w-sm ml-12 md:ml-0 ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="search"
              className={`w-full rounded-full p-2 pl-10 text-sm focus:border-purple-500 focus:ring-purple-500 transition-colors duration-300 ${themeStyles.inputBg} ${themeStyles.inputText}`}
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center gap-4 ">
          {/* Theme Toggle */}
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

          {/* Notifications */}
          <button
            className={`rounded-full p-2 transition-colors duration-300 ${themeStyles.text} ${themeStyles.hoverBg}`}
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </button>

          {/* Profile Icon */}
          <div className="relative h-8 w-8 overflow-hidden rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </header>
  );
}
