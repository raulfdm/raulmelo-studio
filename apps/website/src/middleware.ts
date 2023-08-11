import { match } from '@formatjs/intl-localematcher';
import type { SupportedLanguages } from '@raulmelo/core/config';
import { defineMiddleware, sequence } from 'astro/middleware';
import Negotiator from 'negotiator';

const themeHintHandler = defineMiddleware(async ({ request, locals }, next) => {
  const response = await next();

  if (skipMiddleware(request.url)) {
    return response;
  }

  const chColorScheme =
    (request.headers.get(`sec-ch-prefers-color-scheme`) as Theme) || `system`;

  locals.themeHint = chColorScheme;

  response.headers.set(`Accept-CH`, `Sec-CH-Prefers-Color-Scheme`);

  return response;
});

const languageHandler = defineMiddleware(
  async ({ request, redirect }, next): Promise<Response> => {
    const url = new URL(request.url);

    if (skipMiddleware(request.url)) {
      return next();
    }

    const pathnameIsMissingLocale = supportedLocales.every(
      (locale) =>
        !url.pathname.startsWith(`/${locale}/`) &&
        url.pathname !== `/${locale}`,
    );

    if (pathnameIsMissingLocale) {
      const locale = getLanguageFromAcceptLanguage(
        request.headers.get(`accept-language`) || ``,
      );

      const normalizedPathname = normalizePathname(
        `/${locale}/${url.pathname}`,
      );

      const nextUrl = new URL(normalizedPathname, request.url).toString();

      return redirect(nextUrl);
    }

    return next();
  },
);

export const onRequest = sequence(languageHandler, themeHintHandler);

const supportedLocales = [`en`, `pt`];
const defaultLocale = `en`;
const passThroughRoutes = [`/cv`, `/admin`, `/_image`, `/api`];

function skipMiddleware(url: string) {
  let shouldSkip = false;
  const pathname = new URL(url).pathname;

  for (const route of passThroughRoutes) {
    if (pathname.startsWith(route)) {
      shouldSkip = true;
      break;
    }
  }

  return shouldSkip;
}

function getLanguageFromAcceptLanguage(acceptLanguageHeader: string) {
  const languages = new Negotiator({
    headers: {
      'accept-language': acceptLanguageHeader,
    },
  }).languages(supportedLocales);

  return match(
    languages,
    supportedLocales,
    defaultLocale,
  ) as SupportedLanguages;
}

function normalizePathname(pathname: string) {
  return pathname.replaceAll(`//`, `/`).replace(/\/$/g, ``);
}
