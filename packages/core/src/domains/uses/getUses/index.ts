import { client } from '~/config';
import type { SupportedLanguages } from '~/global-types';

import { getUsesQuery } from './query';
import type { IUsesApiResponse } from './types';

export function getUses(
  language: SupportedLanguages,
): Promise<IUsesApiResponse> {
  return client.fetch(getUsesQuery, { language });
}

export type { IUsesApiResponse as IUsesData } from './types';
