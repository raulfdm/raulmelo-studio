import { connectPoweredBy } from 'react-instantsearch-dom';

import { AlgoliaIcon } from '~/components/Icons';

import { searchStyles } from '../styles';

function PoweredByAlgolia({ url }: { url: string }) {
  return (
    <div css={searchStyles.poweredLink}>
      <a href={url}>
        Powered by <AlgoliaIcon tw="w-8" color="#5468ff" /> Algolia
      </a>
    </div>
  );
}

export const PoweredBy = connectPoweredBy(PoweredByAlgolia);
