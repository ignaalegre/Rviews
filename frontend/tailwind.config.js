import flowbiteReact from 'flowbite-react/plugin/tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', '.flowbite-react/class-list.json'],
  theme: {
    extend: {
      colors: {
        // Override primary colors
        primary: {
          50: '#eff6ff',
          100: '#accbee',
          200: '#asc4e4',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#a5f3fc',
          800: '#0284c7',
          900: '#0369a1',
        },
      },
    },
  },
  plugins: [flowbiteReact],
}
