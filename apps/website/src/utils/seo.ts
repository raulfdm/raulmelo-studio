import siteData from '~/site-data';

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
