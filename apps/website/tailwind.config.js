module.exports = {
  presets: [require('@raulfdm/blog-tailwind-preset')],
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@raulfdm/blog-components/dist/**',
  ],
};
