import dts from 'bun-plugin-dts';

import pkgJson from '../package.json';

const externals = [
  ...Object.keys(pkgJson.dependencies),
  ...Object.keys(pkgJson.peerDependencies),
];

const build = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  external: externals,
  sourcemap: 'external',
  format: 'esm',
});

if (!build.success) {
  console.log(build.logs);
} else {
  console.log('Build success!');
}
