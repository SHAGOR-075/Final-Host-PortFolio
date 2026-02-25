/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0F16',
        panel: '#101826',
        card: '#141D2B',
        card2: '#0F1724',
        border: 'rgba(255,255,255,0.06)',
        text: '#E6EEF8',
        muted: '#9AA7B6',
        accent: '#FF2D6D',
        accent2: '#FF3D8A',
      },
    },
  },
  plugins: [],
}

