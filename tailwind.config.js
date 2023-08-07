/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      inter: ['"Inter"', 'sans-serif'],
      montserrat: ['"Montserrat"', 'sans-serif'],
    },
    fontSize: {
      sxs: '0.6rem',
      xs: '0.75rem',
      ms: '0.8125rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
          default: '#00008b',
        },
        sfra: {
          blue: {
            10: '#3263c908',
            50: '#3263c94d',
            100: '#3263C9',
            200: '#263C6B',
            300: '#1E2E4A',
            400: '#19253E',
            500: '#263C6B',
            600: '#00008B',
          },
          purple: {
            100: '#2E2E46',
          },

          pink: {
            50: '#E072C808',
            100: '#E072C8',
            200: '#E072BA',
            300: '#D96BC1',
          },

          gray: {
            50: '#3263c90d',
            100: '#DFDFE2',
            200: '#94959E',
            300: '#7E7E8A',
            400: '#52516A',
            500: '#E2E3EC',
            600: '#828282',
            700: '#F5F5F5',
            800: '#ACABA8',
          },

          green: {
            100: '#2BDDBD',
          },
        },
      },
    },
  },
  plugins: [],
};
