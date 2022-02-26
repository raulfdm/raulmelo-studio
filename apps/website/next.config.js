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
  webpack: (config, { isServer }) => {
    /**
     * Because next-mdx-remote defines esbuild as production dependency,
     * next will try to transpile it and include it in the bundle.
     * This will trigger syntax and "cannot include esbuild in the bundle" errors.
     *
     * Knowing that, we have to manually mark esbuild as external.
     */
    if (Array.isArray(config.externals)) {
      config.externals.push('esbuild');
    }

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

    return config;
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
