/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#303030',
          dark: '#FDFDFD'
        },
        secondary: {
          DEFAULT: '#FDFDFD',
          dark: '#B0B0B0'
        },
        bgColor: {
          DEFAULT: '#FDFDFD',
          dark: '#303030'
        },
        bgHeader:{
          DEFAULT: '#FDFDFD',
          dark: '#B0B0B0'
        },
        accent: {
          DEFAULT: '#019875',
          dark: '#017A64'
        },
        button:{
          '1': {
            DEFAULT: '#78D5FF',
            dark: '#62C3E8',
          },
          '2': {
            DEFAULT: '#4DB79F',
            dark: '#3A957F'
          },
          '3': {
            DEFAULT: '#F2BA7A',
            dark: '#D59A5F'
          }
        },
        arrow: {
          '1': {
            DEFAULT: '#62C3E8',
            dark: '#1DB9FF'
          },
          '2': {
            DEFAULT: '#3A957F',
            dark: '#017A64'
          },
          '3': {
            DEFAULT: '#D59A5F',
            dark: '#C57F2A'
          }
        },
        fontFamily: {
          adobe: ['adobe-garamond-pro', 'sans-serif'],
          noto: ['noto-serif-hebrew', 'sans-serif'],
        }
      }
    },
  },
  plugins: [],
}