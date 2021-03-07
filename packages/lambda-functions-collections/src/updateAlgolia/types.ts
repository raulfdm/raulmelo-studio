export type Post = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  language: string;
  slug: string;
  content: string;
  featured_image?: {
    width: number;
    height: number;
    url: string;
  };
};

export type Posts = Post[];

export type AlgoliaObject = {
  id: string;
  title: string;
  date: string;
  language: string;
  slug: string;
  objectID: string;
  excerpt: string;
  featured_image?: {
    width: number;
    height: number;
    url: string;
  };
};

export type AlgoliaObjectList = AlgoliaObject[];

export type GraphqlResponsePosts = {
  data: {
    data: {
      posts: Post[];
    };
  };
};

export type SuccessFunctionReturn = {
  statusCode: 200;
  body: string;
};

export type ErrorFunctionReturn = {
  statusCode: 500;
  body: string;
};

export type FunctionReturn = SuccessFunctionReturn | ErrorFunctionReturn;
