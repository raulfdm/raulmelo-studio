import '@raulmelo/ui/styles/prism.css';
import '@raulmelo/ui/styles/style.css';
import '@raulmelo/styles/lib/styles.css';
import '../styles/algolia-global.css';

import { SupportedLanguages } from '@raulmelo/core';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { AppProps } from 'next/dist/shared/lib/router/router';
import Head from 'next/head';
import Script from 'next/script';
import { DefaultSeo, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import { MenuBar } from '~/components/MenuBar';
import { analyticsConfig } from '~/config/analytics';
import { AppContextProvider } from '~/contexts/app';
import { LocalizationProvider } from '~/contexts/Localization';
import siteData from '~/site-data';
import { getSocial } from '~/utils/seo';

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

      <LocalizationProvider>
        <LazyMotion features={domAnimation} strict>
          <AppContextProvider>
            <MenuBar />
            <AnimatePresence exitBeforeEnter>
              <m.main
                className="grid-container"
                animate="enter"
                exit="exit"
                initial={false}
                key={router.route}
                variants={{
                  initial: { opacity: 0, x: 40 },
                  enter: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -40 },
                }}
              >
                <Component {...pageProps} />
              </m.main>
            </AnimatePresence>
          </AppContextProvider>
        </LazyMotion>
      </LocalizationProvider>
    </>
  );
};

export default MyApp;
