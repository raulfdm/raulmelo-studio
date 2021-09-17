import { fetcher } from '~utils';
import { query } from './query';
import { ITagsApiResponse } from './types';

export function queryAllTags(): Promise<ITagsApiResponse> {
  return fetcher.graphql(query);
}

export * from './types';
