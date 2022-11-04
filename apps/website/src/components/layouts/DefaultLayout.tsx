import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';

// import router from 'next/router';
import { AppContextProvider } from '~/contexts/app';
import { LocalizationProvider } from '~/contexts/Localization';

import { MenuBar } from '../MenuBar';

type DefaultLayoutProps = {
  children: React.ReactNode;
  currentRoute?: string;
};

export function DefaultLayout({ children, currentRoute }: DefaultLayoutProps) {
  return (
    <LocalizationProvider>
      <LazyMotion features={domAnimation} strict>
        <AppContextProvider>
          <MenuBar />
          <AnimatePresence mode="wait">
            <m.main
              key={currentRoute}
              className="grid-container"
              animate="enter"
              exit="exit"
              initial={false}
              variants={{
                initial: { opacity: 0, x: 40 },
                enter: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -40 },
              }}
            >
              {children}
            </m.main>
          </AnimatePresence>
        </AppContextProvider>
      </LazyMotion>
    </LocalizationProvider>
  );
}
