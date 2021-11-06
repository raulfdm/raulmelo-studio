import { MenuBar } from '@components/MenuBar';
import { analyticsConfig } from '@config/analytics';
import Script from 'next/script';
import { AppContextProvider } from '@contexts/app';
import { LocalizationProvider } from '@contexts/Localization';
import { getSocial } from '@utils/seo';
import { motion } from 'framer-motion';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import React from 'react';
import siteData from 'site-data';
import '@raulmelo/styles/lib/base.css';
import { globalStyles } from 'twin.macro';
import { CSSObject, Global } from '@emotion/react';
import { SupportedLanguages } from '@raulfdm/core';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const defaultSeo = siteData.defaultSeo[router.locale as SupportedLanguages];

  const twitterData = getSocial('twitter');

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script src={analyticsConfig.scriptUrl} />
      <Script>{analyticsConfig.gtagLoadScript}</Script>

      <Global styles={globalStyles as CSSObject} />

      <SocialProfileJsonLd
        type="person"
        name={siteData.personalInformation.full_name}
        url={siteData.site.url}
        sameAs={siteData.socials.map((social) => social.url)}
      />

      <LogoJsonLd
        logo={`${siteData.site.url}/logo.png`}
        url={siteData.site.url}
      />
      <DefaultSeo
        title={defaultSeo.title}
        titleTemplate={`%s · ${siteData.personalInformation.full_name}`}
        description={defaultSeo.description}
        canonical={siteData.site.url + (router.asPath || '')}
        openGraph={{
          title: siteData.personalInformation.full_name,
          description: defaultSeo.description,
          type: 'website',
          site_name: siteData.personalInformation.full_name,
          images: [
            {
              url: siteData.site.seo_image.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.full_name,
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

      <LocalizationProvider>
        <AppContextProvider>
          <MenuBar />
          <motion.main
            className="grid-container"
            animate="enter"
            exit="exit"
            initial="initial"
            key={router.route}
            variants={{
              initial: { opacity: 0, x: 40 },
              enter: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -40 },
            }}
          >
            <Component {...pageProps} />
          </motion.main>
        </AppContextProvider>
      </LocalizationProvider>
    </>
  );
};

export default MyApp;
