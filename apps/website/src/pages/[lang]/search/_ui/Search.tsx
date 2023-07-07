import type { SupportedLanguages } from '@raulmelo/core/config';
import { InstantSearch } from 'react-instantsearch-hooks-web';

import { clientEnv } from '@/infrastructure/env/client';

import { Filters } from './Filters';
import { Hits } from './Hits';
import { PoweredByAlgolia } from './PoweredBy';
import { SearchBox } from './SearchBox';
import { searchClient } from './searchClient';

type SearchProps = {
  lang: SupportedLanguages;
  tagsTitle: string;
  typeTitle: string;
  languageTitle: string;
  inputSearchPlaceholder: string;
};

export function Search({
  lang,
  tagsTitle,
  languageTitle,
  typeTitle,
  inputSearchPlaceholder,
}: SearchProps) {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={clientEnv.PUBLIC_ALGOLIA_INDEX_NAME}
    >
      <SearchBox placeholder={inputSearchPlaceholder} />
      <Filters
        tagsTitle={tagsTitle}
        languageTitle={languageTitle}
        typeTitle={typeTitle}
      />
      <Hits lang={lang} />
      <PoweredByAlgolia />
    </InstantSearch>
  );
}
