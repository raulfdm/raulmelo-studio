const path = require(`path`);
const fs = require(`fs`);

const queryStringPackageJson = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, `./node_modules/query-string/package.json`),
    `utf8`,
  ),
);

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: `vercel`,
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === `development` ? undefined : `./server.js`,
  ignoredRouteFiles: [`**/.*`],
  serverDependenciesToBundle: [
    `@raulmelo/core`,
    `query-string`,
    /**
     * Without this being included it'll throw an error in Vercel because
     * `query-string` was bundled up instead imported from node_modules (because
     * it's full ESM now)
     */
    ...Object.keys(queryStringPackageJson.dependencies),
  ],
};
