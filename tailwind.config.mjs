import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-main-light": "#2B7FFF",
        "color-main": "#2872DF",
        "color-gray": "#9399A5",
        "color-bg-main": "#111827",
        "color-bg-main-light": "#1F2937",
      },
    },
  },
  plugins: [daisyui],
};
