import {
  SupportedLanguagesEnum,
  type SupportedLanguage,
} from '@raulmelo/core/intl';
import { getPathnameWithLocale } from '@/infrastructure/utils/url';

export function useSideMenuLinks(lang: SupportedLanguage, pathname: string) {
  return [
    {
      href: ``,
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
      href: `/snippets`,
      localeId: `sideMenu.codeSnippets`,
      prefetch: true,
    },
    {
      href: `/tags`,
      localeId: `sideMenu.tags`,
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
      href:
        lang === SupportedLanguagesEnum.ENGLISH ? `/rss.xml` : `/rss-pt.xml`,
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
      const nextHref = noLocale ? href : getPathnameWithLocale(href, lang);

      return {
        itemLabel: localeId,
        href: nextHref,
        newWindow,
        prefetch,
        isActive: pathname === nextHref,
      };
    },
  );
}

export type SideMenuLink = ReturnType<typeof useSideMenuLinks>[number];
