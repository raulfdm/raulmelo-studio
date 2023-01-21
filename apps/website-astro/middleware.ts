import { match } from '@formatjs/intl-localematcher';
import { rewrite } from '@vercel/edge';
import Negotiator from 'negotiator';

const supportedLocales = ['en', 'pt'];
const defaultLocale = 'en';

function getLocale(request: Request) {
  const languages = new Negotiator({
    headers: request.headers as any,
  }).languages(supportedLocales);

  return match(languages, supportedLocales, defaultLocale);
}

export default function middleware(request: Request) {
  const url = new URL(request.url);

  console.log('URL REQUESTED', url.toString());

  const pathnameIsMissingLocale = supportedLocales.every(
    (locale) =>
      !url.pathname.startsWith(`/${locale}/`) && url.pathname !== `/${locale}`,
  );

  /**
   * Cases:
   * - <url>/en
   * - <url>/en/
   *
   * Should be actually `<url>/` and rewrite under the hood to `<url>/en`
   */
  if (url.pathname === '/en' || url.pathname === '/en/') {
    console.log('/EN CASE. Redirecting', url);
    return Response.redirect(new URL(`/`, request.url).toString());
  }

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    /**
     * Since english is the default, we always rewrite instead of redirecting
     */
    if (locale === 'en') {
      const nextUrl = new URL(
        normalizePathname(`/en/${url.pathname}`),
        request.url,
      );
      console.log('ENGLISH CASE. Rewriting', nextUrl.toString());

      return rewrite(nextUrl);
    }

    /**
     * If it's portuguese, then we need to redirect
     */
    const nextUrl = new URL(
      normalizePathname(`/${locale}/${url.pathname}`),
      request.url,
    ).toString();
    console.log('PORTUGUESE CASE. Redirecting', nextUrl);
    return Response.redirect(nextUrl);
  }
}

function normalizePathname(pathname: string) {
  return pathname.replaceAll('//', '/');
}

export const config = {
  // Only run the middleware on the admin route
  matcher: ['/((?!api|favicon.ico|assets|@fs|@vite).*)'],
};
