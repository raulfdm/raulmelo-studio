import { client } from '~/config';

import {
  defaultSeoQuery,
  personalInfoQuery,
  siteSettingsQuery,
  socialsQuery,
} from './query';
import type {
  DefaultSeo,
  PersonalInformation,
  SiteData,
  SiteSettings,
  Social,
} from './schema';
import { siteDataSchema } from './schema';

export async function querySiteData(): Promise<SiteData> {
  const [defaultSeoPt, defaultSeoEn, personalInformation, site, socials] =
    await Promise.all([
      client.fetch<DefaultSeo>(defaultSeoQuery, { language: 'pt' }),
      client.fetch<DefaultSeo>(defaultSeoQuery, { language: 'en' }),
      client.fetch<PersonalInformation>(personalInfoQuery),
      client.fetch<SiteSettings>(siteSettingsQuery),
      client.fetch<Social>(socialsQuery),
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

  return siteDataSchema.parse(result);
}

export { DefaultSeo, PersonalInformation, SiteData, SiteSettings, Social };
