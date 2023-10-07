import pkg from '../package.json';

const result = await Bun.build({
  entrypoints: [
    './src/domains/index.ts',
    './src/config/index.ts',
    './src/scripts/index.ts',
    './src/utils/index.ts',
  ],
  outdir: './dist',
  target: 'node',
  format: 'esm',
  external: [...Object.keys(pkg.dependencies)],
  splitting: true,
  /**
   * This property solves this problem:
   * https://github.com/oven-sh/bun/issues/5344
   */
  minify: true,
});

if (result.success === false) {
  console.error(result.logs);
  process.exit(1);
} else {
  console.log('Build success!');
  process.exit(0);
}
