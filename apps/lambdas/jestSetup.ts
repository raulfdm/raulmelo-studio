process.env = Object.assign(process.env, {
  ALGOLIA_ADMIN_KEY: '123',
  ALGOLIA_APP_ID: '456',
  AUTH_TOKEN: 'token',
});

/**
 * Mock API to avoid hitting the real API
 */
jest.mock('@raulmelo/core', () => {
  const {
    postApi,
    // eslint-disable-next-line @typescript-eslint/no-var-requires
  } = require('./src/__fixtures__/content.ts');

  return {
    domains: {
      algolia: {
        queryAlgoliaData: jest.fn(() => Promise.resolve(postApi)),
      },
    },
  };
});
