import { authMiddleware } from '../utils/authMiddleware';
import { getContentToAlgolia } from './indexes/content';
import { pushAlgoliaData } from './pushAlgoliaData';
import { FunctionReturn } from './types';

export const updateAlgolia = authMiddleware(
  async function updateAlgolia(): Promise<FunctionReturn> {
    try {
      const [indexName, algoliaData] = await getContentToAlgolia();

      await pushAlgoliaData(indexName, algoliaData);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Indexes updated!', date: new Date() }),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`Error while updating indexes:`, error?.message);

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
