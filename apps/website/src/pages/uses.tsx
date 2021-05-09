import { serializeMdx } from '@config/mdx';
import { UsesPageStaticPropsResponse } from '@screens/Uses/types';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { Backend } from '@services/Backend';
import { GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

type Props = UsesPageProps & {
  content: MDXRemoteSerializeResult;
  title: string;
};

const Uses = ({ content, seo, title }: Props) => {
  return <UsesPage seo={seo} title={title} content={content} />;
};

// const Uses = ({ content, seo, title }: Props) => {
//   return <h1>hi</h1>;
// };

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

  console.log(content);

  return {
    props: {
      content,
      seo: uses.seo,
      title: uses.title,
    },
    revalidate: 1,
  };
};

export default Uses;
