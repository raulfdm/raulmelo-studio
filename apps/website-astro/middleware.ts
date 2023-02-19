import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const supportedLocales = ['en', 'pt'];
const defaultLocale = 'en';

const passThroughRoutes = ['/cv'];

export default function middleware(request: Request) {
  const url = new URL(request.url);

  if (passThroughRoutes.includes(url.pathname)) {
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
  matcher: ['/((?!api|favicon.ico|assets|_image|@fs|@vite).*)'],
};
