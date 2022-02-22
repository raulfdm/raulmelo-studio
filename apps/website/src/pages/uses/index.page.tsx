import { domains, SupportedLanguages } from '@raulmelo/core';
import { GetStaticProps } from 'next';

import { UsesPage, UsesPageProps } from './UsesPage';

const Uses = ({ uses, seo, title }: UsesPageProps) => {
  return <UsesPage seo={seo} title={title} uses={uses} />;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const uses = await domains.uses.getUses(locale as SupportedLanguages);

  return {
    props: {
      uses,
      seo: uses.seo,
      title: uses.title,
    },
    revalidate: 60,
  };
};

export default Uses;
