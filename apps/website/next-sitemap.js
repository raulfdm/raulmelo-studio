/** @type {import('next-sitemap').IConfig} */

// https://github.com/iamvishnusankar/next-sitemap
module.exports = {
  siteUrl: 'https://raulmelo.dev',
  generateRobotsTxt: true,
  exclude: ['/404'],
  sitemapSize: 7000,
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
