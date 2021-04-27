import { ProseContainer } from '@components/ProseContainer';
import { ShareContent } from '@components/ShareContent';
import { Tags, Tag } from '@components/Tags';
import { useLocalization } from '@hooks/useLocalization';
import { getTagUrl } from '@utils/url';
import classNames from 'classnames';
import { BlogJsonLd, NextSeo, NextSeoProps } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import siteData from 'site-data';
import { FeaturedImage, FeaturedImageProps } from './components/FeaturedImage';
import { Header } from './components/Header';
import { PrismStyles } from './components/PrismStyles';

export const MdxPostTemplate: React.FC<MdxPostTemplateProps> = ({
  children,
  featuredImage,
  title,
  subtitle,
  description,
  publishedAt,
  tags,
  series,
  nextSeo,
}) => {
  const { formatDate } = useLocalization();
  const { asPath } = useRouter();

  const seoInfo = useMemo(() => {
    const date = new Date(publishedAt).toISOString();
    return {
      title: title,
      description: description,
      url: `${siteData.site.url}${asPath}`,
      published: date,
      modified: date,
      image: {
        url: featuredImage?.src ?? siteData.site.seo_image.url,
        width: featuredImage?.width ?? siteData.site.seo_image.width,
        height: featuredImage?.height ?? siteData.site.seo_image.height,
      },
    };
  }, [
    title,
    description,
    featuredImage?.src,
    publishedAt,
    asPath,
    siteData.site.url,
  ]);

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
        images={[seoInfo.image.url]}
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

      {featuredImage ? (
        <FeaturedImage
          src={featuredImage.src}
          unsplash={featuredImage.unsplash}
        />
      ) : null}

      <section
        className={classNames([
          'w-full',
          'col-span-full lg:col-start-2 lg:col-end-12',
        ])}
      >
        <Header
          title={title}
          subtitle={subtitle}
          publishedDate={formatDate(new Date(publishedAt), {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        />
        {series?.top}
        <ProseContainer className="mt-8">{children}</ProseContainer>
        {series?.bottom}
        <hr className="mt-10 mb-6" />
        <footer
          className={classNames(['flex', 'justify-between', 'flex-wrap'])}
        >
          {tags ? <PostTags postTags={tags} /> : null}
          <ShareContent
            twitter={{ text: description }}
            linkedIn={{ title, summary: description }}
          />
        </footer>
      </section>
    </>
  );
};

const PostTags = ({
  postTags,
}: {
  postTags: NonNullable<MdxPostTemplateProps['tags']>;
}) => {
  return (
    <div className="mb-4 mr-4">
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

interface MdxPostTemplateProps {
  tags?: { id: string; slug: string; name: string }[];
  featuredImage?: FeaturedImageProps & { width: number; height: number };
  title: string;
  description: string;
  subtitle?: string;
  publishedAt: string;
  series?: {
    top: JSX.Element | null;
    bottom: JSX.Element | null;
  };
  nextSeo?: NextSeoProps;
}
