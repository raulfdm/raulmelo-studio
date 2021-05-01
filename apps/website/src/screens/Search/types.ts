import { SupportedLanguages } from '@types-app';

export type HitAlgolia = {
  objectID: string;
  excerpt: string;
  title: string;
  slug: string;
  locale: SupportedLanguages;
  publishedAt: string;
  type: 'post' | 'til';
  subtitle?: string;
  featured_image?: {
    url: string;
  };
  tags: {
    name: string;
    slug: string;
    id: string;
  }[];
};

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
