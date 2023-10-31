module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': '#252628',
        'light-gray': '#F5F7F9',
      },
      fontFamily: {
        'fredoka': ['Fredoka One', 'sans-serif'],
      }
    },
  },
  variants: {},
  plugins: [],
}