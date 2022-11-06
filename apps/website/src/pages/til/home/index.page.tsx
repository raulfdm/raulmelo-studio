import type { AllSupportedLanguages} from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { ITilsTil } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import type { GetStaticProps } from 'next';

import { TilsHome } from './TilsHome';

const TilsPage = (props: { tils: ITilsTil[] }) => <TilsHome {...props} />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tils = await domains.posts.queryTils(locale as AllSupportedLanguages);

  return {
    props: {
      tils,
    },
  };
};

export default TilsPage;
