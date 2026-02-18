import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          rose: "#E8B4A0",
          "rose-dark": "#D4A090",
          dark: "#2D2A26",
          "dark-light": "#3D3A36",
          cream: "#FDFBF7",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
      },
      animation: {
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "spin-slow": "spin 6s linear infinite",
        wiggle: "wiggle 2.5s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(6deg)" },
          "75%": { transform: "rotate(-6deg)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(232,180,160,0.3)" },
          to: { boxShadow: "0 0 25px rgba(232,180,160,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
