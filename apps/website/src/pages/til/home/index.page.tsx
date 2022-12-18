import type { SupportedLanguagesWithAll } from '@raulmelo/core';
import { domains } from '@raulmelo/core';
import type { Til } from '@raulmelo/core/dist/types/domains/posts/queryTils';
import type { GetStaticProps } from 'next';

import { TilsHome } from './TilsHome';

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
