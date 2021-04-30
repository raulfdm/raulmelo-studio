import { Tils, TilsHome, TilsHomeGraphQLResponse } from '@screens/TilsHome';
import { Backend } from '@services/Backend';
import { GetStaticProps } from 'next';

const TilsPage = (props: { tils: Tils }) => <TilsHome {...props} />;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { tils } = await Backend.graphql<TilsHomeGraphQLResponse>(`
  query Tils {
    tils(locale: "${locale}", sort: "publishedAt:DESC") {
      id
      publishedAt
      title
      locale
      slug
      tags {
        id
        name
        slug
      }
    }
  }  
  `);

  return {
    props: {
      tils,
    },
  };
};

export default TilsPage;
