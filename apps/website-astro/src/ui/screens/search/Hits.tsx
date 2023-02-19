import { getPostUrl, getTilUrl } from '@/infrastructure/utils/url';
import type { SupportedLanguages } from '@raulmelo/core';
import { Hits as HitsComp } from 'react-instantsearch-hooks-web';

import type { HitAlgolia } from './types';

type HitsProps = {
  lang: SupportedLanguages;
};

export function Hits({ lang }: HitsProps) {
  return (
    <div className="pb-5 md:pb-10 col-span-full">
      <HitsComp
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          const getUrl = hit._type === `post` ? getPostUrl : getTilUrl;
          return (
            // <PostBasic
            //   key={hit.objectID}
            //   {...hit}
            //   titleClassName="text-xl lg:text-2xl"
            //   url={getUrl(hit.slug, locale)}
            // />
            <h1 key={hit.objectID}>{hit.title}</h1>
          );
        }}
      />
    </div>
  );
}
