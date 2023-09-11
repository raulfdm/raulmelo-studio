import pkgJson from '../package.json';

export async function build() {
  const external = Object.keys(pkgJson.dependencies);

  const build = await Bun.build({
    entrypoints: [
      './src/config/index.ts',
      './src/domains/index.ts',
      './src/scripts/index.ts',
      './src/utils/index.ts',
    ],
    format: 'esm',
    outdir: './dist',
    sourcemap: 'external',
    external,
    target: 'node',
  });

  if (!build.success) {
    console.error('Something get wrong while generating the build');
    for (const log of build.logs) {
      console.log(log);
    }

    return;
  }

  console.log('Build finished');

  Bun.spawn(['tsc', '-p', './tsconfig.build.json']);
  console.log('TypeScript build finished');
}
