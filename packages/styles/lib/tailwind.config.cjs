const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
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
      sans: ['"proxima-nova"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        blue: colors.slate,
        black: 'var(--color-black)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      textColor: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      screens: {
        'ipad-pro': '834px',
      },
      transitionProperty: {
        spacing: 'margin, padding',
        theme: 'background-color, color, fill, opacity, border, shadow',
      },
      typography: (theme) => {
        const primary = theme('textColor.primary');
        const secondary = theme('textColor.secondary');

        return {
          /**
           * The defaults will be applied for both Light and Dark theme
           */
          DEFAULT: {
            css: {
              color: primary,
              blockquote: {
                borderLeftColor: secondary,
                fontWeight: 900,
              },
              code: {
                color: secondary,
              },
              h1: {
                fontWeight: 800,
                color: primary,
              },
              h2: {
                fontWeight: 800,
                color: primary,
              },
              h3: {
                fontWeight: 800,
                color: primary,
              },
              h4: {
                fontWeight: 800,
                color: primary,
              },
              h5: {
                fontWeight: 800,
                color: primary,
              },
              h6: {
                fontWeight: 800,
                color: primary,
              },
              a: {
                color: secondary,
              },
              strong: {
                color: secondary,
              },
              'ol > li::before': {
                color: secondary,
                opacity: 0.8,
              },
              'ul > li::before': {
                backgroundColor: secondary,
                opacity: 0.8,
              },
            },
          },
          /**
           * Dark more overrides
           */
          dark: {
            css: {
              'figure figcaption': {
                color: theme('textColor.gray.200'),
              },
              blockquote: {
                color: theme('textColor.gray.200'),
              },
            },
          },
        };
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
