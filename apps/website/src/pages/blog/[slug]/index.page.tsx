import { queryPostBySlug, queryPosts } from '@raulmelo/core/domains';
import { getEstimatedReadingTime, isEmpty, isNil } from '@raulmelo/core/utils';
import { DotDivider } from '@raulmelo/ui';
import type { GetStaticPaths } from 'next';
import { Suspense } from 'react';

import { PortableTextPost } from '~/components/PortableTextPost';

import { SeriesSection } from './components/SeriesSection';
import type { BlogPostProps, GetStaticProps } from './types';

export const BlogPostPage = ({ post, estimatedReadingTime }: BlogPostProps) => {
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
    <Suspense>
      <PortableTextPost
        {...(restPost as any)}
        estimatedReadingTime={estimatedReadingTime}
        seriesSection={{
          top: allSeries,
          bottom: seriesWithDivider,
        }}
      />
    </Suspense>
  );
};

export const getStaticProps = async ({ params, preview }: GetStaticProps) => {
  const post = await queryPostBySlug(params.slug);

  if (isNil(post) || isEmpty(post)) {
    return {
      notFound: true,
    };
  }

  const estimatedReadingTime = getEstimatedReadingTime(post.content);

  return {
    props: {
      post,
      estimatedReadingTime,
      preview: Boolean(preview),
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await queryPosts('all');

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
