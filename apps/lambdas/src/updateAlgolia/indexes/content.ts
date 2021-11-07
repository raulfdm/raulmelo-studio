import { getDateTimestamp, getExcerpt } from '../../utils/algolia';
import { api } from '../../utils/api';
import { AlgoliaObject, PushAlgoliaTuple } from '../types';

const INDEX_NAME = 'posts';
const QUERY = `
query Posts {
  posts(locale: "all") {
    id
    title
    subtitle
    publishedAt: date
    locale
    slug
    content
    tags: post_tags {
      slug
      name
      id
    }
    featured_image {
      width
      height
      url
    }
  }

  tils(locale: "all") {
    id
    title
    content
    locale
    slug
    publishedAt
    tags {
      name
      id
      slug
    }
  }
}
`;

export async function getContentToAlgolia(): Promise<PushAlgoliaTuple> {
  const {
    data: { posts, tils },
  } = await api.query<ContentGraphQLResponse>(QUERY);

  const postsWithType = posts.map((p) => ({ ...p, type: 'post' }));
  const tilsWithType = tils.map((t) => ({ ...t, type: 'til' }));

  const algoliaData = [...postsWithType, ...tilsWithType].map(objectCreator);

  return [INDEX_NAME, algoliaData];
}

function objectCreator(data: Content): AlgoliaObject {
  const { id, content, subtitle, tags, featured_image, ...rest } = data;

  const result: AlgoliaObject = {
    id,
    objectID: `Content_${id}`,
    excerpt: getExcerpt(content),
    date_timestamp: getDateTimestamp(data.publishedAt),
    subtitle: subtitle ?? null,
    tags: tags ?? [],
    featured_image: featured_image ?? {},
    ...rest,
  };

  return result;
}

/**
 * Types
 */
interface ContentGraphQLResponse {
  data: Data;
}

interface Data {
  posts: Content[];
  tils: Content[];
}

interface Content {
  id: string;
  title: string;
  subtitle?: string;
  publishedAt: string;
  locale: string;
  slug: string;
  content: string;
  featured_image?: FeaturedImage;
  tags?: Tags;
}

interface FeaturedImage {
  width: number;
  height: number;
  url: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

type Tags = Tag[];
