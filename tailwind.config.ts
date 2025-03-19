/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "640px", // Small screens (default)
        md: "768px", // Medium screens (default)
        lg: "1024px", // Large screens (default)
        xl: "1280px", // Extra Large
        "2xl": "1536px", // 2XL screens
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        sidebar: {
          icon: "var(--sidebar-icon)",
          "icon-active": "var(--sidebar-icon-active)",
          "icon-hover": "var(--sidebar-icon-hover)",
          "bg-hover": "var(--sidebar-bg-hover)",
          "bg-active": "var(--sidebar-bg-active)",
        },
        purple1: {
          DEFAULT: "var(--purple1)",
          light: "var(--purple1-light)",
          dark: "var(--purple1-dark)",
          darkest: "var(--purple1-darkest)",
        },
      },
    },
  },
  plugins: [],
};
