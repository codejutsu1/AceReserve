/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'hero' : "url('~/assets/images/hero(1).jpg')",
        'flight' : "url('~/assets/images/flight(1).jpg')"
      },
      fontFamily : {
        'poppins' : ['poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

