const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.563rem', { lineHeight: 1.3 }],
      sm: ['0.75rem', { lineHeight: 1.3 }],
      base: ['1rem', { lineHeight: 1.3 }],
      md: ['1.125rem', { lineHeight: 1.3 }],
      lg: ['1.333rem', { lineHeight: 1.3 }],
      xl: ['1.777rem', { lineHeight: 1.3 }],
      '2xl': ['2.369rem', { lineHeight: 1.3 }],
      '3xl': ['3.157rem', { lineHeight: 1.3 }],
      '4xl': ['4.209rem', { lineHeight: 1.3 }],
    },
    fontFamily: {
      sans: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, "Helvetica Neue", sans-serif`,
    },
    extend: {
      colors: {
        blue: colors.blueGray,
      },
      textColor: {
        black: '#2c2c2c',
      },
      screens: {
        print: { raw: 'print' },
        '1/5xl': '1440px',
      },
      transitionProperty: {
        spacing: 'margin, padding',
        theme: 'background-color, color, fill, opacity, border, shadow',
      },
      borderWidth: {
        10: '10px',
      },
      minWidth: {
        '1/2': '50%',
      },
      typography: (theme) => {
        const white = theme('textColor.white');
        const black = theme('textColor.black');
        const serif = theme('fontFamily.serif');
        const sans = theme('fontFamily.sans');

        return {
          DEFAULT: {
            css: {
              color: black,
              fontFamily: serif,
              h1: {
                fontFamily: serif,
              },
              h2: {
                fontFamily: sans,
              },
              h3: {
                fontFamily: sans,
              },
              h4: {
                fontFamily: sans,
              },
              h5: {
                fontFamily: sans,
              },
              h6: {
                fontFamily: sans,
              },
              blockquote: {
                borderLeftColor: black,
              },
            },
          },
          lg: {
            css: {
              hr: {
                overflow: 'visible',
                marginBottom: '2.6rem',
                marginTop: '2.6rem',
              },
            },
          },
          xl: {
            css: {
              hr: {
                overflow: 'visible',
                marginBottom: '3.6rem',
                marginTop: '3.6rem',
              },
            },
          },
          '2xl': {
            css: {
              /**
               * 20px
               */
              fontSize: '1.25rem',
            },
          },
          dark: {
            css: {
              color: white,
              'figure figcaption': {
                color: theme('textColor.gray.200'),
              },
              blockquote: {
                borderLeftColor: white,
                color: theme('textColor.gray.200'),
              },
              a: {
                color: white,
              },
              code: {
                color: white,
              },
              h1: {
                color: white,
              },
              h2: {
                color: white,
              },
              h3: {
                color: white,
              },
              h4: {
                color: white,
              },
              h5: {
                color: white,
              },
              h6: {
                color: white,
              },
              strong: {
                color: white,
              },
            },
          },
        };
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      boxShadow: ['dark'],
      borderWidth: ['dark', 'focus'],
      scale: ['hover'],
      transform: ['hover'],
      outline: ['dark'],
    },
    typography: ['dark', 'responsive'],
  },
  plugins: [require('@tailwindcss/typography')],
};
