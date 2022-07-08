import { domains, utils } from '@raulmelo/core';
import { DotDivider } from '@raulmelo/ui';
import { GetStaticPaths } from 'next';

import { PortableTextPost } from '~/components/PortableTextPost';

import { SeriesSection } from './components/SeriesSection';
import { BlogPostProps, GetStaticProps } from './types';

export const BlogPostPage = ({
  post,
  preview,
  estimatedReadingTime,
}: BlogPostProps) => {
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
      estimatedReadingTime={estimatedReadingTime}
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

  const estimatedReadingTime = utils.content.getEstimatedReadingTime(
    post.content,
  );

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
