import { MenuBar } from '@components/MenuBar';
import { AppContextProvider } from '@contexts/app';
import { LocalizationProvider } from '@contexts/Localization';
import '@raulfdm/blog-components/dist/static/css/base.css';
import '@styles/algolia.css';
import { motion } from 'framer-motion';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <LocalizationProvider>
      <AppContextProvider>
        <MenuBar />
        <motion.main
          className="grid-container"
          animate="enter"
          exit="exit"
          initial="initial"
          key={router.route}
          variants={{
            initial: { opacity: 0, x: 40 },
            enter: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -40 },
          }}
        >
          <Component {...pageProps} />
        </motion.main>
      </AppContextProvider>
    </LocalizationProvider>
  );
};

export default MyApp;
