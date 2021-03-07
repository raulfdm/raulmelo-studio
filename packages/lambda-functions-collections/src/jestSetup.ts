const algoliaAdminKey = "123";
const algoliaIndexName = "foo";
const algoliaApiId = "456";

process.env = Object.assign(process.env, {
  ALGOLIA_ADMIN_KEY: algoliaAdminKey,
  ALGOLIA_INDEX_NAME: algoliaIndexName,
  ALGOLIA_APP_ID: algoliaApiId,
});
