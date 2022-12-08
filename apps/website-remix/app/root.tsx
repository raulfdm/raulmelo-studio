import prismStyles from '@raulmelo/ui/styles/prism.css';
import baseUiStyles from '@raulmelo/ui/styles/style.css';
import appStyles from './styles/app.css';
import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
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
import type { PublicEnv } from '$infrastructure/config/publicAppConfig';
import { getPublicEnvironmentVariables } from '$infrastructure/config/publicAppConfig';
import type { StructuredDataFunction } from 'remix-utils';
import { StructuredData } from 'remix-utils';
import type { ISiteData } from '@raulmelo/core/dist/types/domains/siteData';
import { domains } from '@raulmelo/core';
import { getSEOTags } from '$infrastructure/utils/seo';
import type { Organization, Person } from 'schema-dts';

type LoaderData = {
  ENV: PublicEnv;
  locale: string;
  siteData: ISiteData;
  pathname: string;
  origin: string;
  url: string;
};

const structuredData: StructuredDataFunction<
  SerializeFrom<LoaderData>,
  any
> = ({ data }) => {
  const { siteData, url, origin } = data;

  return [
    {
      '@type': `Person`,
      name: siteData.personalInformation.fullName,
      url: siteData.site.url,
      sameAs: siteData.socials.map((social) => social.url),
    } as Person,
    {
      '@type': `Organization`,
      logo: `${origin}/logo.png`,
      url,
    } as Organization,
  ];
};

export const handle = { structuredData };

export const meta: MetaFunction = ({ data }) => {
  const { siteData, locale, pathname } = data as LoaderData;

  const defaultSeo = siteData.defaultSeo[locale];

  return {
    charset: `utf-8`,
    viewport: `width=device-width,initial-scale=1`,
    ...getSEOTags({
      type: `website`,
      url: `${siteData.site.url}${pathname}`,
      title: siteData.personalInformation.fullName,
      description: defaultSeo.description,
      image: {
        url: `${siteData.site.seoImage.url}?w=1024&h=512&fit=crop&auto=format`,
        width: 1024,
        height: 512,
        alt: siteData.personalInformation.fullName,
      },
    }),
    title: `Raul Melo · ${defaultSeo.title}`,
    monetization: `$ilp.uphold.com/Aa8j4MXjnPHg`,
    'theme-color': `#fff`,
  };
};

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
    /**
     * TODO: add site.webmanifest logic
     */
    { rel: `manifest`, href: `/site.webmanifest` },
    {
      rel: `mask-icon`,
      href: `/safari-pinned-tab.svg`,
      color: `#000000`,
    },
    {
      rel: `apple-touch-icon`,
      sizes: `180x180`,
      href: `/apple-touch-icon.png`,
    },
    {
      rel: `icon`,
      type: `image/png`,
      sizes: `32x32`,
      href: `/favicon-32x32.png`,
    },
    {
      rel: `icon`,
      type: `image/png`,
      sizes: `16x16`,
      href: `/favicon-16x16.png`,
    },
  ];
}

export async function loader({ params, request }: LoaderArgs) {
  const locale = params.locale || `en`;

  const siteData = await domains.siteData.querySiteData();

  const url = new URL(request.url);

  return json<LoaderData>({
    ENV: getPublicEnvironmentVariables(),
    locale,
    siteData,
    pathname: url.pathname,
    origin: url.origin,
    url: url.href,
  });
}

export default function App() {
  const { ENV, locale } = useLoaderData<typeof loader>();

  return (
    <html lang={locale}>
      <head>
        <Meta />
        <Links />
        <StructuredData />
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
