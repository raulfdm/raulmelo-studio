export type AlgoliaObject = {
  _id: string;
  objectID: string;
  _type: 'post' | 'til';
  excerpt: string;
  date_timestamp: string;
  title: string;
  subtitle?: string;
  publishedAt: string;
  slug: string;
  tags: {
    _id: string;
    name: string;
    slug: string;
  }[];
  featuredImage?: {
    url: string;
    width: number;
    height: number;
  };
};

export type AlgoliaObjectList = AlgoliaObject[];

export type PushAlgoliaTuple = [index: string, algoliaData: AlgoliaObject[]];
