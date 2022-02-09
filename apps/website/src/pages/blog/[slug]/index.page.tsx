import { domains, utils } from '@raulmelo/core';
import { DotDivider } from '@raulmelo/ui';
import { GetStaticPaths } from 'next';
import React from 'react';

import { PortableTextPost } from '~/components/PortableTextPost';

import { SeriesSection } from './components/SeriesSection';
import { BlogPostProps, GetStaticProps } from './types';

export const BlogPostPage: React.FC<BlogPostProps> = ({ post, preview }) => {
  const { series, ...restPost } = post;

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
    <PortableTextPost
      {...restPost}
      preview={preview}
      // share={{
      //   description: `${post.title}. ${post.subtitle}`,
      // }}
      seriesSection={{
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

  // TODO: do the time reading here instead client side

  return {
    props: {
      post,
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
