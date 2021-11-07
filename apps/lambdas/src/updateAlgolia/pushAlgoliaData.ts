import algolia from 'algoliasearch';

import { SETTINGS } from '../config';
import { AlgoliaObjectList } from './types';

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
