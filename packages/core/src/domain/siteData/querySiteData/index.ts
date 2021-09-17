import { fetcher } from '~utils';

import { ISiteData, ISiteDataApiResponse } from './types';
import { query } from './query';

export async function querySiteData(): Promise<ISiteData> {
  const { defaultSeoPt, defaultSeoEn, ...rest } =
    await fetcher.graphql<ISiteDataApiResponse>(query);

  return {
    ...rest,
    /**
     * Ensure of having both default seo locales
     */
    defaultSeo: {
      pt: defaultSeoPt,
      en: defaultSeoEn,
    },
  };
}

export { ISiteData } from './types';
