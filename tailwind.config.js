/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a457ed",

          secondary: "#ba5b2c",

          accent: "#6b7ace",

          neutral: "#241D25",

          "base-100": "#3C3743",

          info: "#84C6D7",

          success: "#19CC64",

          warning: "#F08F19",

          error: "#E93F6C",
        },
      },
    ],
  },
};
