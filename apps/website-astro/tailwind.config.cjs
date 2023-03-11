// eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/no-var-requires
const defaultPreset = require('@raulmelo/styles/lib/tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [defaultPreset],
  content: [`./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          `InterVariable`,
          `Inter`,
          ...defaultPreset.theme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
