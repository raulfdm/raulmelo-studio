import { MdxPostTemplate } from '@components/templates/MdxPost';
import { DotDivider } from '@components/MdxComponents/DotDivider';
import dynamic from 'next/dynamic';
import React from 'react';
import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import { BlogPostProps } from './types';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

export const BlogPost: React.FC<BlogPostProps> = ({
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
