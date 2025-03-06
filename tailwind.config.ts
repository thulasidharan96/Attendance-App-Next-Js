/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        iosevka: ["Iosevka Term Curly"],
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
        base: {
          green: {
            DEFAULT: "var(--base-green)",
            light: "var(--base-green-light)",
            dark: "var(--base-green-dark)",
            darkest: "var(--base-green-darkest)",
          },
          amber: {
            DEFAULT: "var(--base-amber)",
          },
          amber2: {
            DEFAULT: "var(--base-amber2)",
          },
          amber3: {
            DEFAULT: "var(--base-amber3)",
          },
          blue: {
            DEFAULT: "var(--base-blue)",
          },
          gray: {
            DEFAULT: "var(--base-gray)",
          },
          failed: {
            DEFAULT: "var(--base-failed)",
          },
          pink: {
            DEFAULT: "var(--base-pink)",
          },
        },
        heading: {
          foreground: "var(--heading-foreground)",
        },
        text: {
          foreground: "var(--text-foreground)",
          dropdown: "var(--text-dropdown)",
        },
        tab: {
          background: "var(--tab-background)",
          text: "var(--tab-text)",
        },
        pie: {
          ring: {
            background: "var(--pie-ring-background)",
          },
        },
      },
    },
  },
  plugins: [],
};
