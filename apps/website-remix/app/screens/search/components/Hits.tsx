import getPostUrl, { getTilUrl } from '$infrastructure/utils/url';
import { PostBasic } from '$ui/PostBasic';
import type { SupportedLanguages } from '@raulmelo/core/config';
import { Hits as HitsComp } from 'react-instantsearch-hooks-web';

import type { HitAlgolia } from '../types';

type HitsProps = {
  locale: SupportedLanguages;
};

export function Hits({ locale }: HitsProps) {
  return (
    <div className="pb-5 md:pb-10 col-span-full">
      <HitsComp
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          const getUrl = hit._type === `post` ? getPostUrl : getTilUrl;
          return (
            <PostBasic
              key={hit.objectID}
              {...hit}
              titleClassName="text-xl lg:text-2xl"
              url={getUrl(hit.slug, locale)}
            />
          );
        }}
      />
    </div>
  );
}
