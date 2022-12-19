import type { SupportedLanguagesWithAll } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { QueryTilsReturnType } from '@raulmelo/core/dist/types/domains/posts/queryTils';
import type { GetStaticProps } from 'next';

import { TilsHome } from './TilsHome';

type Til = QueryTilsReturnType[number];

const TilsPage = (props: { tils: Til[] }) => <TilsHome {...props} />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tils = await domains.posts.queryTils(
    locale as SupportedLanguagesWithAll,
  );

  return {
    props: {
      tils,
    },
  };
};

export default TilsPage;
