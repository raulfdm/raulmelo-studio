import { ISiteData, ISiteDataApiResponse } from './types';
import { query } from './query';
import { client } from '~config';

export async function querySiteData(): Promise<ISiteData> {
  const { defaultSeoPt, defaultSeoEn, ...rest } =
    await client.request<ISiteDataApiResponse>(query);

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
