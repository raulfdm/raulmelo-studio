import { defineMiddleware, sequence } from 'astro:middleware';
import { redirectToDefaultLocale } from 'astro:i18n';
import {
  getValidLocale,
  getValidLocaleFromLocaleList,
} from './lib/config/locale';

const locale = defineMiddleware(async (ctx, next) => {
  const url = new URL(ctx.request.url);

  const validPreferredLocale =
    getValidLocale(ctx.preferredLocale) ||
    getValidLocaleFromLocaleList(ctx.preferredLocaleList);

  // Handles no locale in the URL
  if (url.pathname === '/') {
    if (validPreferredLocale === null) {
      return redirectToDefaultLocale(ctx, 302) as unknown as Promise<Response>;
    } else {
      return ctx.redirect(`/${validPreferredLocale}/`, 302);
    }
  }

  console.log(url, ctx.routePattern);
  // // Handles locale in the URL
  // const { locale } = ctx.params;

  // const validLocale = getValidLocale(locale);

  // if (validLocale === null) {
  //   return redirectToDefaultLocale(ctx, 302) as unknown as Promise<Response>;
  // }

  return next();
});

export const onRequest = sequence(locale);
