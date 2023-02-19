import type { SupportedLanguages } from '@raulmelo/core';
import { InstantSearch } from 'react-instantsearch-hooks-web';

import { searchClient } from './searchClient';
import { Filters } from './Filters';
import { Hits } from './Hits';
import { PoweredByAlgolia } from './PoweredBy';
import { SearchBox } from './SearchBox';

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
      indexName={import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME}
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
