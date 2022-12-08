import { AppContextProvider } from '$infrastructure/contexts/App';
import { LocalizationProvider } from '$infrastructure/contexts/Localization';
import { getLocales } from '$infrastructure/i18n/getLocales.server';
import { MenuBar } from '$ui/MenuBar';
import type { SupportedLanguages } from '@raulmelo/core';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData, useLocation } from '@remix-run/react';
import flat from 'flat';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import invariant from 'tiny-invariant';

export async function loader({ params }: LoaderArgs) {
  invariant(typeof params.locale === `string`, `lang is required`);

  const messages = await getLocales(params.locale as SupportedLanguages);

  return json({
    locale: params.locale as SupportedLanguages,
    messages: flat(messages) as Record<string, string>,
  });
}

export default function LocalizedRoute() {
  const { locale, messages } = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  return (
    <LocalizationProvider language={locale} messages={messages}>
      <AppContextProvider>
        <LazyMotion features={domAnimation} strict>
          <MenuBar />
          <AnimatePresence mode="wait">
            <m.main
              key={pathname}
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
              <Outlet />
            </m.main>
          </AnimatePresence>
        </LazyMotion>
      </AppContextProvider>
    </LocalizationProvider>
  );
}
