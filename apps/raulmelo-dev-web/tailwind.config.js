const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false,
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: `"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, "Helvetica Neue", sans-serif`,
      serif: `Merriweather, Georgia, Cambria, Times New Roman, Times, serif`,
      title: `"content-title", Georgia, Cambria, "Times New Roman", Times, serif`,
      'cv-sans': `Raleway, Arial, sans-serif`,
      'cv-serif': `Lora, Times, serif`,
    },
    extend: {
      colors: {
        blue: colors.blueGray,
      },
      textColor: {
        black: 'rgba(0,0,0,0.84)',
      },
      screens: {
        print: { raw: 'print' },
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
              p: {
                wordBreak: 'break-all',
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
                fontSize: '2.25rem',
                lineHeight: '1.3',
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
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
