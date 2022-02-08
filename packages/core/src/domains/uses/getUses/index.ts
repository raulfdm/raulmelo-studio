import { client } from '~config';

import { SupportedLanguages } from '../../../types';
import { getUsesQuery } from './query';
import { IUsesApiResponse } from './types';

export function getUses(
  language: SupportedLanguages,
): Promise<IUsesApiResponse> {
  return client.fetch(getUsesQuery, { language });
}

export { IUsesApiResponse as IUsesData } from './types';
