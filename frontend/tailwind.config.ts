import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          500: "#2563eb",
          700: "#1d4ed8",
          950: "#172554"
        }
      },
      spacing: {
        shell: "1.5rem"
      }
    }
  },
  plugins: []
};

export default config;
