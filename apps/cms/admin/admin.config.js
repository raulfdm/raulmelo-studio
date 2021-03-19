module.exports = {
  webpack: (config) => {
    /**
     * This workaround is necessary because within lerna/monorepo setup,
     * some dependencies could not being resolved naturally like:
     *
     * strapi-admin/node_modules/formik.
     *
     * since the node_modules is in the root level and here we only have a
     * symlink, somehow webpack couldn't figure out only those deps.
     */
    config.resolve.alias['strapi-admin'] = require.resolve('strapi-admin');

    return config;
  },
};
