import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: React.ElementType) => (props: unknown) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/css/reset.css" />
          <link rel="stylesheet" href="/css/fonts.css" />
          <link rel="stylesheet" href="/css/nextjs.css" />
        </Head>
        <body>
          {/* Global Theme handler */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function themeHandler() {
                window.__onThemeChange = function () {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
