import { hydrate, renderToString } from '@config/mdx';
import { UsesPageStaticPropsResponse } from '@screens/Uses/types';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { Backend } from '@services/Backend';
import { MdxRemoteSource } from '@types-app';
import { head } from '@utils/utilities';
import { GetStaticProps } from 'next';

type Props = UsesPageProps & { usesMd: MdxRemoteSource };

const Uses = ({ usesMd, seo }: Props) => {
  const content = hydrate(usesMd);

  return <UsesPage seo={seo}>{content}</UsesPage>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { uses } = await Backend.graphql<UsesPageStaticPropsResponse>(`
    query {
      uses(where: { language: "${locale}" }) {
        language
        content
        seo {
          title
          description
        }
      }
    }  
  `);

  const usesData = head(uses);

  const mdxSource = await renderToString(usesData.content);

  return {
    props: {
      usesMd: mdxSource,
      seo: usesData.seo,
    },
    revalidate: 1,
  };
};

export default Uses;
