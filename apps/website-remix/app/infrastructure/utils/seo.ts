import type { ISiteData } from '@raulmelo/core/dist/types/domains/siteData';

type Social = ISiteData['socials'][0];

/**
 * TODO: enhance this
 */
export function getSocial(name: string, siteData: ISiteData): Social {
  const data = siteData.socials.find((social) =>
    social.name.toLowerCase().includes(name.toLowerCase()),
  );

  if (!data) {
    throw new Error(`GetSocial: cannot find social data for "${name}"`);
  }

  return data;
}
