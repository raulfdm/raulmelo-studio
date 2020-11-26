import { AvailableTranslations } from './components/AvailableTranslations';
import { DotDivider } from '@components/MdxComponents/DotDivider';
import { FeaturedImage } from './components/FeaturedImage';
import { getPostUrl } from '@utils/url';
import { Header } from './components/Header';
import { MenuBar } from '@components/MenuBar';
import { PostApiData } from '@types-api';
import { PrismStyles } from './components/PrismStyles';
import { RelevantPostSerieData } from './utils/series';
import { RelevantTranslationData } from './utils/translations';
import { SEO } from '@components/SEO';
import { SeriesSection } from './components/SeriesSection';
import { Tags } from '@components/Tags';
import { useLocalization } from '@hooks/useLocalization';
import { BlogUiContainer } from './components/BlogUiContainer';

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
      <MenuBar />
      <Header title={post.title} subtitle={post.subtitle} />
      <PrismStyles />
      {translations}
      {allSeries}
      {featuredImage}
      <BlogUiContainer>{content}</BlogUiContainer>
      <footer className="container mx-auto px-4 md:px-0 max-w-screen-md">
        {seriesWithDivider}
        <hr className="mt-10 mb-6" />
        {post_tags ? <Tags tags={post_tags} /> : null}
      </footer>
    </>
  );
};
