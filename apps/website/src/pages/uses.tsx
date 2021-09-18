import { serializeMdx } from '@config/mdx';
import { UsesPage, UsesPageProps } from '@screens/Uses/UsesPage';
import { GetStaticProps } from 'next';
import { domains, SupportedLanguages } from '@raulfdm/core';

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
  const { uses } = await domains.uses.getUses(locale as SupportedLanguages);

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
