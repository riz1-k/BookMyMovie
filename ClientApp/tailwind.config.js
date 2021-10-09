module.exports = {
  purge: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        nav: '90rem',
      },
      height: {
        poster: '500px',
        posterl: '548px',
        movieposter: '524px',
      },
    },
    color: {
      Horror: 'red',
      'Sci-Fi': 'green',
    },
    fontFamily: {
      poster: ['Montserrat', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '5px 5px 5px 5px rgba(0, 0, 0, 0.3)',
      '3xl': '7px 5px 5px 5px rgba(0, 0, 0, 0.4)',
      '4xl': '1px 0px 10px 10px rgba(152, 154, 158,0.2 )',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {
      margin: ['responsive', 'hover', 'focus', 'group-hover'],
      scale: ['responsive', 'hover', 'focus', 'group-hover'],
      tableLayout: ['hover', 'focus'],
    },
  },
  plugins: [],
};
