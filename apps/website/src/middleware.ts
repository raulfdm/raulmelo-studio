import { defineMiddleware, sequence } from 'astro/middleware';

const themeHintHandler = defineMiddleware(async ({ request, locals }, next) => {
  const response = (await next()) as Response;

  if (skipMiddleware(request.url)) {
    return response;
  }

  const chColorScheme =
    (request.headers.get(
      `sec-ch-prefers-color-scheme`,
    ) as App.Locals['themeHint']) || `system`;

  locals.themeHint = chColorScheme;

  response.headers.set(`Accept-CH`, `Sec-CH-Prefers-Color-Scheme`);

  return response;
});

export const onRequest = sequence(themeHintHandler);

const passThroughRoutes = [`/cv`, `/admin`, `/_image`, `/api`];

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
