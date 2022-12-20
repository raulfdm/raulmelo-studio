import { FormattedMessage, IntlProvider } from 'react-intl';
import { renderToString } from 'react-dom/server';

import type { InstantSearchServerState } from 'react-instantsearch-hooks-web';
import { InstantSearchSSRProvider } from 'react-instantsearch-hooks-web';
import { getServerState } from 'react-instantsearch-hooks-server';
import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useLocalization } from '$infrastructure/contexts/Localization';
import type { FlatMessages } from '$infrastructure/i18n/getLocales.server';
import { getLocales } from '$infrastructure/i18n/getLocales.server';
import { Search } from '$screens/search/components/Search';
import { getSEOTags } from '$infrastructure/utils/seo';
import { getParamLocaleOrDefault } from '$infrastructure/utils/i18n';

type LoaderData = {
  searchServerState: InstantSearchServerState;
  messages: FlatMessages;
};

export const meta: MetaFunction<LoaderData> = ({ data }) => {
  const { messages } = data;

  return getSEOTags({
    title: `Raul Melo - ${messages[`search.pageTitle`]}`,
    type: `website`,
    noIndex: true,
  });
};

export async function loader({ params }: LoaderArgs) {
  const locale = getParamLocaleOrDefault(params);

  const messages = await getLocales(locale);

  const searchServerState = await getServerState(
    <IntlProvider locale={locale} messages={messages}>
      <Search
        locale={locale}
        languageTitle={messages[`search.filters.lang`]}
        tagsTitle={messages[`search.filters.tags`]}
        typeTitle={messages[`search.filters.type`]}
        inputSearchPlaceholder={messages[`search.input`]}
      />
    </IntlProvider>,
    { renderToString },
  );

  return json<LoaderData>({
    searchServerState,
    messages,
  });
}

export default function SearchRoute() {
  const { searchServerState } = useLoaderData<LoaderData>();
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
