import { hydrate, renderToString } from '@config/mdx';
import { UsesPageStaticPropsResponse } from '@screens/Uses/types';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { Backend } from '@services/Backend';
import { MdxRemoteSource } from '@types-app';
import { head } from '@utils/utilities';
import { GetStaticProps } from 'next';

type Props = UsesPageProps & { usesMd: MdxRemoteSource; title: string };

const Uses = ({ usesMd, seo, title }: Props) => {
  const content = hydrate(usesMd);

  return (
    <UsesPage seo={seo} title={title}>
      {content}
    </UsesPage>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { uses } = await Backend.graphql<UsesPageStaticPropsResponse>(`
  query UsesPage {
    use(locale: "${locale}") {
      language: locale
      title
      seo {
        title
        description
      }
      content
    }
  }
  `);

  const usesData = head(uses);

  const mdxSource = await renderToString(usesData.content);

  return {
    props: {
      usesMd: mdxSource,
      seo: usesData.seo,
      title: usesData.title,
    },
    revalidate: 1,
  };
};

export default Uses;
