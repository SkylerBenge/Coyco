module.exports = {
  purge: {
    enabled: false,
    content: ["./**/*.liquid"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        DEFAULT: '#222222'
      },
      red: {
        DEFAULT: '#a1342d'
      },
      yellow: {
        DEFAULT: '#ff9b25'
      },
      cream: {
        DEFAULT: '#f5f5e5'
      }
    },
    fontFamily: {
      'bungee': ['Bungee', 'cursive'],
      'bungee-inline': ['Bungee Inline', 'cursive']
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-12deg)' },
        '50%': { transform: 'rotate(12deg)' },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-1rem)',
          animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
        },
        '50%': {
          transform: 'translateY(0)',
          animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
         }
      }
    },
    animation: {
      wiggle: 'wiggle 6s ease-in-out infinite',
      bounce: 'bounce 3s infinite',
    },
    zIndex: {
      '-1': '-1',
      '1': '1',
      '2': '2',
      '3': '3',
    }
  },
  variants: {
    extend: {
      animation: ['hover', 'focus']
    },
  },
  plugins: [],
}
