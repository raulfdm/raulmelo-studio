/** @type {import('next-sitemap').IConfig} */

// https://github.com/iamvishnusankar/next-sitemap
const config = {
  siteUrl: 'https://raulmelo.dev',
  generateRobotsTxt: true,
  exclude: ['/404', '/search'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/search', '/404'],
      },
    ],
  },
};

export default config;
