import 'twin.macro';

import { PortableText } from '@portabletext/react';
import { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts';
import { ProseContainer } from '@raulmelo/ui';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlogJsonLd, NextSeo, NextSeoProps } from 'next-seo';
import React, { useMemo } from 'react';

import { ShareContent } from '~/components/ShareContent';
import { Tag, Tags } from '~/components/Tags';
import { useLocalization } from '~/hooks/useLocalization';
import siteData from '~/site-data';
import { getTagUrl } from '~/utils/url';

import { FeaturedImage } from './components/FeaturedImage';
import { Header } from './components/Header';
import { portableComponents } from './components/portableComponents';
import { PreviewBanner } from './components/PreviewBanner/PreviewBanner';
import { PrismStyles } from './components/PrismStyles';

export const PortableTextPost: React.FC<PortableTextPostProps> = ({
  content,
  featuredImage,
  title,
  subtitle,
  description,
  publishedAt,
  tags,
  seriesSection,
  nextSeo,
  preview,
  unsplash,
}) => {
  const { formatDate } = useLocalization();
  const { asPath } = useRouter();

  const seoInfo = useMemo(() => {
    const date = new Date(publishedAt).toISOString();

    return {
      title: title,
      /**
       * This enforce parsing double quotes correctly.
       * - no parsing: "the description will be "like this""
       * - parsing: "the description will be \"like this\""
       */
      description: `${description}`,
      url: `${siteData.site.url}${asPath}`,
      published: date,
      modified: date,
      image: {
        url: featuredImage?.url ?? siteData.site.seoImage.url,
        width: featuredImage?.width ?? siteData.site.seoImage.width,
        height: featuredImage?.height ?? siteData.site.seoImage.height,
      },
    };
  }, [
    title,
    description,
    featuredImage,
    publishedAt,
    asPath,
    siteData.site.url,
  ]);

  return (
    <>
      <BlogJsonLd
        url={seoInfo.url}
        title={seoInfo.title}
        description={seoInfo.description}
        images={[seoInfo.image.url]}
        datePublished={seoInfo.published}
        dateModified={seoInfo.modified}
        authorName={[siteData.personalInformation.fullName]}
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
            tags: tags?.map((tag) => tag.name),
          },
          images: [
            {
              url: seoInfo.image.url,
              width: seoInfo.image.width,
              height: seoInfo.image.height,
              alt: 'Hero Image',
            },
          ],
        }}
        {...nextSeo}
      />
      <PrismStyles />
      {preview ? <PreviewBanner /> : null}
      {featuredImage ? (
        <FeaturedImage url={featuredImage.url} unsplash={unsplash} />
      ) : null}
      <section tw="w-full col-span-full lg:col-start-2 lg:col-end-12">
        <Header
          title={title}
          subtitle={subtitle}
          publishedDate={formatDate(new Date(publishedAt), {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
          // readingTime={
          //   postContent ? getEstimatedReadingTime(postContent) : undefined
          // }
        />
        {seriesSection?.top}
        <ProseContainer tw="mt-8">
          <PortableText
            value={content}
            components={portableComponents as never}
          />
        </ProseContainer>
        {seriesSection?.bottom}
        <hr tw="mt-10 mb-6" />
        <footer tw="flex justify-between flex-wrap">
          {tags ? (
            <div tw="mb-4 mr-4">
              <span tw="font-extrabold text-md md:text-lg lg:text-xl block mb-4 md:mb-6">
                Tags
              </span>
              <Tags>
                {tags.map((tag) => (
                  <Tag key={tag._id} tw="text-base lg:text-lg">
                    <Link href={getTagUrl(tag.slug)} passHref>
                      <a tw="underline text-secondary">#{tag.name}</a>
                    </Link>
                  </Tag>
                ))}
              </Tags>
            </div>
          ) : null}
          {description ? (
            <ShareContent
              twitter={{ text: description }}
              linkedIn={{ title, summary: description }}
            />
          ) : null}
        </footer>
      </section>
    </>
  );
};

interface PortableTextPostProps
  extends Omit<
    IBlogPostBySlugApiResponse,
    '_id' | 'unsplash' | 'featuredImage' | 'description' | 'slug' | 'tags'
  > {
  nextSeo?: NextSeoProps;
  preview?: boolean;
  unsplash?: IBlogPostBySlugApiResponse['unsplash'];
  featuredImage?: IBlogPostBySlugApiResponse['featuredImage'];
  description?: IBlogPostBySlugApiResponse['description'];
  seriesSection?: {
    top: JSX.Element | null;
    bottom: JSX.Element | null;
  };
  tags?: IBlogPostBySlugApiResponse['tags'];
}

function getEstimatedReadingTime(text: string): number {
  const AVERAGE_WORD_READING = 200;
  const numberOfWords = text.split(' ').length;

  const wpm = numberOfWords / AVERAGE_WORD_READING;

  return Math.round(wpm);
}
