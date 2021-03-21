import dynamic from 'next/dynamic';
import { ProseContainer, DotDivider } from '@raulfdm/blog-components';

import { getPostUrl } from '@utils/url';
import { Header } from './components/Header';
import { PostApiData } from '@types-api';
import { PrismStyles } from './components/PrismStyles';
import { RelevantPostSerieData } from './utils/series';
import { RelevantTranslationData } from './utils/translations';
import { SEO } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';

import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import type { FeaturedImage as FeaturedImageType } from './components/FeaturedImage';
import type { AvailableTranslations as AvailableTranslationsType } from './components/AvailableTranslations';
import type { MenuBar as MenuBarType } from '@components/MenuBar';
import type { PostTags as TagsType } from '@components/PostTags';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

const FeaturedImage = dynamic(() =>
  import('./components/FeaturedImage').then((mod) => mod.FeaturedImage),
) as typeof FeaturedImageType;

const AvailableTranslations = dynamic(() =>
  import('./components/AvailableTranslations').then(
    (mod) => mod.AvailableTranslations,
  ),
) as typeof AvailableTranslationsType;

const MenuBar = dynamic(() =>
  import('@components/MenuBar').then((mod) => mod.MenuBar),
) as typeof MenuBarType;

const PostTags = dynamic(() =>
  import('@components/PostTags').then((mod) => mod.PostTags),
) as typeof TagsType;

export type BlogPageProps = {
  post: PostApiData;
  series?: RelevantPostSerieData;
  translation?: RelevantTranslationData;
};

export const BlogPage: React.FC<BlogPageProps> = ({
  children,
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
        imageUrl={featured_image?.url}
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
      <MenuBar />
      <Header
        title={post.title}
        subtitle={post.subtitle}
        hasBottomMargin={!featuredImage}
      />
      <PrismStyles />
      {translations}
      {allSeries}
      {featuredImage}
      <ProseContainer>{children}</ProseContainer>
      <footer className="container mx-auto px-4 md:px-0 max-w-screen-md">
        {seriesWithDivider}
        <hr className="mt-10 mb-6" />
        {post_tags ? (
          <PostTags tags={post_tags} tagClassName={'text-base lg:text-lg'} />
        ) : null}
      </footer>
    </>
  );
};
