/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "sm-1": " 0.7rem",
      "sm-2": " 0.65rem",
      "sm-3": " 0.6rem",
      "sm-4": " 0.5.5rem",
      "sm-5": " 0.5rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: " 1.25rem",
      "2xl": "1.5rem",
    },
    extend: {
      colors: {
        "main-background": "#3E503C",
        "nav-background": "#F6F7FB",
        number: "#E16162",
        "background-sort": "#f9bc60",
        "search-background": "rgba(235, 239, 238, 0.9)",
        green: "#5B8151",
        grey: "rgba(0, 30, 29, 0.55)",
        green2: "#8DC57F",
        tertiary: "#e16162",
        "chip-text": "#173140",
        
      },
      textColor:{
        "greenish-grey": "rgba(53, 105, 102, 0.75)",
        "description": "#001E1D",
        tertiary: "#e16162",
      },
      backgroundColor: {
        main: "#F1F4F0",
        "chip-grey": "rgba(53, 105, 102, 0.25)",
        'button-yellow': "#F9BC60"
      },
      borderColor:{
        'button-yellow': "#F9BC60"
      }
    },
  },
  plugins: [],
};
