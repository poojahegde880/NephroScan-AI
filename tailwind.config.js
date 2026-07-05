/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#effcfa',
          100: '#c8f6ef',
          200: '#93ecdf',
          300: '#5cdac9',
          400: '#2fc0b0',
          500: '#159e91',
          600: '#0f7d75',
          700: '#0d645f',
          800: '#0f504d',
          900: '#0f4441',
        },
        ink: {
          50: '#f6f8fa',
          100: '#eaeef2',
          200: '#d3dce3',
          300: '#aebccb',
          400: '#8298ac',
          500: '#647c93',
          600: '#4f6379',
          700: '#415163',
          800: '#394554',
          900: '#232b35',
          950: '#141920',
        },
        clinical: {
          blue: '#2563eb',
          teal: '#0d9488',
          success: '#16a34a',
          warning: '#d97706',
          danger: '#dc2626',
        },
      },
      fontFamily: {
        display: ['"Lexend"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(15, 68, 65, 0.08), 0 8px 24px -8px rgba(15, 68, 65, 0.08)',
        card: '0 1px 2px rgba(20, 25, 32, 0.04), 0 8px 20px -6px rgba(20, 25, 32, 0.08)',
        glow: '0 0 0 4px rgba(21, 158, 145, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        scanline: 'scanline 2.4s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
