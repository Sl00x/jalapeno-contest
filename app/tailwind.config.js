module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "red-jalapeno": "#b71540",
        "red-jalapeno-dark": "#9B1337",
        "red-jalapeno-light": "#D1194A",
        "red-jalapeno-lighter": "#FF3E71",
        "gray-light": "#F1F1F1",
        "gray-dark": "#DCDCDC",
        "gray-darker": "#C0C0C0",
      },
    },
  },
  plugins: [],
};
