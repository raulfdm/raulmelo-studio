import { SearchBox as SearchBoxComp } from 'react-instantsearch-dom';
import { defineMessages } from 'react-intl';

import { useLocalization } from '~/hooks/useLocalization';

const messages = defineMessages({
  input: {
    id: 'search.input',
  },
});

export const SearchBox = () => {
  const { formatMessage } = useLocalization();

  return (
    <div className="col-span-full">
      <SearchBoxComp
        searchAsYouType
        autoFocus
        translations={{ placeholder: formatMessage(messages.input) }}
      />
    </div>
  );
};
