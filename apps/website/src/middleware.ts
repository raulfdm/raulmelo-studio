import { match } from '@formatjs/intl-localematcher';
import type { SupportedLanguages } from '@raulmelo/core/config';
import type { APIContext, MiddlewareNext, MiddlewareNextResponse } from 'astro';
import Negotiator from 'negotiator';

export async function onRequest(
  { request, redirect }: APIContext,
  next: MiddlewareNext<MiddlewareNextResponse>,
) {
  const url = new URL(request.url);

  if (skipMiddleware(request.url)) {
    return next();
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

    return redirect(nextUrl);
  }

  return next();
}

const supportedLocales = [`en`, `pt`];
const defaultLocale = `en`;
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
