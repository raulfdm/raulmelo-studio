import { useLocalization } from '$infrastructure/contexts/Localization';
import { useAppLocation } from '$infrastructure/hooks/useAppLocation';
import { getTagUrl } from '$infrastructure/utils/url';
import { ShareContent } from '$ui/ShareContent';
import { Tag, Tags } from '$ui/Tags';
import { PortableText } from '@portabletext/react';
import type { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts';
import { ProseContainer } from '@raulmelo/ui';
import { Link } from '@remix-run/react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import type { NextSeoProps } from 'next-seo';
// import { ArticleJsonLd, NextSeo } from 'next-seo';
import { useMemo } from 'react';

// import { ShareContent } from '~/components/ShareContent';
// import { Tag, Tags } from '~/components/Tags';
// import { useLocalization } from '~/hooks/useLocalization';
// import siteData from '~/site-data';
// import { getTagUrl } from '~/utils/url';

import { FeaturedImage } from './components/FeaturedImage';
import { Header } from './components/Header';
import { portableComponents } from './components/portableComponents';
// import { PreviewBanner } from './components/PreviewBanner/PreviewBanner';

export const PortableTextPost = ({
  content,
  featuredImage,
  title,
  subtitle,
  description,
  publishedAt,
  tags,
  seriesSection,
  // nextSeo,
  // preview,
  unsplash,
  estimatedReadingTime,
}: PortableTextPostProps) => {
  const { formatDate, locale } = useLocalization();
  const { pathname } = useAppLocation();

  // const seoInfo = useMemo(() => {
  //   const date = new Date(publishedAt).toISOString();

  //   return {
  //     title: title,
  //     /**
  //      * This enforce parsing double quotes correctly.
  //      * - no parsing: "the description will be "like this""
  //      * - parsing: "the description will be \"like this\""
  //      */
  //     description: `${description}`,
  //     url: `${siteData.site.url}${asPath}`,
  //     published: date,
  //     modified: date,
  //     image: {
  //       url: featuredImage?.url ?? siteData.site.seoImage.url,
  //       width: featuredImage?.width ?? siteData.site.seoImage.width,
  //       height: featuredImage?.height ?? siteData.site.seoImage.height,
  //     },
  //   };
  // }, [
  //   title,
  //   description,
  //   featuredImage,
  //   publishedAt,
  //   asPath,
  //   siteData.site.url,
  // ]);

  return (
    <>
      {/* <ArticleJsonLd
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
      /> */}
      {featuredImage ? (
        <FeaturedImage url={featuredImage.url} unsplash={unsplash} />
      ) : null}
      <section className="w-full col-span-full lg:col-start-2 lg:col-end-12">
        <Header
          title={title}
          subtitle={subtitle}
          publishedDate={formatDate(new Date(publishedAt), {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
          readingTime={estimatedReadingTime}
        />
        {seriesSection?.top}
        <ProseContainer className="mt-8">
          <PortableText
            value={content}
            components={portableComponents as never}
          />
        </ProseContainer>
        {seriesSection?.bottom}
        <hr className="mt-10 mb-6" />
        <footer className="flex flex-wrap justify-between">
          {tags ? (
            <div className="mb-4 mr-4">
              <span className="block mb-4 font-extrabold text-md md:text-lg lg:text-xl md:mb-6">
                Tags
              </span>
              <Tags>
                {tags.map((tag) => (
                  <Tag key={tag._id} className="text-base lg:text-lg">
                    <Link
                      to={getTagUrl(tag.slug, locale)}
                      className="underline text-secondary"
                    >
                      #{tag.name}
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
  estimatedReadingTime: number;
  // nextSeo?: NextSeoProps;
  // preview?: boolean;
  unsplash?: IBlogPostBySlugApiResponse['unsplash'];
  featuredImage?: IBlogPostBySlugApiResponse['featuredImage'];
  description?: IBlogPostBySlugApiResponse['description'];
  seriesSection?: {
    top: JSX.Element | null;
    bottom: JSX.Element | null;
  };
  tags?: IBlogPostBySlugApiResponse['tags'];
}
