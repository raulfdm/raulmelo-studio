const path = require('path');

function createResolver(projectName, config) {
  return (packageName) => {
    config.resolve.alias[packageName] = path.resolve(
      __dirname,
      `../../../node_modules/${projectName}/node_modules/${packageName}`,
    );
  };
}

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
    const strapiAdminResolver = createResolver('strapi-admin', config);
    const strapiContentManagerResolver = createResolver(
      'strapi-plugin-content-manager',
      config,
    );

    const strapiAdminPackagesToResolve = [
      '@buffetjs/styles',
      '@fortawesome/react-fontawesome',
      'formik',
      'video-react',
    ];

    for (const pkg of strapiAdminPackagesToResolve) {
      strapiAdminResolver(pkg);
    }

    strapiContentManagerResolver('draft-js');

    return config;
  },
};
