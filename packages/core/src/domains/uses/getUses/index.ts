import { client } from '~config';

import { SupportedLanguages } from '../../../types';
import { query } from './query';
import { IUsesApiResponse } from './types';

export function getUses(locale: SupportedLanguages): Promise<IUsesApiResponse> {
  return client.request(query, { locale });
}

export { IUsesData } from './types';
