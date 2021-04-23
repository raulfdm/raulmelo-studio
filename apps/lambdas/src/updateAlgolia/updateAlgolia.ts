import { authMiddleware } from '../utils/authMiddleware';
import { getPostsToAlgolia } from './indexes/posts';
import { getTilsToAlgolia } from './indexes/tils';
import { pushAlgoliaData } from './pushAlgoliaData';
import { FunctionReturn, PushAlgoliaTuple } from './types';

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
