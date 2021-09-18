import { AllSupportedLanguages, domains } from '@raulfdm/core';
import { ITilsTil } from '@raulfdm/core/dist/types/domains/posts/queryTils/types';
import { TilsHome } from '@screens/TilsHome';
import { GetStaticProps } from 'next';

const TilsPage = (props: { tils: ITilsTil[] }) => <TilsHome {...props} />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { tils } = await domains.posts.queryTils(
    locale as AllSupportedLanguages,
  );

  return {
    props: {
      tils,
    },
  };
};

export default TilsPage;
