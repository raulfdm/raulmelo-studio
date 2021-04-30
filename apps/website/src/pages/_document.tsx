import { GA_TRACKING_ID } from '@config/analytics';
import { domAnimation, LazyMotion } from 'framer-motion';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import tw, { css } from 'twin.macro';

const styles = {
  /* padding bottom ensures the same spacing for all spacing*/
  body: css`
    ${tw`min-h-screen`};
    ${tw`bg-white dark:bg-blue-900`};
    ${tw`text-primary`};
    ${tw`transition-theme duration-200 ease`};
    ${tw`relative`};
    ${tw`pb-12 md:pb-16`};
  `,
};
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          {/* Proxima Nova Font */}
          <link rel="stylesheet" href="https://use.typekit.net/rsd6fwc.css" />
          {/* Global Theme handler
            It needs to be in the header to avoid FOUC (flash of unstyled content)
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
          />
        </Head>
        <body css={styles.body}>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <LazyMotion features={domAnimation} strict>
            <Main />
          </LazyMotion>
          <NextScript />
        </body>
      </Html>
    );
  }
}
