import pkgJson from '../package.json';

const external = [
  ...Object.keys(pkgJson.dependencies),
  ...Object.keys(pkgJson.devDependencies),
];

const build = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  external,
  sourcemap: 'external',
  format: 'esm',
});

if (!build.success) {
  console.log(build.logs);
} else {
  console.log('Build success!');
}
