/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],   // Default body font
        heading: ['Poppins', 'sans-serif'], // For headings
      },
    },
  },
  plugins: [],
}

