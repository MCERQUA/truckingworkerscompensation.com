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
        // Brand ramp was navy; now rust (Josh: no blue).
        // #9A3F18 is 6.8:1 on white; white text on it 6.8:1.
        clay: {
          DEFAULT: "#9A3F18",
          dark: "#6B2F14",
          light: "#B4460F",
          50: "#FBEFE6",
          100: "#F6D9C4",
          200: "#EDB795",
          300: "#E08A55",
          400: "#CC6428",
          500: "#B4460F",
          600: "#9A3F18",
          700: "#6B2F14",
          800: "#4A2010",
          900: "#2A1208",
        },
        // Was a darker navy ramp (unused by any class); now forest green.
        sage: {
          DEFAULT: "#1F4A2E",
          dark: "#14331F",
          light: "#2F6B3E",
          50: "#EEF5EF",
          100: "#D6E8DA",
          200: "#AED0B7",
          300: "#82B58F",
          400: "#4A8B58",
          500: "#2F6B3E",
          600: "#1F4A2E",
          700: "#14331F",
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
          "linear-gradient(180deg, #F8F9FB 0%, #EEF1F6 40%, #FBEFE6 70%, #F8F9FB 100%)",
        "warm-radial":
          "radial-gradient(circle at 30% 20%, rgba(154,63,24,0.10) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(232,160,32,0.06) 0%, transparent 55%)",
        "clay-gradient": "linear-gradient(135deg, #9A3F18 0%, #B4460F 100%)",
        "sage-gradient": "linear-gradient(135deg, #14331F 0%, #1F4A2E 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8A020 0%, #F5B840 100%)",
      },
      boxShadow: {
        warm: "0 10px 40px -15px rgba(154,63,24,0.28), 0 4px 12px -6px rgba(10,25,41,0.10)",
        "warm-lg": "0 30px 70px -20px rgba(154,63,24,0.34), 0 10px 30px -10px rgba(10,25,41,0.12)",
        card: "0 2px 8px -2px rgba(10,25,41,0.08), 0 1px 3px -1px rgba(10,25,41,0.04)",
        "card-hover": "0 20px 50px -15px rgba(154,63,24,0.28), 0 8px 20px -8px rgba(10,25,41,0.12)",
        arch: "inset 0 -8px 30px -10px rgba(154,63,24,0.12)",
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
