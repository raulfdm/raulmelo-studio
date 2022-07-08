import { IUsesData } from '@raulmelo/core/dist/types/domains/uses';
import { IUsesApiResponse } from '@raulmelo/core/dist/types/domains/uses/getUses/types';

import { PortableTextPost } from '~/components/PortableTextPost';
import { useLocalization } from '~/hooks/useLocalization';
import siteData from '~/site-data';
import { getPostUrl } from '~/utils/url';

export type UsesPageProps = {
  seo: IUsesData['seo'];
  title: string;
  uses: IUsesApiResponse;
  estimatedReadingTime: number;
};

export const UsesPage = ({
  seo,
  title,
  uses,
  estimatedReadingTime,
}: UsesPageProps) => {
  const { locale } = useLocalization();

  return (
    <PortableTextPost
      content={uses.content}
      title={title}
      estimatedReadingTime={estimatedReadingTime}
      publishedAt={uses._updatedAt}
      description={seo.description}
      language={locale}
      nextSeo={{
        title: seo.title,
        description: seo.description,
        canonical: getPostUrl('uses', locale),
        openGraph: {
          type: 'article',
          title: seo.title,
          description: seo.description,
          site_name: siteData.personalInformation.fullName,
          images: [
            {
              url: siteData.site.seoImage.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.fullName,
            },
          ],
        },
      }}
    />
  );
};
