import { type SupportedLanguages } from '@raulmelo/core/config';

import { getPathnameWithLocale } from '@/infrastructure/utils/url';

export function useSideMenuLinks(lang: SupportedLanguages) {
  return [
    {
      href: `/`,
      localeId: `sideMenu.home`,
      prefetch: true,
    },
    {
      href: `/blog`,
      localeId: `sideMenu.blog`,
      prefetch: true,
    },
    {
      href: `/til`,
      localeId: `sideMenu.til`,
      prefetch: true,
    },
    {
      href: `/search`,
      localeId: `sideMenu.search`,
      prefetch: false,
    },
    {
      href: `/uses`,
      localeId: `sideMenu.uses`,
      prefetch: true,
    },
    {
      href: `/cv`,
      localeId: `sideMenu.cv`,
      noLocale: true,
      prefetch: false,
      newWindow: true,
    },
    {
      href: lang === `en` ? `/rss.xml` : `/rss-pt.xml`,
      localeId: `sideMenu.rss`,
      newWindow: true,
    },
  ].map(
    ({
      href,
      localeId,
      newWindow = false,
      noLocale = false,
      prefetch = false,
    }) => {
      return {
        itemLabel: localeId,
        href: noLocale ? href : getPathnameWithLocale(href, lang),
        newWindow,
        prefetch,
      };
    },
  );
}

export type SideMenuLink = ReturnType<typeof useSideMenuLinks>[number];
