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
        </Head>
        <body css={styles.body}>
          <LazyMotion features={domAnimation} strict>
            <Main />
          </LazyMotion>
          <NextScript />
        </body>
      </Html>
    );
  }
}
