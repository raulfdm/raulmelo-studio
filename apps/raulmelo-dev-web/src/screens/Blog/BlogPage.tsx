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
import { DotDivider } from '@components/MdxComponents/DotDivider';
import { SeriesSection } from './components/SeriesSection';
import { RelevantPostSerieData } from './utils/series';
import { RelevantTranslationData } from './utils/translations';
import { AvailableTranslations } from './components/AvailableTranslations';
import { getPostUrl } from '@utils/url';
import { useLocalization } from '@hooks/useLocalization';

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
  const { locale } = useLocalization();

  const allSeries = series ? (
    <SeriesSection series={series} currentPostId={post.id} />
  ) : null;

  const seriesWithDivider = series ? (
    <>
      <DotDivider />
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
        url={getPostUrl(post.slug, locale)}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
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
