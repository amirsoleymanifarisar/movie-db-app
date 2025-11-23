module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        night: {
          900: "#0B0B0B",
          800: "#1A1A1A",
          700: "#232323",
          600: "#2A2A2A",
          500: "#333333",
        },
      },
    },
  },
  plugins: [],
};
