/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": "#86efac",
        "secondary-blue": "#bfdbfe",
        "thrid-yellow": "#fef08a",
      },
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [],
};
