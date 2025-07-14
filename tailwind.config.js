

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7e7ee7',
          DEFAULT: '#5252b4',
          dark: '#3d3d8a',
        },
        secondary: {
          DEFAULT: '#00bcd4',
          dark: '#008ba3',
        },
        accent: {
          red: '#EF4444',
          orange: '#F97316',
          green: '#22C55E',
          yellow: '#EAB308',
          purple: '#A855F7',
          pink: '#EC4899',
        },
        darkBg: '#1f2937',
        text: '#4B5563',
        lightText: '#6B7280',
        white: '#ffffff',
        lightGray: '#f8f8f8',
        // Update or add a specific background for the new header design
        headerBg: '#343a40', // A charcoal grey that looks like your image's navbar background
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'], // Keep for headings/logo text
        body: ['Roboto', 'sans-serif'],
      },

      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'pulse-light': 'pulseLight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-down': 'fadeInDown 0.7s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-once': 'bounceOnce 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Tailwind usually provides 'spin' built-in, but defining it for completeness
        spin: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: '360deg)' },
        },
        bounceOnce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      // === ADDED FOR GLOW EFFECT ===
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        md: '0 4px 8px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
        'white-glow': '0 0 20px rgb(255, 255, 255), 0 0 15px rgb(255, 255, 255)',
        // 'blue-glow-sm': '0 0 15px rgb(25, 152, 255), 0 0 10px rgb(0, 140, 255)',
      },
      // ===========================
      // === UPDATED BOX SHADOW FOR PURE BLACK PILL ===
      boxShadow: {
        'pure-black-pill': '0 0 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.5)', // Stronger, encompassing black shadow
      }
      // ===========================
    },
  },
  plugins: [
    // === ADDED FOR GLOW EFFECT ===
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
    // ===========================
  ],
};