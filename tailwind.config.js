const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.trueGray,
      },
      gridTemplateColumns: {
        sidebar: '250px auto',
      },
      keyframes: {
        spinCenter: {
          'from': { transform: 'rotate(0deg) translateY(-50%)' },
          'to': { transform: 'rotate(360deg) translateY(-50%)' },
        }
      },
      animation: {
        'spin-center': 'spinCenter 1s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
