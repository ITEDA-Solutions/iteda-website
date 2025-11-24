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
        // Primary Colors
        primary: {
          DEFAULT: "#028037", // Primary Green
          dark: "#01443e",    // Dark Teal (Secondary)
          light: "#2E9F5F",   // Lighter shade of primary green
        },
        // Accent Colors
        accent: {
          DEFAULT: "#FCD85D", // Primary Yellow
          gold: "#aa9241",    // Secondary Gold
        },
        // Neutral Colors
        black: "#060606",     // Primary Black
        background: "#FFFFFF", // White background
        muted: "#6B7280",     // Gray for muted text
        // Status Colors
        success: "#028037",   // Use primary green
        danger: "#EF4444",    // Red for errors
        warning: "#FCD85D",   // Use primary yellow
        // Text Colors
        text: {
          DEFAULT: "#060606", // Primary black for text
          light: "#6B7280",   // Gray for secondary text
          muted: "#9CA3AF",   // Lighter gray
        },
        // Border Colors
        border: "#E5E7EB",    // Light gray for borders
      },
    },
  },
  plugins: [],
};

export default config;