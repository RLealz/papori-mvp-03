/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        },
        keyframes: {
          shimmer: {
            '100%': { transform: 'translateX(100%)' },
          },
        },
        colors: {
          papori: {
            pink: '#EC4899',
            purple: '#8B5CF6',
            light: '#FCF5F9',
          },
        },
      },
    },
    plugins: [],
  }