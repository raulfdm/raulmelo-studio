import { GA_TRACKING_ID } from '@config/analytics';
import classNames from 'classnames';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body
          className={classNames([
            'h-full',
            'bg-white dark:bg-blue-900',
            'text-black dark:text-white',
            'transition-theme duration-200 ease',
            'relative',
          ])}
        >
          {/* Global Theme handler */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function themeHandler() {
                window.__onThemeChange = function () {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.querySelector('html').className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) {}
                window.__setPreferredTheme = function (newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                };
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function (e) {
                  window.__setPreferredTheme(e.matches ? 'dark' : 'light');
                });
                setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
              })()
            `,
            }}
          />
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
