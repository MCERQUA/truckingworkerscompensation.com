import localFont from "next/font/local";

export const bodyFont = localFont({
  src: [
    { path: "./fonts/Inter-variable.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-variable.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Inter-variable.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-variable.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const headingFont = localFont({
  src: [
    { path: "./fonts/BarlowCondensed-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/BarlowCondensed-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/BarlowCondensed-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/BarlowCondensed-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/BarlowCondensed-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/BarlowCondensed-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
});
