import { connectPoweredBy } from 'react-instantsearch-dom';
import { AlgoliaIcon } from '@components/Icons';
import { searchStyles } from '../styles';

function PoweredByAlgolia({ url }: { url: string }) {
  return (
    <a css={searchStyles.poweredLink} href={url}>
      Powered by <AlgoliaIcon tw="w-8" color="#5468ff" /> Algolia
    </a>
  );
}

export const PoweredBy = connectPoweredBy(PoweredByAlgolia);
