import type { Config } from "tailwindcss";

/* ============================================================
   TRUCKING WC — "Navy & Highway Gold" palette
   clay = navy blue (primary) · sage = dark navy · gold = highway gold
   cream = light steel · sand = pale gray-blue
   ============================================================ */

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F9FB",
        sand: "#EEF1F6",
        white: "#FFFFFF",
        adobe: "#D0D8E8",
        adobeDark: "#B8C4D8",
        clay: {
          DEFAULT: "#1C3557",
          dark: "#142741",
          light: "#2A4D7E",
          50: "#EBF0F8",
          100: "#D0DCF0",
          200: "#A2BAE1",
          300: "#7398D2",
          400: "#4576C3",
          500: "#2A4D7E",
          600: "#1C3557",
          700: "#142741",
          800: "#0D1B2C",
          900: "#060E17",
        },
        sage: {
          DEFAULT: "#142741",
          dark: "#0A1929",
          light: "#1C3557",
          50: "#E8EDF5",
          100: "#C8D4E8",
          200: "#90A9D1",
          300: "#587EBA",
          400: "#2A4D7E",
          500: "#1C3557",
          600: "#142741",
          700: "#0A1929",
        },
        gold: {
          DEFAULT: "#E8A020",
          dark: "#C88010",
          light: "#F5B840",
          50: "#FEF7E8",
          100: "#FDECC8",
          200: "#FAD990",
          300: "#F6C258",
          400: "#F5B840",
          500: "#E8A020",
          600: "#C88010",
          700: "#A06008",
        },
        espresso: "#0A1929",
        cocoa: "#1A2E47",
        mocha: "#4A6080",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "2rem 2rem 2rem 2rem",
        arch2: "2.5rem 2.5rem 1.5rem 1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backgroundImage: {
        "sunrise-bands":
          "linear-gradient(180deg, #F8F9FB 0%, #EEF1F6 40%, #EBF0F8 70%, #F8F9FB 100%)",
        "warm-radial":
          "radial-gradient(circle at 30% 20%, rgba(28,53,87,0.10) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,160,32,0.06) 0%, transparent 55%)",
        "clay-gradient": "linear-gradient(135deg, #1C3557 0%, #2A4D7E 100%)",
        "sage-gradient": "linear-gradient(135deg, #0A1929 0%, #142741 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8A020 0%, #F5B840 100%)",
      },
      boxShadow: {
        warm: "0 10px 40px -15px rgba(28,53,87,0.28), 0 4px 12px -6px rgba(10,25,41,0.10)",
        "warm-lg": "0 30px 70px -20px rgba(28,53,87,0.34), 0 10px 30px -10px rgba(10,25,41,0.12)",
        card: "0 2px 8px -2px rgba(10,25,41,0.08), 0 1px 3px -1px rgba(10,25,41,0.04)",
        "card-hover": "0 20px 50px -15px rgba(28,53,87,0.28), 0 8px 20px -8px rgba(10,25,41,0.12)",
        arch: "inset 0 -8px 30px -10px rgba(28,53,87,0.12)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "slow-zoom": { "0%, 100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.05)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "arch-rise": { "0%": { transform: "scaleY(0.6)", opacity: "0", transformOrigin: "bottom" }, "100%": { transform: "scaleY(1)", opacity: "1", transformOrigin: "bottom" } },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "slow-zoom": "slow-zoom 20s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "arch-rise": "arch-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
