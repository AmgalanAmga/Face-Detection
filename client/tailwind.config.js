/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        backImage: "url('/src/assets/facedots.jpeg')",
        authBackImage: "url('/src/assets/squares.jpeg')",
      },
      boxShadow: {
        loginInput: "0 0 5px #60a6fa",
      },
    },
  },
  plugins: [],
};
