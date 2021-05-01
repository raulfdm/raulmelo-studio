import { algoliaClient } from '@config/algolia';
import debounce from 'debounce-promise';
import { RequestsAlgoliaClient } from './types';

export const algoliaDebounceSearchClient = {
  search: debounce(async (requests: RequestsAlgoliaClient) => {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    const a = await algoliaClient.search(requests);

    return a;
  }, 500),
};
