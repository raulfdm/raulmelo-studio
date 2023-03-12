import { type AlgoliaObject } from '@raulmelo/core/domains';

export type HitAlgolia = AlgoliaObject;

export type RefinementListProps = {
  items: {
    label: string;
    value: string[];
    count: number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  refine: (value: string[]) => any;
};

export type RequestAlgoliaClient = {
  indexName: string;
  params: {
    highlightPreTag: string;
    highlightPostTag: string;
    query: string;
    facets: string[];
    tagFilters: string;
  };
};

export type RequestsAlgoliaClient = RequestAlgoliaClient[];
