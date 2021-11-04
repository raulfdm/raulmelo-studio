import { SupportedLanguages } from '../../../types';

import { IUsesApiResponse } from './types';
import { query } from './query';
import { client } from '~config';

export function getUses(locale: SupportedLanguages): Promise<IUsesApiResponse> {
  return client.request(query, { locale });
}

export { IUsesData } from './types';
