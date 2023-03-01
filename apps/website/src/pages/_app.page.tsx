import '@raulmelo/ui/styles/prism.css';
import '@raulmelo/ui/styles/style.css';
import '@raulmelo/styles/lib/styles.css';
import '../styles/algolia-global.css';
import '../styles/globals.css';

import type { SupportedLanguages } from '@raulmelo/core/config';
import type { NextPage } from 'next';
import type { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import Script from 'next/script';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';
import type { ReactElement, ReactNode } from 'react';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';
import { analyticsConfig } from '~/config/analytics';
import siteData from '~/site-data';
import { getSocial } from '~/utils/seo';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const defaultSeo = siteData.defaultSeo[router.locale as SupportedLanguages];

  const twitterData = getSocial('twitter');
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <DefaultLayout currentRoute={router.route}>{page}</DefaultLayout>
    ));

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script src={analyticsConfig.scriptUrl} strategy="afterInteractive" />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: analyticsConfig.gtagLoadScript,
        }}
      />

      <SocialProfileJsonLd
        type="Person"
        name={siteData.personalInformation.fullName}
        url={siteData.site.url}
        sameAs={siteData.socials.map((social) => social.url)}
      />

      <LogoJsonLd
        logo={`${siteData.site.url}/logo.png`}
        url={siteData.site.url}
      />
      <DefaultSeo
        title={defaultSeo.title}
        titleTemplate={`%s · ${siteData.personalInformation.fullName}`}
        description={defaultSeo.description}
        canonical={siteData.site.url + (router.asPath || '')}
        openGraph={{
          title: siteData.personalInformation.fullName,
          description: defaultSeo.description,
          type: 'website',
          site_name: siteData.personalInformation.fullName,
          images: [
            {
              url: siteData.site.seoImage.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.fullName,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: twitterData.username,
          site: twitterData.username,
        }}
        additionalMetaTags={[
          { name: 'monetization', content: '$ilp.uphold.com/Aa8j4MXjnPHg' },
          { name: 'theme-color', content: '#ffffff' },
        ]}
        additionalLinkTags={[
          { rel: 'manifest', href: '/site.webmanifest' },
          {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#000000',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
        ]}
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

export default MyApp;
