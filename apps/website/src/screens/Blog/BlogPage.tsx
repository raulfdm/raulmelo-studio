import type { MenuBar as MenuBarType } from '@components/MenuBar';
import { SEO } from '@components/SEO';
import { sharedClasses } from '@components/uiClasses';
import { useLocalization } from '@hooks/useLocalization';
import {
  DotDivider,
  LinkedInIcon,
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
  const { locale, formatDate } = useLocalization();
  const { featured_image, post_tags, unsplash, series, translation } = post;

  const allSeries = series ? (
    <SeriesSection series={series} currentPostId={post.id} />
  ) : null;

  const seriesWithDivider = series ? (
    <>
      <DotDivider />
      {allSeries}
    </>
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
      <main className={classNames(sharedClasses.sectionContainer)}>
        {featured_image ? (
          <FeaturedImage src={featured_image.url} unsplash={unsplash} />
        ) : null}

        <section className={classNames(['md:flex', 'justify-between'])}>
          <aside
            className={classNames([
              'hidden md:block',
              'mr-8',
              'w-full w-[15%]',
            ])}
          >
            <span
              className={classNames([
                'font-extrabold',
                'text-xl',
                'block',
                'mb-6',
              ])}
            >
              Share
            </span>
            <ul className={classNames(['flex', 'space-x-4'])}>
              <li>
                <LinkedInIcon className={classNames(['w-8'])} />
              </li>
              <li>
                <TwitterIcon className={classNames(['w-8'])} />
              </li>
            </ul>
          </aside>
          <article className={classNames(['w-full md:w-[85%] lg:w-[80%]'])}>
            <Header
              title={post.title}
              subtitle={post.subtitle}
              publishedDate={formatDate(new Date(post.date), {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
            />
          </article>
        </section>
      </main>
      {/*  */}
      {/* <PrismStyles />
      {translations}
      {allSeries}
      
      <ProseContainer>{children}</ProseContainer>
      <footer className="container mx-auto px-4 md:px-0 max-w-screen-md">
        {seriesWithDivider}
        <hr className="mt-10 mb-6" />
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
      </footer> */}
    </>
  );
};
