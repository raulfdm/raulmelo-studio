'use strict';

const config = {
  presets: [require('@raulmelo/styles/lib/tailwind.config.cjs')],
  mode: 'jit',
  purge: ['./**/*.{html,js,vue,ts}'],
};

module.exports = config;
