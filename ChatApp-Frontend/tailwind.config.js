/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // adjust this based on your project
  "./public/index.html"
];
export const theme = {
  extend: {},
};
export const plugins = [];

module.exports = {
  theme: {
    extend: {
      animation: {
        darkShift: "shiftDark 6s infinite linear",
        darkFloat: "floatDark 4s infinite ease-in-out",
        lightShift: "shiftLight 6s infinite linear",
        lightFloat: "floatLight 4s infinite ease-in-out",
        textFloat: "floatText 4s infinite ease-in-out",
      },
      keyframes: {
        shiftDark: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(10px)" },
        },
        shiftLight: {
          "0%": { transform: "translateX(-10px)" },
          "100%": { transform: "translateX(10px)" },
        },
        floatDark: {
          "0%": { transform: "translateY(0px) rotate(0deg)" },
          "100%": { transform: "translateY(15px) rotate(5deg)" },
        },
        floatLight: {
          "0%": { transform: "translateY(-10px) rotate(0deg)" },
          "100%": { transform: "translateY(10px) rotate(-5deg)" },
        },
        floatText: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
};



