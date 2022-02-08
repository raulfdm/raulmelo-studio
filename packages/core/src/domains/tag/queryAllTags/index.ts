import { client } from '~config';

import { allTagsQuery } from './query';
import { ITagsApiResponse } from './types';

export function queryAllTags(): Promise<ITagsApiResponse> {
  return client.fetch(allTagsQuery);
}

export * from './types';
