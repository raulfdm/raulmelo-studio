import prismStyles from '@raulmelo/ui/styles/prism.css';
import baseUiStyles from '@raulmelo/ui/styles/style.css';
import appStyles from './styles/app.css';
import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { getPublicEnvironmentVariables } from '$infrastructure/config/publicAppConfig';

export const meta: MetaFunction = () => ({
  charset: `utf-8`,
  title: `New Remix App`,
  viewport: `width=device-width,initial-scale=1`,
});

export function links() {
  return [
    { rel: `stylesheet`, href: prismStyles },
    { rel: `stylesheet`, href: baseUiStyles },
    { rel: `stylesheet`, href: appStyles },
    /**
     * Proxima Nova Font
     */
    { rel: `stylesheet`, href: `https://use.typekit.net/rsd6fwc.css` },
    /**
     * TODO: is this necessary at this level? maybe only on blog/til?
     */
    {
      rel: `preconnect`,
      href: `https://fonts.gstatic.com`,
      crossOrigin: `true`,
    },
    {
      rel: `preconnect`,
      href: `https://fonts.googleapis.com`,
      crossOrigin: `true`,
    },
    {
      rel: `stylesheet`,
      href: `https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap`,
    },
  ];
}

export function loader() {
  return json({
    ENV: getPublicEnvironmentVariables(),
  });
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {/**
         * Global Theme handler
         * It needs to be in the header to avoid FOUC (flash of unstyled content)
         *
         * `Script` from next/link won't work for this case because:
         * 1. It does not work inside `_document.tsx`;
         * 2. I need this script running before ANYTHING in the page so the
         *    the theme can be properly handled and consequently avoid FOUC.
         *
         * In that sense, if I move this to `_app` it'll only be loaded
         * after some elements are present already (incorrect behaviour).
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function themeHandler() {
                  if (
                    window.__theme === 'dark' ||
                    localStorage.theme === 'dark' ||
                    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
                    ) {
                    document.documentElement.classList.add('dark');
                    window.__theme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    window.__theme = 'light'
                  }
                })()
              `,
          }}
        ></script>
      </head>
      <body className="relative min-h-screen pb-12 duration-200 bg-white dark:bg-blue-900 text-primary transition-theme ease md:pb-16">
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
