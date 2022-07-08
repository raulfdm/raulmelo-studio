import { domAnimation, LazyMotion } from 'framer-motion';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          {/* Proxima Nova Font */}
          <link rel="stylesheet" href="https://use.typekit.net/rsd6fwc.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap"
            rel="stylesheet"
          />

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
        <body className="relative min-h-screen pb-12 duration-200 bg-white dark:bg-blue-900 text-primary transition-theme ease md:pb-16">
          <LazyMotion features={domAnimation} strict>
            <Main />
          </LazyMotion>
          <NextScript />
        </body>
      </Html>
    );
  }
}
