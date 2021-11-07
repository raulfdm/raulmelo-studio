import { analyzeMetafile, build } from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';

import pkgJson from '../../package.json';

export function runESBuild(options = {}) {
  const commonJs = createConfig({
    outfile: 'dist/cjs/mdx-prism-2.js',
    platform: 'node',
    format: 'cjs',
    target: 'node12',
  });

  const esm = createConfig({
    format: 'esm',
    outfile: 'dist/esm/mdx-prism-2.js',
    target: 'node12',
  });

  return Promise.all([build(commonJs), build(esm)]).then(
    async ([cjsOutput, esmOutput]) => {
      const esmResult = await analyzeMetafile(esmOutput.metafile, {
        verbose: false,
      });
      console.log(esmResult);
      const cjsResult = await analyzeMetafile(cjsOutput.metafile, {
        verbose: false,
      });
      console.log(cjsResult);
    },
  );

  function createConfig(overrides = {}) {
    const baseConfig = {
      bundle: true,
      entryPoints: ['src/lib.ts'],
      sourcemap: 'external',
      metafile: true,
      external: Object.keys(pkgJson.dependencies),
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
