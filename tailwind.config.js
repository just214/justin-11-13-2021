const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
        transblack: "rgba(0,0,0,.1)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
