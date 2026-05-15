import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F5",
        sand: "#F3EDE6",
        charcoal: "#1C1B1A",
        muted: "#6B6560",
        accent: "#E86B4A",
        "accent-soft": "#F4A574",
        sage: "#7A9E87",
        live: "#34C759",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px rgba(28, 27, 26, 0.08)",
        card: "0 4px 24px rgba(28, 27, 26, 0.06)",
        glow: "0 0 40px rgba(232, 107, 74, 0.15)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
