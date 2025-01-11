import { defineMiddleware, sequence } from 'astro:middleware';
import { redirectToDefaultLocale } from 'astro:i18n';
import { isAcceptedLocale } from './lib/config/locale';

const locale = defineMiddleware(async (ctx, next) => {
  const url = new URL(ctx.request.url);

  // handles the root path
  if (url.pathname === '/') {
    return redirectToPreferredOrDefaultLocale();
  }

  /**
   * === Handles single 1 level locale paths ===
   * I'm handling this because since I've set to do "manual" routing, if the user
   * lands to a route like "/something", Astro won't redirect to the default locale
   * but render the `pages/index.astro` file, which is a blank page.
   *
   * Instead, I want to understand if it's an accepted locale and if not, redirect the user
   * to the default entry page.
   */
  const pathnameParts = url.pathname.split('/').filter(Boolean);
  const [firstPart] = pathnameParts;

  if (pathnameParts.length === 1 && isAcceptedLocale(firstPart) === false) {
    return redirectToPreferredOrDefaultLocale();
  }

  return next();

  function redirectToPreferredOrDefaultLocale() {
    // This case will always hit if the `Accept-Language` header contains one of the
    // supported locales. Otherwise it'll be undefined.
    if (ctx.preferredLocale) {
      return ctx.redirect(`/${ctx.preferredLocale}/`, 302);
    }

    const response = redirectToDefaultLocale(ctx, 302);

    // The signature of redirectToDefaultLocale maybe be undefined, so I'm just ensuring!
    if (!response) {
      console.error('REDIRECT_TO_DEFAULT_LOCALE', {
        message: 'is not defined',
      });

      throw new Error('No default locale set');
    }

    return response;
  }
});

export const onRequest = sequence(locale);
