import { getSEOTags } from '$infrastructure/utils/seo';
import { PortableTextPost } from '$ui/PortableTextPost';
import { SeriesSection } from '$ui/screens/blog/SeriesSection';
import { domains, utils } from '@raulmelo/core';
import type { QueryPostBySlugReturnType } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug';
import type { QuerySiteDataReturnType } from '@raulmelo/core/dist/types/domains/siteData/querySiteData';
import { DotDivider } from '@raulmelo/ui';
import type { LoaderArgs, MetaFunction, SerializeFrom } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { StructuredDataFunction } from 'remix-utils';
import type { BlogPosting } from 'schema-dts';
import invariant from 'tiny-invariant';

type LoaderData = {
  post: QueryPostBySlugReturnType;
  estimatedReadingTime: number;
  siteData: QuerySiteDataReturnType;
  url: string;
};

const structuredData: StructuredDataFunction<
  SerializeFrom<LoaderData>,
  BlogPosting
> = ({ data }) => {
  const { post, siteData, url } = data;

  let imageUrl = siteData.site.seoImage.url;

  if (post.unsplash) {
    imageUrl = post.unsplash.url;
  } else if (post.featuredImage) {
    imageUrl = post.featuredImage.url;
  }

  return {
    '@context': `https://schema.org`,
    '@type': `BlogPosting`,
    datePublished: post.publishedAt,
    /**
     * TODO: add "updatedAt" to the Blog post api \/
     */
    dateModified: post.publishedAt,
    description: post.description,
    headline: post.title,
    mainEntityOfPage: {
      '@type': `WebPage`,
      '@id': url,
    },
    author: {
      '@type': `Person`,
      name: `Raul Melo`,
    },
    image: [imageUrl],
  };
};

export const handle = { structuredData };

export const meta: MetaFunction = ({ data }) => {
  const { post, url, siteData } = data as LoaderData;

  let image = {
    url: siteData.site.seoImage.url,
    alt: `Hero Image for ${post.title}`,
    height: siteData.site.seoImage.height,
    width: siteData.site.seoImage.width,
  };

  if (post.unsplash) {
    image = {
      url: `${post.unsplash.url}?w=1200&h=630&fit=crop`,
      alt: `Hero Image for ${post.title}`,
      height: 630,
      width: 1200,
    };
  } else if (post.featuredImage) {
    image = {
      url: post.featuredImage.url,
      alt: `Hero Image for ${post.title}`,
      height: post.featuredImage.height,
      width: post.featuredImage.width,
    };
  }

  return getSEOTags({
    title: post.title,
    description: post.description,
    type: `article`,
    url,
    article: {
      modifiedTime: post.publishedAt,
      publishedTime: post.publishedAt,
      tags: post.tags?.map((tag) => tag.name),
    },
    image,
  });
};

export async function loader({ params, request }: LoaderArgs) {
  invariant(params.slug, `Slug is required`);

  const [post, siteData] = await Promise.all([
    domains.posts.queryPostBySlug(params.slug),
    domains.siteData.querySiteData(),
  ]);

  if (utils.isNil(post) || utils.isEmpty(post)) {
    throw new Response(`Not Found`, { status: 404 });
  }

  const estimatedReadingTime = utils.content.getEstimatedReadingTime(
    post.content,
  );

  return json<LoaderData>({
    post,
    estimatedReadingTime,
    siteData,
    url: request.url,
  });
}

export default function BlogPostRoute() {
  const { estimatedReadingTime, post } = useLoaderData() as LoaderData;

  const { series, ...restPost } = post;

  const allSeries = series ? (
    <SeriesSection key={post._id} series={series} currentPostId={post._id} />
  ) : null;

  const seriesWithDivider = series ? (
    <>
      <DotDivider />
      {allSeries}
    </>
  ) : null;

  return (
    <PortableTextPost
      {...restPost}
      estimatedReadingTime={estimatedReadingTime}
      seriesSection={{
        top: allSeries,
        bottom: seriesWithDivider,
      }}
    />
  );
}
