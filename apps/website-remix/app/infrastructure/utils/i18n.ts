import { createCookie } from '@remix-run/node';
import acceptLanguage from 'accept-language-parser';

type Locale = 'en' | 'pt';

export const localeCookie = createCookie('raulmelo_v20220524_locale', {
  path: '/',
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  // Expire in 1 year from now
  expires: new Date(Date.now() + 31_536_000_000),
  maxAge: 31_536_000,
});

const FALLBACK_LOCALE = 'en';

export function getRecommendedLocaleFromRequest(request: Request): Locale {
  const { headers } = request;

  const acceptLanguageFromHeaders = headers.get('accept-language') || '';

  console.log(
    'AIIIII',
    { acceptLanguageFromHeaders },
    acceptLanguage.pick<Locale>(['pt', 'en'], acceptLanguageFromHeaders),
  );

  return (
    acceptLanguage.pick<Locale>(['pt', 'en'], acceptLanguageFromHeaders) ||
    FALLBACK_LOCALE
  );
}
