const isAnalyzerMode = process.env.ANALYZE === 'true';

const { redirects } = require('./config/redirects');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const withPreact = require('next-plugin-preact');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isAnalyzerMode,
});

const nextConfig = {
  future: {
    webpack5: true,
  },
  target: 'serverless',
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
  redirects,
  images: {
    domains: ['res.cloudinary.com', 'miro.medium.com', 'media.giphy.com'],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, './src/components'),
      '@config': path.resolve(__dirname, './src/config'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types-app': path.resolve(__dirname, './src/types/index.ts'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
      'site-data': path.resolve(__dirname, 'site-data.json'),
    };

    /**
     * Fixes using server code (which uses fs) out of "pages" (where server code
     * usually runs).
     * Most specific case is "config/mdx" (which it's just a helper wrapper) that
     * uses node fs. It does work using inside page but having them there it throws
     * error: "Module not found: Can't resolve 'fs'"
     *
     * https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
     */
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.rehype = false;
      config.resolve.fallback.v8 = false;
    }

    if (isAnalyzerMode) {
      config.plugins.push(new DuplicatePackageCheckerPlugin());
    }

    const pluginsToResolve = [
      '@babel/plugin-syntax-jsx',
      '@babel/core',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/types',
      'remark-parse',
      'has-flag',
      'tslib',
      'supports-color',
      '@babel/runtime',
      '@emotion/is-prop-valid',
      '@emotion/memoize',
      '@babel/helper-plugin-utils',
      'escape-string-regexp',
      'iconv-lite',
      'semver',
      'unified',
    ];

    pluginsToResolve.forEach((plugin) => {
      /**
       * `require.resolve` won't help in this case because because it brings the
       * entry file from the module (e.g. path/to/module/lib/index.js).
       *
       * What I need is only `path/to/module`
       */
      config.resolve.alias[plugin] = path.resolve(
        __dirname,
        '../../node_modules',
        plugin,
      );
    });

    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer, withPreact], nextConfig);
