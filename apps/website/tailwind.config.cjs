/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/quotes */

const defaultPreset = require('@raulmelo/styles/lib/tailwind.config.cjs');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [defaultPreset],
  content: [`./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`],
  theme: {
    extend: {
      fontFamily: {
        title: [`"Paytone One"`, ...defaultTheme.fontFamily.sans],
        sans: [`Outfit`, ...defaultTheme.fontFamily.sans],
        code: [`"Fira Code"`, ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
