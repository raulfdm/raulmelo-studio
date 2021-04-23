import { api } from '../../utils/api';
import { PushAlgoliaTuple, AlgoliaObject } from '../types';

const INDEX_NAME = 'posts';
const QUERY = `
query Posts {
  posts {
    id
    title
    subtitle
    date
    language: locale
    slug
    content
    featured_image {
      width
      height
      url
    }
  }
}
`;

export async function getPostsToAlgolia(): Promise<PushAlgoliaTuple> {
  const {
    data: { posts },
  } = await api.query<PostsGraphQLResponse>(QUERY);

  const algoliaData = posts.map(objectCreator);

  return [INDEX_NAME, algoliaData];
}

function objectCreator(post: Post): AlgoliaObject {
  const { id, featured_image, content, ...rest } = post;

  const result: AlgoliaObject = {
    id,
    objectID: `Post_${id}`,
    excerpt: content.slice(0, 5000),
    ...rest,
  };

  if (featured_image) {
    result.featured_image = featured_image;
  }

  return result;
}

/**
 * Types
 */
interface PostsGraphQLResponse {
  data: Data;
}

type Posts = Post[];

interface Data {
  posts: Posts;
}

interface Post {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  language: string;
  slug: string;
  content: string;
  featured_image: FeaturedImage;
}

interface FeaturedImage {
  width: number;
  height: number;
  url: string;
}
