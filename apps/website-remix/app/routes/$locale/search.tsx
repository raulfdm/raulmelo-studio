import { FormattedMessage, IntlProvider } from 'react-intl';
import { renderToString } from 'react-dom/server';

import { InstantSearchSSRProvider } from 'react-instantsearch-hooks-web';
import { getServerState } from 'react-instantsearch-hooks-server';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useLocalization } from '$infrastructure/contexts/Localization';
import { getLocales } from '$infrastructure/i18n/getLocales.server';
import invariant from 'tiny-invariant';
import type { SupportedLanguages } from '@raulmelo/core';
import { Search } from '$screens/search/components/Search';

export async function loader({ params }: LoaderArgs) {
  invariant(typeof params.locale === `string`, `lang is required`);

  const currentLocale = params.locale as SupportedLanguages;

  const messages = await getLocales(currentLocale);

  const searchServerState = await getServerState(
    <IntlProvider locale={currentLocale} messages={messages}>
      <Search
        locale={currentLocale}
        languageTitle={messages[`search.filters.lang`]}
        tagsTitle={messages[`search.filters.tags`]}
        typeTitle={messages[`search.filters.type`]}
        inputSearchPlaceholder={messages[`search.input`]}
      />
    </IntlProvider>,
    { renderToString },
  );

  return json({
    searchServerState,
  });
}

export default function SearchRoute() {
  const { searchServerState } = useLoaderData<typeof loader>();
  const { locale, formatMessage } = useLocalization();

  return (
    <>
      <header className="mb-6 col-span-full">
        <h1 className="text-3xl font-extrabold md:text-4xl col-span-full">
          <FormattedMessage id="search.pageTitle" />
        </h1>
        <p className="text-lg">
          <FormattedMessage
            id="search.paragraph"
            values={{
              a: function Anchor(chunks: never) {
                return (
                  <a
                    className="underline text-secondary"
                    href="https://www.google.com/search?q=site%3Araulmelo.dev+javascript"
                  >
                    {chunks}
                  </a>
                );
              } as unknown as React.ReactNode,
            }}
          />
        </p>
      </header>

      <InstantSearchSSRProvider {...searchServerState}>
        <Search
          locale={locale}
          tagsTitle={formatMessage({ id: `search.filters.tags` })}
          languageTitle={formatMessage({ id: `search.filters.lang` })}
          typeTitle={formatMessage({ id: `search.filters.type` })}
          inputSearchPlaceholder={formatMessage({ id: `search.input` })}
        />
      </InstantSearchSSRProvider>
    </>
  );
}
