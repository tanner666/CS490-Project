module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': '#252628',
      },
      fontFamily: {
        'fredoka': ['Fredoka One', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [],
}