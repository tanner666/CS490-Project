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
        'date-nav-bar': '#293654',
        'transparent-blue': 'rgba(98, 132, 255, 0.15)',

      },
      fontFamily: {
        'fredoka': ['Fredoka One', 'sans-serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
      colors:{
        'task-blue': '#6284FF',
        'bar-grey': '#E2EAF1',
        'task-black': '#1F1F1F',
        'timer-orange': '#FE754D',
        'notes-grey': '#545454',
      },
      backgroundImage: {
        'winter': "[url('/snow_background.jpeg')]",
      },
      margin: {
        '-25px': '-25px',
      },
    },
    scrollbar: (theme) => ({
      thumb: {
        'rounded': 'rounded',
      },
    }),
  },
  variants: {},
  plugins: [
    require("tailwind-scrollbar")
  ],
}