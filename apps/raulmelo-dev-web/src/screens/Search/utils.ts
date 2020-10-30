import debounce from 'debounce-promise';

import { algoliaClient } from '@config/algolia';
import { RequestsAlgoliaClient } from '@types-app';

export const algoliaSearchClient = {
  search: debounce((requests: RequestsAlgoliaClient) => {
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

    return algoliaClient.search(requests);
  }, 500),
};
