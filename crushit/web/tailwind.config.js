module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'custom-gray': '#252628',
        'light-gray': '#F5F7F9',
        'dark-gray': '#3E3F42',
        'almost-black': '#1F1F1F',
        
      },
      fontFamily: {
        'fredoka': ['Fredoka One', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      colors:{
        'task-blue': '#6284FF',
      }
    },
  },
  variants: {},
  plugins: [],
}