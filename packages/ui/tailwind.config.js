module.exports = {
  presets: [require('@raulmelo/styles/lib/tailwind.config.cjs')],
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,tsx}'],
};
