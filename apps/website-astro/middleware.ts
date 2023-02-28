import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const supportedLocales = ['en', 'pt'];
const defaultLocale = 'en';

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
    const locale = getLocale(request);

    const normalizedPathname = normalizePathname(`/${locale}/${url.pathname}`);

    const nextUrl = new URL(normalizedPathname, request.url).toString();

    return Response.redirect(nextUrl);
  }
}

const passThroughRoutes = ['/cv', '/admin'];

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

function getLocale(request: Request) {
  const languages = new Negotiator({
    headers: request.headers as any,
  }).languages(supportedLocales);

  return match(languages, supportedLocales, defaultLocale);
}

function normalizePathname(pathname: string) {
  return pathname.replaceAll('//', '/');
}

export const config = {
  matcher: ['/((?!api|favicon.ico|assets|_astro|_image|build|@fs|@vite).*)'],
};
