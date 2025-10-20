import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E865F",
          dark: "#246B4C",
          light: "#3FA675",
        },
        accent: "#1E5A42",
        background: "#F5F5F0",
        muted: "#6B7280",
        success: "#10B981",
        danger: "#EF4444",
        text: {
          DEFAULT: "#1F2937",
          light: "#6B7280",
        },
      },
    },
  },
  plugins: [],
};

export default config;