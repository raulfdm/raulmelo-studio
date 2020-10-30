// import { SupportedLanguages } from './app';

/* TODO: implement type */
export type HitAlgolia = any;
// export type HitAlgolia = {
//   objectID: NonNullable<StrapiPosts['id']>;
//   language: SupportedLanguages;
//   slug: NonNullable<StrapiPosts['slug']>;
//   description: NonNullable<StrapiPosts['description']>;
//   title: NonNullable<StrapiPosts['title']>;
//   subtitle: StrapiPosts['subtitle'];
//   timeToRead: NonNullable<
//     Pick<SitePageContextPostChildStrapiPostContentChildMdx, 'timeToRead'>
//   >;
//   excerpt: NonNullable<
//     Pick<SitePageContextPostChildStrapiPostContentChildMdx, 'timeToRead'>
//   >;
//   date: NonNullable<StrapiPosts['date']>;
// };

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
