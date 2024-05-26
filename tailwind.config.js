export default {
  content: [
    "./index.html",
    "src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': '12rem auto',
      }
    },
  },
  plugins: [],
}