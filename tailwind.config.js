/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/(root)/**/*.{js,jsx,ts,tsx}",
    "./app/(root)/(tabs)/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "san-serif"],
        "rubik-bold": ["Rubik-Bold", "san-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "san-serif"],
        "rubik-medium": ["Rubik-Medium", "san-serif"],
        "rubik-light": ["Rubik-Light", "san-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "san-serif"],
      },
      colors: {
        primary: {
          100: "#0061ff0a",
          200: "#0061ff1a",
          300: "#0061ff",
        },
        accent: {
          100: "#fbfbfd",
        },
        black: {
          DEFAULT: "#000000",
          100: "#8C8E98",
          200: "#666876",
          300: "#191D31",
        },
        danger: "#f75555",
      },
    },
  },
  plugins: [],
};
