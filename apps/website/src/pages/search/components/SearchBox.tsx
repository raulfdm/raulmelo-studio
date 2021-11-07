import { SearchBox as SearchBoxComp } from 'react-instantsearch-dom';
import { defineMessages } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';

import { searchStyles } from '../styles';

const messages = defineMessages({
  input: {
    id: 'search.input',
  },
});

export const SearchBox = () => {
  const { formatMessage } = useLocalization();

  return (
    <div css={searchStyles.searchArea}>
      <SearchBoxComp
        searchAsYouType
        autoFocus
        translations={{ placeholder: formatMessage(messages.input) }}
      />
    </div>
  );
};
