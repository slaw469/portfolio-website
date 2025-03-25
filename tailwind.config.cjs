/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#121212",         // Dark background (nearly black)
        secondary: "#8a8a8a",       // Medium gray for secondary text
        tertiary: "#1a1a1a",        // Slightly lighter dark for cards
        "black-100": "#232323",     // Softer dark for hover states
        "black-200": "#1d1d1d",     // Another dark tone for variety
        "white-100": "#f3f3f3",     // Off-white for text
        accent: "#ffffff",          // White accent color for highlights
      },
      boxShadow: {
        card: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",  // More subtle shadow
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "none",     // Removing the pattern background
      },
    },
  },
  plugins: [],
};