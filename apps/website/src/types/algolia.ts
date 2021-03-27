import { SupportedLanguages } from '@types-app';

export type HitAlgolia = {
  objectID: string;
  excerpt: string;
  title: string;
  subtitle?: string;
  slug: string;
  language: SupportedLanguages;
  date: string;
  featured_image: {
    url: string;
  };
  post_tags: {
    name: string;
    slug: string;
  }[];
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
