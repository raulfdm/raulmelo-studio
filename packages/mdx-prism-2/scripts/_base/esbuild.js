const { dtsPlugin } = require('esbuild-plugin-d.ts');
const { build } = require('esbuild');

module.exports = {
  runESBuild: function (options = {}) {
    const baseConfig = {
      bundle: true,
      entryPoints: ['src/lib.ts'],
      outfile: 'dist/mdx-prism-2.js',
      platform: 'node',
      format: 'cjs',
      target: 'node12',
      sourcemap: 'external',
      plugins: [dtsPlugin()],
    };

    if (options.watch) {
      baseConfig.watch = {
        onRebuild(error) {
          if (error) console.error('watch build failed:', error);
          else console.log('Watch build succeeded');
        },
      };
    }

    return build(baseConfig);
  },
};
