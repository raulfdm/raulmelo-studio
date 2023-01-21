/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@raulmelo/styles/lib/tailwind.config.cjs')],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
