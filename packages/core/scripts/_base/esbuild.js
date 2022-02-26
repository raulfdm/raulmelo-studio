import { build } from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';
import fs from 'fs';

const NODE_TARGET = 'node14';

export function runESBuild(options = {}) {
  const commonJs = createConfig({
    outfile: 'dist/cjs/core.js',
    platform: 'node',
    format: 'cjs',
    target: NODE_TARGET,
  });

  const esm = createConfig({
    format: 'esm',
    outfile: 'dist/esm/core.js',
    target: 'es2019',
  });

  const generateSiteDataScript = createConfig({
    format: 'esm',
    platform: 'node',
    target: NODE_TARGET,
    outfile: 'dist/scripts/generateSiteData.mjs',
    entryPoints: ['src/scripts/generateSiteData.ts'],
    metafile: false,
  });

  const generateRssFeedScript = createConfig({
    format: 'esm',
    platform: 'node',
    target: NODE_TARGET,
    outfile: 'dist/scripts/generateRssFeed.mjs',
    entryPoints: ['src/scripts/generateRssFeed.ts'],
    metafile: false,
  });

  return Promise.all([
    build(commonJs),
    build(esm),
    build(generateSiteDataScript),
    build(generateRssFeedScript),
  ]);

  function createConfig(overrides = {}) {
    const baseConfig = {
      bundle: true,
      entryPoints: ['src/index.ts'],
      sourcemap: 'external',
      external: getExternalDependencies(),
      metafile: true,
      ...overrides,
    };

    if (options.watch) {
      const formatLabel = overrides.format.toUpperCase();

      /**
       * Integrates tsc to generate .d.ts files for every change.
       * Otherwise, I'll need to run separately `tsc` for every change.
       */
      baseConfig.plugins = [dtsPlugin()];

      baseConfig.watch = {
        onRebuild(error) {
          if (error) console.error(`[${formatLabel}] Watch build`, error);
          else console.log(`[${formatLabel}] Watch build succeeded`);
        },
      };
    }

    return baseConfig;
  }
}

function getExternalDependencies() {
  const pkgString = fs.readFileSync('package.json').toString();
  const pkgJson = JSON.parse(pkgString);
  return Object.keys(pkgJson.dependencies);
}
