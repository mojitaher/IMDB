const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        poppin: ["poppin", "sans-serif"],
      },
      colors: {
        primary: ["rgba(90, 74, 244, 1)"],
        dark: ["rgba(18, 24, 41, 1)"],
        dark_a: ["rgba(0, 0, 0, 0.65)"],
        bg_card: [" rgba(32, 40, 62, 0.8)"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
