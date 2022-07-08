import { AlgoliaIcon } from '@raulmelo/ui';
import { connectPoweredBy } from 'react-instantsearch-dom';

import styles from './PoweredBy.module.css';

function PoweredByAlgolia({ url }: { url: string }) {
  return (
    <div className={styles.PoweredBy}>
      <a href={url}>
        Powered by <AlgoliaIcon className="w-8" color="#5468ff" /> Algolia
      </a>
    </div>
  );
}

export const PoweredBy = connectPoweredBy(PoweredByAlgolia);
