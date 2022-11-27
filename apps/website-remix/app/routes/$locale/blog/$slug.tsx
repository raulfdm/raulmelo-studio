import { PortableTextPost } from '$ui/PortableTextPost';
import { SeriesSection } from '$ui/screens/blog/SeriesSection';
import { domains, utils } from '@raulmelo/core';
import type { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts';
import { DotDivider } from '@raulmelo/ui';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';
import invariant from 'tiny-invariant';

type LoaderData = {
  post: IBlogPostBySlugApiResponse;
  estimatedReadingTime: number;
};

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  invariant(slug, 'Slug is required');

  const post = await domains.posts.queryPostBySlug(slug);

  if (utils.isNil(post) || utils.isEmpty(post)) {
    throw new Response('Not Found', { status: 404 });
  }

  const estimatedReadingTime = utils.content.getEstimatedReadingTime(
    post.content,
  );

  return json<LoaderData>({
    post,
    estimatedReadingTime,
  });
}

export default function BlogPostRoute() {
  const { estimatedReadingTime, post } = useLoaderData<LoaderData>();

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
    <Suspense fallback={<>Loading...</>}>
      <PortableTextPost
        {...restPost}
        // preview={preview}
        // share={{
        //   description: `${post.title}. ${post.subtitle}`,
        // }}
        estimatedReadingTime={estimatedReadingTime}
        seriesSection={{
          top: allSeries,
          bottom: seriesWithDivider,
        }}
      />
    </Suspense>
  );
}
