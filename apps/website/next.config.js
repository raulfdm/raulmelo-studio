const isAnalyzerMode = process.env.ANALYZE === 'true';

const path = require('path');
const withPlugins = require('next-compose-plugins');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: isAnalyzerMode,
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: false,
  pageExtensions: ['page.tsx', 'page.ts'],
  experimental: {
    esmExternals: 'loose',
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/til',
        destination: '/til/home',
      },
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/blog',
        destination: '/blog/home',
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: '/cv',
        destination:
          'https://docs.google.com/document/d/1xk0ChmPckqW85xtM1Hizx2tVbo2B61xjcpz-_dAH3f8',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'miro.medium.com',
      'media.giphy.com',
      'cdn.sanity.io',
      'sanity.io',
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~/components': path.resolve(__dirname, './src/components'),
      '~/config': path.resolve(__dirname, './src/config'),
      '~/contexts': path.resolve(__dirname, './src/contexts'),
      '~/hooks': path.resolve(__dirname, './src/hooks'),
      '~/lib': path.resolve(__dirname, './src/lib'),
      '~/pages': path.resolve(__dirname, './src/pages'),
      '~/utils': path.resolve(__dirname, './src/utils'),
      '~/site-data': path.resolve(__dirname, 'site-data.json'),
    };

    if (isAnalyzerMode) {
      config.plugins.push(new DuplicatePackageCheckerPlugin());
    }

    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
