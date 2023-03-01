import type { SupportedLanguages } from '@raulmelo/core/config';
import { getUses } from '@raulmelo/core/domains';
import { getEstimatedReadingTime } from '@raulmelo/core/utils';
import type { GetStaticProps } from 'next';

import type { UsesPageProps } from './UsesPage';
import { UsesPage } from './UsesPage';

const Uses = ({ uses, seo, title, estimatedReadingTime }: UsesPageProps) => {
  return (
    <UsesPage
      seo={seo}
      title={title}
      uses={uses}
      estimatedReadingTime={estimatedReadingTime}
    />
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const uses = await getUses(locale as SupportedLanguages);

  const estimatedReadingTime = getEstimatedReadingTime(uses.content);
  return {
    props: {
      uses,
      seo: uses.seo,
      title: uses.title,
      estimatedReadingTime,
    },
    revalidate: 60,
  };
};

export default Uses;
