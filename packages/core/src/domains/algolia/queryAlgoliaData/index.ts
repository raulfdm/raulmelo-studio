import { client } from '$config/sanity';
import { contentBlockToMarkdown } from '$utils/contentBlockToMarkdown';

import type { AlgoliaObject } from '../types';
import { algoliaPostsQuery, algoliaTilsQuery } from './query';
import type { IAlgoliaContent } from './types';

export async function queryAlgoliaData() {
  const posts = await client.fetch(algoliaPostsQuery);
  const tils = await client.fetch(algoliaTilsQuery);

  const content = [...posts, ...tils].map(objectCreator);

  return content;

  function objectCreator(data: IAlgoliaContent): AlgoliaObject {
    const { _id, content, _type, publishedAt, tags, ...rest } = data;
    const result: AlgoliaObject = {
      _id,
      objectID: `Content_${_id}`,
      excerpt: getExcerpt(contentBlockToMarkdown(content)),
      date_timestamp: getDateTimestamp(publishedAt),
      tags: tags || [],
      _type,
      publishedAt,
      ...rest,
    };

    if (_type === 'post') {
      result.featuredImage = data.featuredImage;
      result.subtitle = data.subtitle;
    }

    return result;
  }
}

function getExcerpt(content: string): string {
  return content
    .replace(/---/g, '')
    .replace(/\\n/g, '')
    .replace(/#/g, '')
    .slice(0, 5000);
}

function getDateTimestamp(date: string): string {
  return (new Date(date).getTime() / 1000).toFixed(0);
}

export type { IAlgoliaPosts, IAlgoliaTils } from './types';
