"use client";

import { useTheme } from "next-themes";

export function useThemeStyles() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return {
    isDarkMode,
    themeStyles: {
      background: isDarkMode ? "bg-gray-900" : "bg-gray-50",
      border: isDarkMode ? "border-gray-700" : "border-gray-200",
      text: isDarkMode ? "text-gray-300" : "text-gray-700",
      hoverBg: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
      inputBg: isDarkMode
        ? "bg-gray-700 border-gray-600 text-white"
        : "bg-gray-100 border-gray-300 text-gray-900",
    },
  };
}
