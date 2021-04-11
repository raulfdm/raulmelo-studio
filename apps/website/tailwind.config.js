const path = require('path');
const blogCompPath = require.resolve('@raulfdm/blog-components');

const blogCompFolderPath = path.dirname(blogCompPath);

module.exports = {
  presets: [require('@raulfdm/blog-tailwind-preset')],
  mode: 'jit',
  // purge: {
  //   enable: true,
  //   content: ['./src/**/*.{js,ts,jsx,tsx}', `${blogCompFolderPath}/**/*`],
  // },
  purge: ['./src/**/*.{js,ts,jsx,tsx}', `${blogCompFolderPath}/**/*`],
};
