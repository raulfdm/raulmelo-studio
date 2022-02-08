import { domains } from '@raulmelo/core';
import type { PushAlgoliaTuple } from '@raulmelo/core/dist/types/domains/algolia';

const INDEX_NAME = 'posts';

export async function getContentToAlgolia(): Promise<PushAlgoliaTuple> {
  const algoliaData = await domains.algolia.queryAlgoliaData();

  return [INDEX_NAME, algoliaData];
}
