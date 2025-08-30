import { InstantSearch } from 'react-instantsearch';
import { algoliasearch } from 'algoliasearch';

import type { SupportedLanguage } from '@raulmelo/core/intl';

import { Filters } from './Filters';
import { Hits } from './Hits';
import { PoweredByAlgolia } from './PoweredBy';
import { SearchBox } from './SearchBox';

export interface SearchProps {
  lang: SupportedLanguage;
  tagsTitle: string;
  typeTitle: string;
  languageTitle: string;
  inputSearchPlaceholder: string;
  indexName: string;
  searchKey: string;
  appId: string;
}

export function Search({
  lang,
  tagsTitle,
  languageTitle,
  typeTitle,
  inputSearchPlaceholder,
  indexName,
  appId,
  searchKey,
}: SearchProps) {
  return (
    <InstantSearch
      searchClient={algoliasearch(appId, searchKey)}
      indexName={indexName}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
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
