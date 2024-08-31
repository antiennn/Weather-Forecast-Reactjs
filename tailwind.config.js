/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "gray-900": "#1a202c",
        "gray-800": "#2d3748",
        "gray-100": "#f7fafc",
        white: "#ffffff",
        "yellow-400": "#fbd38d",
        "yellow-500": "#f6e05e",
        "yellow-600": "#ecc94b",
        "blue-500": "#3182ce",
        "blue-600": "#2b6cb0",
        "blue-700": "#2c5282",
      },
      textColor: {
        white: "#ffffff",
        "gray-100": "#f7fafc",
        "gray-700": "#4a5568",
        "gray-800": "#2d3748",
      },
    },
  },
  plugins: [],
};
