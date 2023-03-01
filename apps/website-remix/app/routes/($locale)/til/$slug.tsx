import { getLocales } from '$infrastructure/i18n/getLocales.server';
import { getParamLocaleOrDefault } from '$infrastructure/utils/i18n';
import { getSEOTags } from '$infrastructure/utils/seo';
import { PortableTextPost } from '$ui/PortableTextPost';
import { getEstimatedReadingTime, isEmpty, isNil } from '@raulmelo/core/utils';
import type {
  QueryTilsReturnType,
  QuerySiteDataReturnType,
} from '@raulmelo/core/domains';
import { queryTilBySlug, querySiteData } from '@raulmelo/core/domains';

import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { StructuredDataFunction } from 'remix-utils';
import type { BlogPosting } from 'schema-dts';
import invariant from 'tiny-invariant';

type LoaderData = {
  til: QueryTilsReturnType[number];
  estimatedReadingTime: number;
  siteData: QuerySiteDataReturnType;
  url: string;
  messages: Record<string, string>;
};

const structuredData: StructuredDataFunction<
  SerializeFrom<LoaderData>,
  BlogPosting
> = ({ data }) => {
  const { til, url, siteData, messages } = data;

  return {
    '@context': `https://schema.org`,
    '@type': `BlogPosting`,
    datePublished: til.publishedAt,
    description: `${messages[`tilHome.title`]} ${til.title}`,
    /**
     * TODO: add "updatedAt" to the TIL api \/
     */
    dateModified: til.publishedAt,
    headline: til.title,
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': url,
    },
    author: {
      '@type': `Person`,
      name: `Raul Melo`,
    },
    image: [siteData.site.seoImage.url],
  };
};

export const meta: MetaFunction<LoaderData> = ({ data }) => {
  const { til, url, siteData, messages } = data as LoaderData;

  const publishedAt = new Date(til.publishedAt).toISOString();

  const seoTags = getSEOTags({
    title: til.title,
    type: `article`,
    description: `${messages[`tilHome.title`]} ${til.title}`,
    url,
    article: {
      publishedTime: publishedAt,
      /**
       * TODO: add "updatedAt" to the TIL api \/
       */
      modifiedTime: publishedAt,
      tags: til.tags?.map((tag) => tag.name),
    },
    image: {
      url: siteData.site.seoImage.url,
      width: siteData.site.seoImage.width,
      height: siteData.site.seoImage.height,
      alt: `Hero Image`,
    },
  });

  return seoTags;
};

export async function loader({ params, request }: LoaderArgs) {
  invariant(params.slug, `slug is required`);
  const locale = getParamLocaleOrDefault(params);

  const [til, siteData] = await Promise.all([
    queryTilBySlug(params.slug),
    querySiteData(),
  ]);

  if (isNil(til) || isEmpty(til)) {
    throw new Response(`Not Found`, {
      status: 404,
    });
  }

  const messages = await getLocales(locale);

  return json<LoaderData>({
    til,
    estimatedReadingTime: getEstimatedReadingTime(til.content),
    siteData,
    url: request.url,
    messages,
  });
}

export default function TilPostRoute() {
  const { til, estimatedReadingTime } = useLoaderData() as LoaderData;

  return (
    <PortableTextPost {...til} estimatedReadingTime={estimatedReadingTime} />
  );
}

export const handle = { structuredData };
