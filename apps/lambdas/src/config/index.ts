// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config();

export const SETTINGS = {
  algolia: {
    adminKey: process.env.ALGOLIA_ADMIN_KEY,
    appId: process.env.ALGOLIA_APP_ID,
  },
  authToken: process.env.AUTH_TOKEN,
};
