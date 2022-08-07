/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation:{
        fadeIn: "fade-in .5s ease forwards",
        fadeOut: "fade-in .5s ease reverse",
        slideRight: "slide-right .5s ease forwards",
      },

      keyframes:{
        "fade-in": {
          "0%": {opacity:0},
          "100%": {opacity:1}
        },
        "slide-right": {
          "0%": {transform: "translateX(-100%)" },
          "100%": {transform:" translateX(0)" }          
        }
      }
    },
  },
  plugins: [],
}
