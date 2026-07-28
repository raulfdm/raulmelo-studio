import { algoliasearch } from 'algoliasearch';

import { queryAlgoliaData } from '@/infrastructure/api/modules/algolia';
import { config } from '@/infrastructure/config/server';
import { sanityClient } from '@/infrastructure/sanity/client';

/**
 * Used to live behind the `/api/webhooks/update-algolia` endpoint, which a
 * static build can't host. It now runs from CI after a successful deploy.
 */
async function reindex() {
  const algoliaClient = algoliasearch(
    config.algolia.appId,
    config.algolia.adminKey,
  );

  const objects = await queryAlgoliaData({ client: sanityClient });

  await algoliaClient.replaceAllObjects({
    indexName: config.algolia.indexName,
    objects,
  });

  console.log(
    `Algolia index "${config.algolia.indexName}" updated with ${objects.length} objects.`,
  );
}

reindex().catch((error) => {
  console.error(`Failed to update the Algolia index:`, error);
  process.exit(1);
});
