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
    return Response.redirect(new URL(`/`, request.url).toString());
  }

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    /**
     * Since english is the default, we always rewrite instead of redirecting
     */
    if (locale === 'en') {
      return rewrite(new URL(`/en/${url.pathname}`, request.url));
    }

    /**
     * If it's portuguese, then we need to redirect
     */
    return Response.redirect(
      new URL(`/${locale}/${url.pathname}`, request.url).toString(),
    );
  }
}

export const config = {
  // Only run the middleware on the admin route
  matcher: ['/((?!api|_next/static|favicon.ico|@fs|@vite).*)'],
};
