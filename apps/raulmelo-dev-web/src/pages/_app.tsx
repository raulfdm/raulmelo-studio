import { AppProps } from 'next/dist/next-server/lib/router/router';

import { LocalizationProvider } from '@contexts/Localization';
import { AppContextProvider } from '@contexts/app';

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
