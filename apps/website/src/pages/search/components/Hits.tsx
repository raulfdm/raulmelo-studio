import { Hits as HitsComp } from 'react-instantsearch-dom';

import { PostBasic } from '~/components/PostBasic';
import { getTilUrl } from '~/pages/til/home/utils';
import { getPostUrl } from '~/utils/url';

import type { HitAlgolia } from '../types';

export const Hits = () => {
  return (
    <div className="pb-5 md:pb-10 col-span-full">
      <HitsComp
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          const getUrl = hit._type === 'post' ? getPostUrl : getTilUrl;
          return (
            <PostBasic
              key={hit.objectID}
              {...hit}
              titleClassName="text-xl lg:text-2xl"
              url={getUrl(hit.slug)}
            />
          );
        }}
      />
    </div>
  );
};
