import type { SupportedLanguages } from '@raulmelo/core/config';
import { InstantSearch } from 'react-instantsearch-hooks-web';

import { searchClient } from '../searchClient';
import { Filters } from './Filters';
import { Hits } from './Hits';
import { PoweredByAlgolia } from './PoweredBy';
import { SearchBox } from './SearchBox';

type SearchProps = {
  locale: SupportedLanguages;
  tagsTitle: string;
  typeTitle: string;
  languageTitle: string;
  inputSearchPlaceholder: string;
};

export function Search({
  locale,
  tagsTitle,
  languageTitle,
  typeTitle,
  inputSearchPlaceholder,
}: SearchProps) {
  return (
    <InstantSearch searchClient={searchClient} indexName={ENV.search.indexName}>
      <SearchBox placeholder={inputSearchPlaceholder} />
      <Filters
        tagsTitle={tagsTitle}
        languageTitle={languageTitle}
        typeTitle={typeTitle}
      />
      <Hits locale={locale} />
      <PoweredByAlgolia />
    </InstantSearch>
  );
}
