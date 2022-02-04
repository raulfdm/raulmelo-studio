import { PortableText } from '@portabletext/react';
import { domains, utils } from '@raulmelo/core';
import { BigQuote, DotDivider, ProseContainer } from '@raulmelo/ui';
import fs from 'fs';
import { GetStaticPaths } from 'next';
import dynamic from 'next/dynamic';
import path from 'path';
import React from 'react';

import { PrismStyles } from '~/components/MdxPost/components/PrismStyles';
import { PortableTextPost } from '~/components/PortableTextPost/PortableTextPost';
// import { MdxPostTemplate } from '~/components/MdxPost';
import { serializeMdx } from '~/config/mdx';

import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import { BlogPostProps, GetStaticProps } from './types';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

export const BlogPostPage: React.FC<BlogPostProps> = ({
  content,
  post,
  preview,
  sanityParsedContent,
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
    <PortableTextPost
      content={JSON.parse(sanityParsedContent).body}
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

    // <MdxPostTemplate
    // content={content}
    // postContent={post.content}
    // preview={preview}
    // featuredImage={{
    //   src: featured_image.url,
    //   unsplash,
    //   width: featured_image.width,
    //   height: featured_image.height,
    // }}
    // title={post.title}
    // subtitle={post.subtitle}
    // publishedAt={post.date}
    // // share={{
    // //   description: `${post.title}. ${post.subtitle}`,
    // // }}
    // tags={post_tags}
    // description={post.description}
    // series={{
    //   top: allSeries,
    //   bottom: seriesWithDivider,
    // }}
    // />
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
  const sanityParsedContent = fs.readFileSync(
    path.resolve(process.cwd(), 'src/pages/blog/[slug]/raw.json'),
    'utf-8',
  );
  const content = await serializeMdx(post.content);

  console.log(JSON.parse(sanityParsedContent));

  return {
    props: {
      post,
      content,
      preview: Boolean(preview),
      sanityParsedContent,
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
