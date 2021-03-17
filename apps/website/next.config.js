const isAnalyzerMode = process.env.ANALYZE === 'true';

const path = require('path');
const withPlugins = require('next-compose-plugins');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isAnalyzerMode,
});

const nextConfig = {
  target: 'serverless',
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
      },
    ];
  },
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
      '@models': path.resolve(__dirname, './src/models'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types-api': path.resolve(__dirname, './src/types/api/index.ts'),
      '@types-app': path.resolve(__dirname, './src/types/index.ts'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
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
      config.node = {
        fs: 'empty',
        rehype: 'empty',
      };
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
      'unist-util-visit',
      'unist-util-visit-parents',
      'unist-util-is',
      'tslib',
      'supports-color',
    ];

    pluginsToResolve.forEach((plugin) => {
      config.resolve.alias[plugin] = path.resolve(
        __dirname,
        'node_modules',
        plugin,
      );
    });

    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
