import { type SanityClient } from '@sanity/client';
import groq from 'groq';
import { z } from 'zod';

import { supportedLanguagesSchema } from '@/config';

type QuerySiteDataParams = {
  client: SanityClient;
};

export async function querySiteData({ client }: QuerySiteDataParams) {
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

  return siteDataSchema.parse(result);
}

export type QuerySiteDataReturnType = Awaited<ReturnType<typeof querySiteData>>;

const defaultSeoQuery = groq`
*[_type == "defaultSeo" && language == $language][0]{
  title,
  language,
  description
}
`;
const personalInfoQuery = groq`
*[_type == "personalInfo"][0]{
  fullName,
  "profilePic": profilePic.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
}
`;

const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  url,
  "seoImage": seoImage.asset->{
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  } 
}
`;

const socialsQuery = groq`
*[_type == "social"]{
  name,
  username,
  url
}
`;

const profilePicSchema = z.object({
  width: z.number(),
  height: z.number(),
  url: z.string(),
});

const defaultSeoSchema = z.object({
  title: z.string(),
  language: z.string(),
  description: z.string(),
});

const personalInfoSchema = z.object({
  fullName: z.string(),
  profilePic: profilePicSchema,
});

const socialSchema = z.object({
  url: z.string(),
  username: z.string(),
  name: z.string(),
});

const siteSettings = z.object({
  url: z.string(),
  seoImage: profilePicSchema,
});

const siteDataSchema = z.object({
  personalInformation: personalInfoSchema,
  site: siteSettings,
  defaultSeo: z.record(supportedLanguagesSchema, defaultSeoSchema),
  socials: z.array(socialSchema),
});
