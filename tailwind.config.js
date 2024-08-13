/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Specify the paths to all of your template files
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode support with the 'class' strategy
  theme: {
    extend: {
      colors: {
        "primary-green": "#09e5ab",
        "nav-border": "#f0f0f0",
        "muted": "#757575",
        "light-gray": "#757575",
        "primary-blue": "#0de0fe",
        "dark-blue": "#15558d",
        "primary-yellow": "#FFAE00",
        "dark-muted": "#9198A6",
        "dark-input-border": "#0D0063",
        "dark-blue-input": "#030017",
        "dark-placeholder": "#84938B",
        "dark-card": "#050021",
        "dark-footer": "#030017",
        "dark-input-text": "#828FA0",
        "modal-heading": "#272b41",
      },
      boxShadow: {
        "light": "2px 2px 13px rgb(0 0 0 / 10%)",
        "input-box": "0px 24px 24px rgb(212 237 255 / 30%)",
      }
    },
  },
  plugins: [], // Add any plugins here if needed
}

