import { ShareContent } from '@components/ShareContent';
import { useLocalization } from '@hooks/useLocalization';
import {
  DotDivider,
  ProseContainer,
  Tag,
  Tags,
} from '@raulfdm/blog-components';
import { getTagUrl } from '@utils/url';
import classNames from 'classnames';
import { BlogJsonLd, NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import siteData from 'site-data';
import { FeaturedImage } from './components/FeaturedImage';
import { Header } from './components/Header';
import { PrismStyles } from './components/PrismStyles';
import type { SeriesSection as SeriesSectionType } from './components/SeriesSection';
import { BlogPageProps } from './types';

const SeriesSection = dynamic(() =>
  import('./components/SeriesSection').then((mod) => mod.SeriesSection),
) as typeof SeriesSectionType;

export const BlogPage: React.FC<BlogPageProps> = ({ children, post }) => {
  const { formatDate } = useLocalization();
  const { asPath } = useRouter();

  const {
    featured_image,
    post_tags,
    unsplash,
    series /* translation */,
  } = post;

  const seoInfo = useMemo(() => {
    const date = new Date(post.date).toISOString();
    return {
      title: post.title,
      description: post.description,
      url: `${siteData.site.url}${asPath}`,
      published: date,
      modified: date,
      imageUrl: featured_image.url ?? siteData.site.seo_image.url,
    };
  }, [
    post.title,
    post.description,
    featured_image.url,
    post.date,
    asPath,
    siteData.site.url,
  ]);

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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <BlogJsonLd
        url={seoInfo.url}
        title={seoInfo.title}
        description={seoInfo.description}
        images={[seoInfo.imageUrl]}
        datePublished={seoInfo.published}
        dateModified={seoInfo.modified}
        authorName={[siteData.personalInformation.full_name]}
      />

      <NextSeo
        title={seoInfo.title}
        description={seoInfo.description}
        openGraph={{
          title: seoInfo.title,
          description: seoInfo.description,
          type: 'article',
          url: seoInfo.url,
          article: {
            publishedTime: seoInfo.published,
            modifiedTime: seoInfo.modified,
            tags: post.post_tags.map((tag) => tag.name),
          },
          images: [
            {
              url: seoInfo.imageUrl,
              width: featured_image.width,
              height: featured_image.height,
              alt: 'Hero Image',
            },
          ],
        }}
      />

      <PrismStyles />

      {featured_image ? (
        <FeaturedImage src={featured_image.url} unsplash={unsplash} />
      ) : null}

      <section
        className={classNames([
          'w-full',
          'col-span-full lg:col-start-2 lg:col-end-12',
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
          <ShareContent
            twitter={{ text: `${post.title}. ${post.subtitle}` }}
            linkedIn={{ title: post.title, summary: post.description }}
          />
        </footer>
      </section>
    </>
  );
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
