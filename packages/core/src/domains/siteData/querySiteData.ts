import groq from 'groq';
import { z } from 'zod';

import { supportedLanguagesSchema } from '$config/languages';
import { client } from '$config/sanity';

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
type DefaultSeo = z.infer<typeof defaultSeoSchema>;

const personalInfoSchema = z.object({
  fullName: z.string(),
  profilePic: profilePicSchema,
});
type PersonalInformation = z.infer<typeof personalInfoSchema>;

const socialSchema = z.object({
  url: z.string(),
  username: z.string(),
  name: z.string(),
});
type Social = z.infer<typeof socialSchema>;

const siteSettings = z.object({
  url: z.string(),
  seoImage: profilePicSchema,
});
type SiteSettings = z.infer<typeof siteSettings>;

const siteDataSchema = z.object({
  personalInformation: personalInfoSchema,
  site: siteSettings,
  defaultSeo: z.record(supportedLanguagesSchema, defaultSeoSchema),
  socials: z.array(socialSchema),
});
export type SiteData = z.infer<typeof siteDataSchema>;
