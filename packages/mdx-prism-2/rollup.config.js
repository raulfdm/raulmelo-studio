import pkg from './package.json';
import commonJs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    exports: 'default',
    sourcemap: true,
  },
  plugins: [json(), nodeResolve(), typescript(), commonJs()],
  external: Object.entries(pkg.dependencies)
    .map(([name]) => name)
    /**
     * This includes in the bundle ONLY these 3 problematic packages.
     *
     * If use them as external, it'll throw an error:
     *
     * > [ERR_REQUIRE_ESM]: Must use import to load ES Module: /vercel/path0/node_modules/unist-util-filter/index.js
     * > require() of ES modules is not supported.
     *
     * And that's because these 3 deps now are only ESM.
     */
    .filter(
      (name) =>
        ![
          'unist-util-filter',
          'unist-util-visit',
          'unist-util-visit-parents',
        ].includes(name),
    ),
};
