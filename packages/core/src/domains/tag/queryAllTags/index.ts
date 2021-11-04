import { client } from '~config';
import { query } from './query';
import { ITagsApiResponse } from './types';

export function queryAllTags(): Promise<ITagsApiResponse> {
  return client.request(query);
}

export * from './types';
