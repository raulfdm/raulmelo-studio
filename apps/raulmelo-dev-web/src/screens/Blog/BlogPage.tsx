import React from 'react';

import { SEO } from '@components/SEO';
import { PostApiData } from '@types-api';
import { Header } from './components/Header';
import { FeaturedImage } from './components/FeaturedImage';
import { AppThemeProvider } from '@contexts/AppTheme';
import { blogGlobalStyles } from '@screens/Blog/styles/globals';
import { GlobalStyles } from '@styles/index';
import { MenuBar } from '@components/MenuBar';
import { Container, Tag, Tags, LineDivider } from '@components/Ui';
import { Divider } from '@components/MdxComponents/Divider';
import { SeriesSection } from './components/SeriesSection';
import { RelevantPostSerieData } from './utils/series';
import { RelevantTranslationData } from './utils/translations';
import { AvailableTranslations } from './components/AvailableTranslations';

export type BlogPageProps = {
  content: RenderToStringReturnType;
  post: PostApiData;
  series?: RelevantPostSerieData;
  translation?: RelevantTranslationData;
};

export const BlogPage: React.FC<BlogPageProps> = ({
  content,
  post,
  series,
  translation,
}) => {
  const { featured_image, post_tags } = post;

  const allSeries = series ? (
    <SeriesSection series={series} currentPostId={post.id} />
  ) : null;

  const seriesWithDivider = series ? (
    <>
      <Divider />
      {allSeries}
    </>
  ) : null;

  const tags = post_tags && (
    <Tags>
      {post_tags.map((tag) => {
        const { id, name, slug } = tag!;
        return <Tag key={id} tag={name!} slug={slug!} />;
      })}
    </Tags>
  );

  const featuredImage = featured_image ? (
    <FeaturedImage
      src={featured_image.url}
      width={featured_image.width}
      height={featured_image.height}
    />
  ) : null;

  const translations = translation ? (
    <AvailableTranslations {...translation} />
  ) : null;

  return (
    <>
      <SEO
        imageUrl={featured_image.url}
        title={post.title}
        description={post.description}
        /* TODO: fix that 
        It needs to be add the FULL url
        */
        url={`/blog/${post.slug}`}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
      </SEO>
      <AppThemeProvider>
        <GlobalStyles global={blogGlobalStyles} />
        <MenuBar />
        <Header title={post.title} subtitle={post.subtitle} />
        {translations}
        {allSeries}
        {featuredImage}
        <Container as="article">{content}</Container>
        <Container as="footer">
          {seriesWithDivider}
          <LineDivider />
          {tags}
        </Container>
      </AppThemeProvider>
    </>
  );
};
