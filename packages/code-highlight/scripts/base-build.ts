import pkgJson from '../package.json';

export async function build() {
  const external = [
    ...Object.keys(pkgJson.peerDependencies),
    ...Object.keys(pkgJson.dependencies),
  ];

  await Bun.build({
    entrypoints: ['./src/index.ts'],
    format: 'esm',
    outdir: './dist',
    sourcemap: 'external',
    external,
    target: 'node',
  });
  console.log('Build finished');

  Bun.spawn(['tsc', '-p', './tsconfig.build.json']);
  console.log('TypeScript build finished');
}
