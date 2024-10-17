/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins', 'sans-serif'],
        satoshi:['Satoshi-Medium'],
        satoshiBold:['Satoshi-bold'],
        integral:['integralcf'],
        integral2:['integralcf2'],
        anton: ['Anton', 'sans-serif'],
        starlight: ['startlight', 'sans-serif'],
      },
      screens: {
        'xs': {'max': '500px'}, // Define the custom screen size
        'xxs': {'max': '380px'}, // Define the custom screen size
      },
      rotate: {
        '360': '360deg',
        '-360': '-360deg', // Adding negative rotate
      },
      textShadow: {
        'outline': '2px 2px 0px rgba(0, 0, 0, 1)', // Customize the shadow (stroke) as needed
      },
    },
  },
  plugins: [ require('tailwindcss-textshadow')],
}

