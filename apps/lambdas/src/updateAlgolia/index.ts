import algolia from 'algoliasearch';
import { SETTINGS } from '../config';

import { authMiddleware } from '../utils/authMiddleware';
import { getPostsToAlgolia } from './indexes/posts';
import { getTilsToAlgolia } from './indexes/tils';
import { FunctionReturn, AlgoliaObjectList, PushAlgoliaTuple } from './types';

export const updateAlgolia = authMiddleware(
  async function updateAlgolia(): Promise<FunctionReturn> {
    try {
      const indexesToUpdate: Promise<PushAlgoliaTuple>[] = [
        getPostsToAlgolia(),
        getTilsToAlgolia(),
      ];

      for await (const indexData of indexesToUpdate) {
        const [indexName, algoliaData] = indexData;
        await pushAlgoliaData(indexName, algoliaData);
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Indexes updated!', date: new Date() }),
      };
    } catch (error) {
      console.error(`Error while updating indexes:`, error);

      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Something went wrong. Check the logs',
          date: new Date(),
        }),
      };
    }
  },
);

function pushAlgoliaData(indexName: string, data: AlgoliaObjectList) {
  if (!SETTINGS.algolia.appId || !SETTINGS.algolia.adminKey) {
    throw new Error('App ID or Admin Key is missing');
  }

  const client = algolia(SETTINGS.algolia.appId, SETTINGS.algolia.adminKey);
  const index = client.initIndex(indexName);

  return index.saveObjects(data);
}
