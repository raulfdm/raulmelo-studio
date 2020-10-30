const path = require('path');

module.exports = {
  target: 'serverless',
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
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
      '@types-api': path.resolve(__dirname, './src/types/api/index.ts'),
      '@types-app': path.resolve(__dirname, './src/types/index.ts'),
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

    return config;
  },
  async redirects() {
    return [
      {
        source: '/uses',
        destination: '/uses/en',
        permanent: false,
      },
    ];
  },
};
