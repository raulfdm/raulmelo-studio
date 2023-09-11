import { readableStreamToText } from 'bun';

import pkgJson from '../package.json';

export async function build() {
  const external = Object.keys(pkgJson.dependencies);

  const build = await Bun.build({
    entrypoints: ['./src/index.ts'],
    format: 'esm',
    outdir: './dist',
    sourcemap: 'external',
    external,
    target: 'node',
    splitting: true,
  });

  if (!build.success) {
    console.error('Something get wrong while generating the build');
    for (const log of build.logs) {
      console.log(log);
    }

    return;
  }

  console.log('Build finished');

  const { stdout } = Bun.spawn(['tsc', '-p', './tsconfig.build.json']);

  const text = await readableStreamToText(stdout);
  if (text.includes('error')) {
    console.error(text);
    process.exit(1);
    return;
  }

  console.log('TypeScript build finished');
}
