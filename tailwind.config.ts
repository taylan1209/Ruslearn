import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          dark: "#5146d8",
          light: "#8f88ff"
        },
        secondary: {
          DEFAULT: "#F3F4FF"
        },
        accent: {
          DEFAULT: "#00C6AE"
        }
      },
      boxShadow: {
        card: "0 16px 40px rgba(108, 99, 255, 0.2)",
        soft: "0 10px 30px rgba(15, 23, 42, 0.07)"
      },
      keyframes: {
        pulseCard: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        }
      },
      animation: {
        pulseCard: "pulseCard 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
