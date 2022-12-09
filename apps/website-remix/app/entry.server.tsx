import type { EntryContext } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { renderToString } from 'react-dom/server';
import {
  getRecommendedLocaleFromRequest,
  localeCookie,
} from '$infrastructure/utils/i18n';
import { getPublicEnvironmentVariables } from '$infrastructure/config/publicAppConfig';

global.ENV = getPublicEnvironmentVariables();

/**
 * TODO: move this to another page
 */

const locales = [`en`, `pt`];

const ROUTES_WITHOUT_LOCALE = new Set([`/admin`]);

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const url = new URL(request.url);

  const isHomePage = url.pathname === `/`;
  const isKnownLocale = locales.some((locale) =>
    url.pathname.startsWith(`/${locale}`),
  );

  if (isAllowedRouteWithoutLocale(url.pathname)) {
    return renderApp();
  } else if (isHomePage) {
    /**
     * When the user hits `/`, based on accepted-languages from headers, we redirect
     * they to one of the supported languages.
     *
     * This is useful when the user has their browser set to a primary language we
     * support.
     *
     * Because we always fallback to `en`, if they have a not supported language,
     * we don't need to worry.
     */
    const parsedSetLocaleCookie = await localeCookie.parse(
      request.headers.get(`Cookie`),
    );

    const recommendedLocale =
      parsedSetLocaleCookie ?? getRecommendedLocaleFromRequest(request);

    return redirect(`/${recommendedLocale}`, {
      headers: {
        'Set-Cookie': await localeCookie.serialize(recommendedLocale),
      },
    });

    /**
     * For this case, based on the previous version of the blog, we must redirect the user to the new URL.
     *
     * Using Next12, a route could be `<base>/blog/my-post` and by default this would be using the default `en` locale.
     *
     * I still didn't get how to have the same behaviour using remix, so I'm checking if it's such a case and redirecting
     * they to the language prefixed URL:
     *
     * <base>/blog/my-post -> <base>/en/blog/my-post
     *
     * If this URL does not exist, then it'll follow the normal flow hitting 404.
     */
  } else if (isKnownLocale === false) {
    return redirect(`/en${url.pathname}`);
  } else {
    return renderApp();
  }

  function renderApp() {
    const markup = renderToString(
      <RemixServer context={remixContext} url={request.url} />,
    );

    responseHeaders.set(`Content-Type`, `text/html`);

    return new Response(`<!DOCTYPE html>` + markup, {
      headers: responseHeaders,
      status: responseStatusCode,
    });
  }
}

function isAllowedRouteWithoutLocale(pathname: string) {
  if (ROUTES_WITHOUT_LOCALE.has(pathname)) {
    return true;
  }

  let isAllowed = false;

  for (const allowedRoute of ROUTES_WITHOUT_LOCALE.values()) {
    if (pathname.startsWith(allowedRoute)) {
      isAllowed = true;
      break;
    }
  }

  return isAllowed;
}
