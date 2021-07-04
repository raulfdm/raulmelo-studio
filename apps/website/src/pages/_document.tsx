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
