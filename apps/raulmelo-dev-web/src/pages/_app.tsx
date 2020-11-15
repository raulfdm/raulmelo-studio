import { AppProps } from 'next/dist/next-server/lib/router/router';

import { LocalizationProvider } from '@contexts/Localization';
import { AppContextProvider } from '@contexts/app';

import '@styles/css/reset.css';
import '@styles/css/fonts.css';
import '@styles/css/nextjs.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <LocalizationProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </LocalizationProvider>
  );
};

export default MyApp;
