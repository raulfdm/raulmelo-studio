import { SupportedLanguages } from '../../../types';
import { fetcher } from '~utils';

import { IUsesApiResponse } from './types';
import { query } from './query';

export function getUses(locale: SupportedLanguages): Promise<IUsesApiResponse> {
  return fetcher.graphql(query, { locale });
}

export { IUsesData } from './types';
