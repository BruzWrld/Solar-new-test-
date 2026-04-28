/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
      },
      boxShadow: {
        glow: '0 0 120px rgba(59,130,246,0.15)',
      },
    },
  },
  plugins: [],
}
