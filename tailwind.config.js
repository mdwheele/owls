module.exports = {
  theme: {
    extend: {
      colors: {
        'semi-75': 'rgba(0, 0, 0, 0.75)',
      },
      boxShadow: {
        window: '0 0 30px -10px rgba(0, 0, 0, 0.75)'
      }
    },
  },
  variants: {
    display: ['responsive', 'hover', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
}
