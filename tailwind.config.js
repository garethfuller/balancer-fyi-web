module.exports = {
  purge: {
    enabled: false
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      green: {
        50: '#5bfdc9',
        100: '#51f3bf',
        200: '#47e9b5',
        300: '#3ddfab',
        400: '#33d5a1',
        500: '#29cb97',
        600: '#1fc18d',
        700: '#15b783',
        800: '#0bad79',
        900: '#01a36f'
      },
      purple: {
        50: '#e78aff',
        100: '#dd80ff',
        200: '#d376ff',
        300: '#c96cff',
        400: '#bf62ff',
        500: '#b558f6',
        600: '#ab4eec',
        700: '#a144e2',
        800: '#973ad8',
        900: '#8d30ce'
      },
      red: {
        50: '#ff8a92',
        100: '#ff8088',
        200: '#ff767e',
        300: '#ff6c74',
        400: '#ff626a',
        500: '#f65860',
        600: '#ec4e56',
        700: '#e2444c',
        800: '#d83a42',
        900: '#ce3038'
      },
      blue: {
        50: '#72a4ff',
        100: '#689aff',
        200: '#5e90ff',
        300: '#5486ff',
        400: '#4a7cf8',
        500: '#4072ee',
        600: '#3668e4',
        700: '#2c5eda',
        800: '#2254d0',
        900: '#184ac6'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
