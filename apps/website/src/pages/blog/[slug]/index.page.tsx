import { domains, utils } from '@raulmelo/core';
import { DotDivider } from '@raulmelo/ui';
import { GetStaticPaths } from 'next';
import React from 'react';

import { MdxPostTemplate } from '~/components/MdxPost';
import { serializeMdx } from '~/config/mdx';

import { SeriesSection } from './components/SeriesSection';
import { BlogPostProps, GetStaticProps } from './types';

export const BlogPostPage: React.FC<BlogPostProps> = ({
  content,
  post,
  preview,
}) => {
  const { featuredImage, tags, unsplash, series } = post;

  const allSeries = series ? (
    <SeriesSection series={series} currentPostId={post._id} />
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
        src: featuredImage.url,
        unsplash,
        width: featuredImage.width,
        height: featuredImage.height,
      }}
      title={post.title}
      subtitle={post.subtitle}
      publishedAt={post.publishedAt}
      // share={{
      //   description: `${post.title}. ${post.subtitle}`,
      // }}
      tags={tags}
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

  if (utils.isNil(post) || utils.isEmpty(post)) {
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
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await domains.posts.queryPosts('all');

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
    locale: post.language,
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default BlogPostPage;
