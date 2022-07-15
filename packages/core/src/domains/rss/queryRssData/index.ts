import type { SupportedLanguages } from 'src';

import { client } from '~/config';

import { rssQuery } from './query';
import type { IRSSApiResponse } from './types';

export async function queryRssData(
  language: SupportedLanguages,
): Promise<IRSSApiResponse> {
  return client.fetch(rssQuery, { language: language });
}

export type { IRSSApiResponse } from './types';
