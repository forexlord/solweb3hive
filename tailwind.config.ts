import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90.02deg, #202227 0.01%, rgba(38, 41, 47, 0.8) 47.76%, #202227 99.11%)',
      },
    },
  },
  darkMode: 'class', 
  plugins: [],
};
export default config;
