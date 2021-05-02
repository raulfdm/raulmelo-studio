import pkg from './package.json';
import commonJs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    exports: 'default',
    sourcemap: true,
  },
  plugins: [commonJs()],
  external: Object.entries(pkg.dependencies).map(([name]) => name),
};
