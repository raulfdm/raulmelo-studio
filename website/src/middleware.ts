import { match } from '@formatjs/intl-localematcher';
import { defineMiddleware, sequence } from 'astro/middleware';
import Negotiator from 'negotiator';
import { SupportedLanguage, SupportedLanguages } from '@raulmelo/core/intl';

const themeHintHandler = defineMiddleware(async ({ request, locals }, next) => {
  if (skipMiddleware(request.url)) {
    return next();
  }

  const chColorScheme =
    (request.headers.get(
      `sec-ch-prefers-color-scheme`,
    ) as App.Locals['themeHint']) || `system`;

  locals.themeHint = chColorScheme;

  const response = await next();

  response.headers.set(`Accept-CH`, `Sec-CH-Prefers-Color-Scheme`);

  return response;
});

const languageHandler = defineMiddleware(
  async ({ request, redirect }, next): Promise<Response> => {
    const url = new URL(request.url);

    if (skipMiddleware(request.url)) {
      return next();
    }

    const pathnameIsMissingLocale = SupportedLanguages.every(
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

const defaultLocale: SupportedLanguage = `en`;
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
  }).languages(SupportedLanguages as unknown as string[]);

  return match(
    languages,
    SupportedLanguages,
    defaultLocale,
  ) as SupportedLanguage;
}

function normalizePathname(pathname: string) {
  return pathname.replaceAll(`//`, `/`).replace(/\/$/g, ``);
}
