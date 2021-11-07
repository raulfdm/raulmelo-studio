import { PostBasic } from '@components/PostBasic';
import { getPostUrl } from '@utils/url';
import { Hits as HitsComp } from 'react-instantsearch-dom';
import tw from 'twin.macro';

import { getTilUrl } from '~/pages/til/home/utils';

import { searchStyles } from '../styles';
import { HitAlgolia } from '../types';

export const Hits = () => {
  return (
    <div css={searchStyles.hits}>
      <HitsComp
        hitComponent={({ hit }: { hit: HitAlgolia }) => {
          const getUrl = hit.type === 'post' ? getPostUrl : getTilUrl;
          return (
            <PostBasic
              key={hit.objectID}
              {...hit}
              titleClassName={tw`text-xl lg:text-2xl`}
              url={getUrl(hit.slug)}
            />
          );
        }}
      />
    </div>
  );
};
