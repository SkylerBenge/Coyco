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
        DEFAULT: '#cc3c38'
      },
      yellow: {
        DEFAULT: '#ff9b25'
      },
      cream: {
        DEFAULT: '#f5f5e5'
      },
      white: {
        DEFAULT: '#ffffff'
      }
    },
    scale: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '90': '.9',
      '95': '.95',
      '100': '1',
      '105': '1.05',
      '110': '1.1',
      '125': '1.25',
      '150': '1.5',
      '175': '1.75',
      '200': '2',
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
      '10xl': '10rem',
      '11xl': '12rem',
      '12xl': '14rem',
      '1vw': '1vw',
      '2vw': '2vw',
      '3vw': '3vw',
      '4vw': '4vw',
      '5vw': '5vw',
      '6vw': '6vw',
      '7vw': '7vw',
      '8vw': '8vw',
      '9vw': '9vw',
      '10vw': '10vw',
      '11vw': '11vw',
      '12vw': '12vw',
      '13vw': '13vw',
      '14vw': '14vw',
      '15vw': '15vw',
      '16vw': '16vw',
      '17vw': '17vw',
      '18vw': '18vw',
      '19vw': '19vw',
      '20vw': '20vw'
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
    },

    extend: {
      lineHeight: {
        '1': '.25rem',
        '2': '.5rem'
      },
    }
  },
  variants: {
    extend: {
      animation: ['hover', 'focus']
    },
  },
  plugins: [],
}
