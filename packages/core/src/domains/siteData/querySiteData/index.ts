import { client } from '~config';

import {
  defaultSeoQuery,
  personalInfoQuery,
  siteSettingsQuery,
  socialsQuery,
} from './query';
import { ISiteData } from './types';

export async function querySiteData(): Promise<ISiteData> {
  const [defaultSeoPt, defaultSeoEn, personalInformation, site, socials] =
    await Promise.all([
      client.fetch(defaultSeoQuery, { language: 'pt' }),
      client.fetch(defaultSeoQuery, { language: 'en' }),
      client.fetch(personalInfoQuery),
      client.fetch(siteSettingsQuery),
      client.fetch(socialsQuery),
    ]);

  const result = {
    personalInformation,
    site,
    socials,
    defaultSeo: {
      pt: defaultSeoPt,
      en: defaultSeoEn,
    },
  };

  return result;
}

export { ISiteData } from './types';
