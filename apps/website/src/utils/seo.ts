import { SupportedLanguages } from '@types-app';
import siteData from 'site-data';

type DefaultSeos = typeof siteData['defaultSeos'];

export function getDefaultSeoByLocale(
  locale: SupportedLanguages,
): DefaultSeos[0] {
  const seo = siteData.defaultSeos.find((seo) => seo.language === locale);

  if (!seo) {
    throw new Error('SEO not found for this locale or empty');
  }

  return seo;
}

type Socials = typeof siteData['socials'];

export function getSocial(name: string): Socials[0] {
  const data = siteData.socials.find((social) =>
    social.name.toLowerCase().includes(name.toLowerCase()),
  );

  if (!data) {
    throw new Error(`GetSocial: cannot find social data for "${name}"`);
  }

  return data;
}
