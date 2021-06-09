import { serializeMdx } from '@config/mdx';
import { UsesPageStaticPropsResponse } from '@screens/Uses/types';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { Backend } from '@services/Backend';
import { GetStaticProps } from 'next';

const Uses = ({ content, seo, title, postContent }: UsesPageProps) => {
  return (
    <UsesPage
      seo={seo}
      title={title}
      content={content}
      postContent={postContent}
    />
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

  const content = await serializeMdx(uses.content);

  return {
    props: {
      content,
      postContent: uses.content,
      seo: uses.seo,
      title: uses.title,
    },
    revalidate: 1,
  };
};

export default Uses;
