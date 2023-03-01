import { useLocalization } from '$infrastructure/contexts/Localization';
import { getParamLocaleOrDefault } from '$infrastructure/utils/i18n';
import { getSEOTags } from '$infrastructure/utils/seo';
import { PortableTextPost } from '$ui/PortableTextPost';
import type {
  GetUsesReturnType,
  QuerySiteDataReturnType,
} from '@raulmelo/core/domains';
import { getUses, querySiteData } from '@raulmelo/core/domains';
import { getEstimatedReadingTime } from '@raulmelo/core/utils';
import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { StructuredDataFunction } from 'remix-utils';
import type { BlogPosting } from 'schema-dts';

type LoaderData = {
  uses: GetUsesReturnType;
  estimatedReadingTime: number;
  siteData: QuerySiteDataReturnType;
  url: string;
};

const structuredData: StructuredDataFunction<
  SerializeFrom<LoaderData>,
  BlogPosting
> = ({ data }) => {
  const { uses, siteData, url } = data;

  return {
    '@context': `https://schema.org`,
    '@type': `BlogPosting`,
    datePublished: uses._createdAt,
    dateModified: uses._updatedAt,
    description: uses.seo.description,
    headline: uses.seo.title,
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': url,
    },
    author: {
      '@type': `Person`,
      name: `Raul Melo`,
    },
    image: [`${siteData.site.seoImage.url}?w=1024&h=512`],
  };
};

export const handle = { structuredData };

export const meta: MetaFunction = ({ data }) => {
  const { uses, url, siteData } = data as LoaderData;

  return getSEOTags({
    url,
    title: `Raul Melo - ${uses.seo.title}`,
    description: uses.seo.description,
    type: `article`,
    article: {
      modifiedTime: uses._updatedAt,
      publishedTime: uses._createdAt,
      tags: [`Uses`],
    },
    image: {
      url: siteData.site.seoImage.url,
      width: 1024,
      height: 512,
      alt: siteData.personalInformation.fullName,
    },
  });
};

export async function loader({ params, request }: LoaderArgs) {
  const locale = getParamLocaleOrDefault(params);

  const [uses, siteData] = await Promise.all([
    getUses(locale),
    querySiteData(),
  ]);

  const estimatedReadingTime = getEstimatedReadingTime(uses.content);

  return json<LoaderData>({
    uses,
    estimatedReadingTime,
    siteData,
    url: request.url,
  });
}

export default function Uses() {
  const { estimatedReadingTime, uses } = useLoaderData() as LoaderData;
  const { locale } = useLocalization();

  const { title } = uses;

  return (
    <PortableTextPost
      content={uses.content}
      description={uses.seo.description}
      title={title}
      estimatedReadingTime={estimatedReadingTime}
      publishedAt={uses._updatedAt}
      language={locale}
    />
  );
}
