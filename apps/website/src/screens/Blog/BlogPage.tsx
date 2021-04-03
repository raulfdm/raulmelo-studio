import type { MenuBar as MenuBarType } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { useLocalization } from '@hooks/useLocalization';
import {
  DotDivider,
  ProseContainer,
  Tag,
  Tags,
  TwitterIcon,
} from '@raulfdm/blog-components';
import { getPostUrl, getTagUrl } from '@utils/url';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import type { AvailableTranslations as AvailableTranslationsType } from './components/AvailableTranslations';
import { FeaturedImage } from './components/FeaturedImage';
import { Header } from './components/Header';
import { PrismStyles } from './components/PrismStyles';
import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import { BlogPageProps } from './types';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

const AvailableTranslations = dynamic(() =>
  import('./components/AvailableTranslations').then(
    (mod) => mod.AvailableTranslations,
  ),
) as typeof AvailableTranslationsType;

const MenuBar = dynamic(() =>
  import('@components/MenuBar').then((mod) => mod.MenuBar),
) as typeof MenuBarType;

export const BlogPage: React.FC<BlogPageProps> = ({ children, post }) => {
  const { featured_image, post_tags, unsplash, series, translation } = post;
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
      unsplash={unsplash}
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
      </SEO>
      <MenuBar />
      <div
        className={classNames([
          'max-w-screen-xl',
          'mt-6 lg:mt-8 xl:mt-12',
          'mx-auto',
          'px-4 lg:px-8',
        ])}
      >
        {featuredImage}
        <div className="flex justify-between">
          {/* <div className="hidden xls:block w-full max-w-[15%]">
            <Share />
          </div> */}

          <div
            className={classNames([
              'max-w-full xls:max-w-[80%]',
              /* TODO: Disable the following class when implements share */
              'mx-auto',
            ])}
          >
            <Header
              title={post.title}
              subtitle={post.subtitle}
              hasBottomMargin={!featuredImage}
            />
            <PrismStyles />
            {translations}
            {allSeries}
            <article
              className={classNames([
                'prose dark:prose-dark',
                'prose-lg lg:prose-xl',
                'max-w-none',
                'mt-11',
              ])}
            >
              {children}
            </article>
            {seriesWithDivider}
            <hr className="mt-10 mb-6" />
            <footer className="flex justify-between">
              <TagsSection post_tags={post_tags} />
              <Share />
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

const Share = () => {
  return (
    <div>
      <span className="font-bold font-sans text-2xl">Share</span>
      <div className="mt-6 flex space-x-2">
        <button className="w-8 h-8">
          <TwitterIcon width={32} />
        </button>
        <button>
          <TwitterIcon width={32} />
        </button>
        <button>
          <TwitterIcon width={32} />
        </button>
      </div>
    </div>
  );
};

const TagsSection = ({ post_tags }) => {
  return (
    <section>
      <span className="font-bold font-sans text-2xl">Tags</span>
      <Tags>
        {post_tags.map((tag) => {
          return (
            <Tag key={tag.id} className="text-base lg:text-lg">
              <Link href={getTagUrl(tag.slug)}>
                <a className="underline">#{tag.name}</a>
              </Link>
            </Tag>
          );
        })}
      </Tags>
    </section>
  );
};
