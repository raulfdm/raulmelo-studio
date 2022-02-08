import { domains, SupportedLanguages } from '@raulmelo/core';
import { GetStaticProps } from 'next';

import { serializeMdx } from '~/config/mdx';

import { UsesPage, UsesPageProps } from './UsesPage';

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
  const uses = await domains.uses.getUses(locale as SupportedLanguages);

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
