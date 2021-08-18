'use strict';

const config = {
  presets: [require('@raulmelo/styles/lib/tailwind.config.cjs')],
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
};

module.exports = config;
