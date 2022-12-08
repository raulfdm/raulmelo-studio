import { getLocales } from '$infrastructure/i18n/getLocales.server';
import { getSEOTags } from '$infrastructure/utils/seo';
import { PortableTextPost } from '$ui/PortableTextPost';
import { domains, utils } from '@raulmelo/core';
import type { ITilsTil } from '@raulmelo/core/dist/types/domains/posts/queryTils/types';
import type { ISiteData } from '@raulmelo/core/dist/types/domains/siteData';
import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { StructuredDataFunction } from 'remix-utils';
import type { BlogPosting } from 'schema-dts';
import invariant from 'tiny-invariant';

type LoaderData = {
  til: ITilsTil;
  estimatedReadingTime: number;
  siteData: ISiteData;
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
  invariant(params.locale, `locale is required`);

  const [til, siteData] = await Promise.all([
    domains.posts.queryTilBySlug(params.slug, false),
    domains.siteData.querySiteData(),
  ]);

  if (utils.isNil(til) || utils.isEmpty(til)) {
    throw new Response(`Not Found`, {
      status: 404,
    });
  }

  const messages = await getLocales(params.locale);

  return json<LoaderData>({
    til,
    estimatedReadingTime: utils.content.getEstimatedReadingTime(til.content),
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
