import { match } from '@formatjs/intl-localematcher';
import { type SupportedLanguages } from '@raulmelo/core/config';
import Negotiator from 'negotiator';

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (skipMiddleware(request.url)) {
    return;
  }

  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) =>
      !url.pathname.startsWith(`/${locale}/`) && url.pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLanguageFromAcceptLanguage(
      request.headers.get(`accept-language`) || ``,
    );

    const normalizedPathname = normalizePathname(`/${locale}/${url.pathname}`);

    const nextUrl = new URL(normalizedPathname, request.url).toString();

    return Response.redirect(nextUrl);
  }
}

const passThroughRoutes = [`/cv`, `/admin`];

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

export const supportedLocales = [`en`, `pt`];
const defaultLocale = `en`;

export function getLanguageFromAcceptLanguage(acceptLanguageHeader: string) {
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
  return pathname.replaceAll(`//`, `/`);
}

export const config = {
  matcher: [`/((?!api|favicon.ico|assets|_astro|_image|build|@fs|@vite).*)`],
};
