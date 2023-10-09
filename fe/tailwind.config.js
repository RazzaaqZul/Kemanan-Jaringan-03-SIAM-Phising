/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "dark-blue": "#115599",
      purple: "#d8b4fe",
      white: "#FFFFFF",
      grey: "#CCCCCC",
      "blue-placeholder": "#E8F0FE",
      yellow: "#FFC107",
      orange: "#ED8B00",
      red: "#E82937",
      "blue-text": "#003153",
      "red-error-text": "#AA0041",
      "blue-link": "#007BFF",
    },
    screens: {
      xs: "0px",
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      dekstop: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
};
