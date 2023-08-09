/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["'Bebas Neue'", 'sans-serif'],
      },
      height: {
        'screen-safe': '100svh',
      },
      minHeight: {
        'screen-safe': '100svh',
      }
    },
  },
  daisyui: {
    themes: [
        {
          'light': {
            primary: '#ff6a00',
            'primary-focus': '#ff5500', // slightly darker shade for focus
            'primary-content': '#ffffff', // text color on primary color
            secondary: '#ee0979',
            'secondary-focus': '#dd006a', // slightly darker shade for focus
            'secondary-content': '#ffffff', // text color on secondary color
            info: '#2094f3',
            success: '#009485',
            warning: '#ff9900',
            error: '#ff504d',
          },
          'dark': {
            primary: '#ff6a00',
            'primary-focus': '#ff5500',
            'primary-content': '#ffffff',
            secondary: '#ee0979',
            'secondary-focus': '#dd006a',
            'secondary-content': '#ffffff',
            info: '#2094f3',
            success: '#009485',
            warning: '#ff9900',
            error: '#ff504d',
            'base-100': '#1a1a1a', // background
            'base-200': '#2a2a2a', // card, modal background
            'base-300': '#3a3a3a', // input background, dropdown background
            'base-content': '#eaeaea', // text color
          },
        },
      ],
  },
  plugins: [
    require('daisyui')
  ],
}

