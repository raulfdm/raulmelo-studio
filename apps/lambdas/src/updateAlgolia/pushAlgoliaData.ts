import { AlgoliaObjectList } from '@raulmelo/core/dist/types/domains/algolia';
import algolia from 'algoliasearch';

import { SETTINGS } from '../config';

export async function pushAlgoliaData(
  indexName: string,
  data: AlgoliaObjectList,
): Promise<void> {
  if (!SETTINGS.algolia.appId || !SETTINGS.algolia.adminKey) {
    throw new Error('App ID or Admin Key is missing');
  }

  const client = algolia(SETTINGS.algolia.appId, SETTINGS.algolia.adminKey);
  const index = client.initIndex(indexName);

  await index.saveObjects(data);
}
