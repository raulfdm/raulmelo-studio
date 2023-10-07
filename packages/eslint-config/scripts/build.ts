import pkg from '../package.json';

const result = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  format: 'esm',
  external: [...Object.keys(pkg.dependencies)],
  splitting: true,
});

if (result.success === false) {
  console.error(result.logs);
  process.exit(1);
} else {
  console.log('Build success!');
  process.exit(0);
}
