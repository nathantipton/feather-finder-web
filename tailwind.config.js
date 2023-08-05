/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
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
      'dark',
    ],
  },
  plugins: [
    require('daisyui')
  ],
}

