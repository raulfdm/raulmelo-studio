import { AppProps } from 'next/dist/next-server/lib/router/router';
import App from 'next/app';

import { parseAcceptLanguage } from '@utils/headers';
import { LocalizationProvider } from '@contexts/react-intl';
import { AppContextProvider } from '@contexts/app';
import { head } from '@utils/utilities';

const MyApp = ({ Component, pageProps, language }: AppProps) => {
  return (
    <LocalizationProvider lang={language}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </LocalizationProvider>
  );
};

const getInitialProps: typeof App.getInitialProps = async (appContext) => {
  const {
    ctx: { req },
  } = appContext;

  const langs = parseAcceptLanguage(req?.headers['accept-language']);

  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    language: head(langs),
  };
};

MyApp.getInitialProps = getInitialProps;

export default MyApp;
