import { useLocalization } from '$infrastructure/contexts/Localization';
import { getTagUrl } from '$infrastructure/utils/url';
import { ShareContent } from '$ui/ShareContent';
import { Tag, Tags } from '$ui/Tags';
import { PortableText } from '@portabletext/react';
import type { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts';
import { ProseContainer } from '@raulmelo/ui';
import { Link } from '@remix-run/react';

import { FeaturedImage } from './components/FeaturedImage';
import { Header } from './components/Header';
import { portableComponents } from './components/portableComponents';

export const PortableTextPost = ({
  content,
  featuredImage,
  title,
  subtitle,
  description,
  publishedAt,
  tags,
  seriesSection,
  unsplash,
  estimatedReadingTime,
}: PortableTextPostProps) => {
  const { formatDate, locale } = useLocalization();

  const hasTags = tags && tags.length > 0;
  const hasDescription = description && description.length > 0;
  const shouldShowFooter = hasTags || hasDescription;

  return (
    <>
      {featuredImage ? (
        <FeaturedImage url={featuredImage.url} unsplash={unsplash} />
      ) : null}
      <section className="w-full col-span-full lg:col-start-2 lg:col-end-12">
        <Header
          title={title}
          subtitle={subtitle}
          publishedDate={formatDate(new Date(publishedAt), {
            year: `numeric`,
            month: `short`,
            day: `2-digit`,
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

        {shouldShowFooter ? (
          <>
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
          </>
        ) : null}
      </section>
    </>
  );
};

interface PortableTextPostProps
  extends Omit<
    IBlogPostBySlugApiResponse,
    `_id` | `unsplash` | `featuredImage` | `description` | `slug` | `tags`
  > {
  estimatedReadingTime: number;
  unsplash?: IBlogPostBySlugApiResponse[`unsplash`];
  featuredImage?: IBlogPostBySlugApiResponse[`featuredImage`];
  description?: IBlogPostBySlugApiResponse[`description`];
  seriesSection?: {
    top: JSX.Element | null;
    bottom: JSX.Element | null;
  };
  tags?: IBlogPostBySlugApiResponse[`tags`];
}
