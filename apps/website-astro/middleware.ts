import {
  getLanguageFromAcceptLanguage,
  supportedLocales,
} from '@/infrastructure/i18n/getLanguageFromAcceptLanguage.server';

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
      request.headers.get('accept-language') || '',
    );

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

function normalizePathname(pathname: string) {
  return pathname.replaceAll('//', '/');
}

export const config = {
  matcher: ['/((?!api|favicon.ico|assets|_astro|_image|build|@fs|@vite).*)'],
};
