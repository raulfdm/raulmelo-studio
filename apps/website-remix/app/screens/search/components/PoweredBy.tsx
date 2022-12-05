import { AlgoliaIcon } from '@raulmelo/ui';

export function PoweredByAlgolia() {
  return (
    <div className="search__poweredBy">
      <a href="https://algolia.com">
        Powered by <AlgoliaIcon className="w-8" color="#5468ff" /> Algolia
      </a>
    </div>
  );
}
