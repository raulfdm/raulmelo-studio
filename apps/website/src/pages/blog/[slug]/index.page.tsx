import { DotDivider } from '@components/MdxComponents/DotDivider';
import { MdxPostTemplate } from '@components/templates/MdxPost';
import { serializeMdx } from '@config/mdx';
import { domains, utils } from '@raulfdm/core';
import { GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import { BlogPostProps, GetStaticProps } from './types';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

export const BlogPostPage: React.FC<BlogPostProps> = ({
  content,
  post,
  preview,
}) => {
  const { featured_image, post_tags, unsplash, series } = post;

  const allSeries = series ? (
    <SeriesSection series={series} currentPostId={post.id} />
  ) : null;

  const seriesWithDivider = series ? (
    <>
      <DotDivider />
      {allSeries}
    </>
  ) : null;

  return (
    <MdxPostTemplate
      content={content}
      postContent={post.content}
      preview={preview}
      featuredImage={{
        src: featured_image.url,
        unsplash,
        width: featured_image.width,
        height: featured_image.height,
      }}
      title={post.title}
      subtitle={post.subtitle}
      publishedAt={post.date}
      // share={{
      //   description: `${post.title}. ${post.subtitle}`,
      // }}
      tags={post_tags}
      description={post.description}
      series={{
        top: allSeries,
        bottom: seriesWithDivider,
      }}
    />
  );
};

export const getStaticProps = async ({ params, preview }: GetStaticProps) => {
  const post = await domains.posts.queryPostBySlug(params.slug, preview);
  const { isNil, isEmpty } = utils;

  if (isNil(post) || isEmpty(post)) {
    return {
      notFound: true,
    };
  }

  const content = await serializeMdx(post.content);

  return {
    props: {
      post,
      content,
      preview: Boolean(preview),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await domains.posts.queryPosts('all');

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    locale: post.locale,
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default BlogPostPage;
