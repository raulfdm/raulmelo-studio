import { useLocalization } from '@hooks/useLocalization';
import { AuthorPresentation } from '@screens/Home/components/AuthorPresentation';
import { Posts } from '@screens/Home/components/Posts';
import { getTagUrl } from '@utils/url';
import { NextSeo } from 'next-seo';
import { defineMessages } from 'react-intl';
import { TagPageProps } from './types';
import siteData from 'site-data';
import { useMemo } from 'react';

const messages = defineMessages({
  description: {
    id: 'tag.description',
  },
  title: {
    id: 'tag.title',
  },
});

export const TagPage: React.FC<TagPageProps> = ({ tag }) => {
  const { formatMessage } = useLocalization();

  const [title, description] = useMemo(
    () => [
      formatMessage(messages.title, { tag: tag.name }),
      formatMessage(messages.description, { tag: tag.name }),
    ],
    [tag.name],
  );

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${siteData.site.url}${getTagUrl(tag.slug)}`}
        openGraph={{
          title: `${title} - ${siteData.personalInformation.full_name}`,
          description: description,
          type: 'website',
          site_name: siteData.personalInformation.full_name,
          images: [
            {
              url: siteData.site.seo_image.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.full_name,
            },
          ],
        }}
      />

      <AuthorPresentation />
      <Posts
        posts={tag.blog_posts}
        title={formatMessage(messages.title, { tag: tag.name })}
      />
    </>
  );
};
