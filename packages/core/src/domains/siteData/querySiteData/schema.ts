import { z } from 'zod';

import { supportedLanguagesSchema } from '~/global-types';

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
export type DefaultSeo = z.infer<typeof defaultSeoSchema>;

const personalInfoSchema = z.object({
  fullName: z.string(),
  profilePic: profilePicSchema,
});
export type PersonalInformation = z.infer<typeof personalInfoSchema>;

const socialSchema = z.object({
  url: z.string(),
  username: z.string(),
  name: z.string(),
});
export type Social = z.infer<typeof socialSchema>;

const siteSettings = z.object({
  url: z.string(),
  seoImage: profilePicSchema,
});
export type SiteSettings = z.infer<typeof siteSettings>;

export const siteDataSchema = z.object({
  personalInformation: personalInfoSchema,
  site: siteSettings,
  defaultSeo: z.record(supportedLanguagesSchema, defaultSeoSchema),
  socials: z.array(socialSchema),
});
export type SiteData = z.infer<typeof siteDataSchema>;
