import type { MenuBar as MenuBarType } from '@components/MenuBar';
import { SEO } from '@components/SEO';
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
import { FeaturedImage } from './components/FeaturedImage';
import { Header } from './components/Header';
import { PrismStyles } from './components/PrismStyles';
import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import { BlogPageProps } from './types';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

const MenuBar = dynamic(() =>
  import('@components/MenuBar').then((mod) => mod.MenuBar),
) as typeof MenuBarType;

export const BlogPage: React.FC<BlogPageProps> = ({ children, post }) => {
  const { locale, formatDate } = useLocalization();
  const {
    featured_image,
    post_tags,
    unsplash,
    series /* translation */,
  } = post;

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
    <>
      <SEO
        imageUrl={featured_image?.url}
        title={post.title}
        description={post.description}
        url={getPostUrl(post.slug, locale)}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </SEO>
      <MenuBar />
      <PrismStyles />
      <main className="grid-container">
        {featured_image ? (
          <FeaturedImage src={featured_image.url} unsplash={unsplash} />
        ) : null}

        <Share
          as="aside"
          className={classNames([
            'hidden md:block',
            'col-span-1 lg:col-span-2',
          ])}
        />

        <section
          className={classNames([
            'w-full',
            'col-span-full md:col-start-2 lg:col-start-3',
          ])}
        >
          <Header
            title={post.title}
            subtitle={post.subtitle}
            publishedDate={formatDate(new Date(post.date), {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          />
          {allSeries}
          <ProseContainer className="mt-8">{children}</ProseContainer>
          {seriesWithDivider}
          <hr className="mt-10 mb-6" />
          <footer
            className={classNames(['flex', 'justify-between', 'flex-wrap'])}
          >
            <PostTags postTags={post_tags} className="mb-4 mr-4" />
            <Share />
          </footer>
        </section>
      </main>
    </>
  );
};

const Share = ({ as = 'div', className }: ShareProps) => {
  const Wrapper = as;
  return (
    <Wrapper className={className}>
      <span
        className={classNames([
          'font-extrabold',
          'text-md md:text-lg lg:text-xl',
          'block',
          'mb-4 md:mb-6',
        ])}
      >
        Share
      </span>
      <ul className={classNames(['flex', 'space-x-4'])}>
        <li>
          <LinkedInIcon className={classNames(['w-6 md:w-8'])} />
        </li>
        <li>
          <TwitterIcon className={classNames(['w-6 md:w-8'])} />
        </li>
      </ul>
    </Wrapper>
  );
};

type ShareProps = {
  as?: React.ElementType;
  className?: string;
};

const PostTags = ({ className, postTags }: PostTagsProps) => {
  return (
    <div className={classNames([className])}>
      <span
        className={classNames([
          'font-extrabold',
          'text-md md:text-lg lg:text-xl',
          'block',
          'mb-4 md:mb-6',
        ])}
      >
        Tags
      </span>
      <Tags>
        {postTags.map((tag) => {
          return (
            <Tag key={tag.id} className="text-base lg:text-lg">
              <Link href={getTagUrl(tag.slug)}>
                <a className="underline">#{tag.name}</a>
              </Link>
            </Tag>
          );
        })}
      </Tags>
    </div>
  );
};

type PostTagsProps = {
  className?: string;
  postTags: BlogPageProps['post']['post_tags'];
};
