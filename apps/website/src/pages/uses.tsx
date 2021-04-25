import { hydrate, renderToString } from '@config/mdx';
import { UsesPageStaticPropsResponse } from '@screens/Uses/types';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { Backend } from '@services/Backend';
import { MdxRemoteSource } from '@types-app';
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
  const { use: uses } = await Backend.graphql<UsesPageStaticPropsResponse>(`
  query UsesPage {
    use(locale: "${locale}") {
      locale
      title
      seo {
        title
        description
      }
      content
    }
  }
  `);

  const mdxSource = await renderToString(uses.content);

  return {
    props: {
      usesMd: mdxSource,
      seo: uses.seo,
      title: uses.title,
    },
    revalidate: 1,
  };
};

export default Uses;
