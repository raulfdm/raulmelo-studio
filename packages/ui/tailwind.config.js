module.exports = {
  presets: [require('@raulmelo/styles/lib/tailwind.config.cjs')],
  //... overrides like
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,tsx}'],
  // ... etc
};
