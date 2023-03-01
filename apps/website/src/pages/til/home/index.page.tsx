import type { SupportedLanguagesWithAll } from '@raulmelo/core/config';
import type { QueryTilsReturnType } from '@raulmelo/core/domains';
import { queryTils } from '@raulmelo/core/domains';
import type { GetStaticProps } from 'next';

import { TilsHome } from './TilsHome';

type Til = QueryTilsReturnType[number];

const TilsPage = (props: { tils: Til[] }) => <TilsHome {...props} />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const tils = await queryTils(locale as SupportedLanguagesWithAll);

  return {
    props: {
      tils,
    },
  };
};

export default TilsPage;
