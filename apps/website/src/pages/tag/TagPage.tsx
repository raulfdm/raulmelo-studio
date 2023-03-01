import { isEmpty } from '@raulmelo/core/utils';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import { PostBasic } from '~/components/PostBasic';
import { useLocalization } from '~/hooks/useLocalization';
import { AuthorPresentation } from '~/pages/home/components/AuthorPresentation';
import { getTilUrl } from '~/pages/til/home/utils';
import siteData from '~/site-data';
import { getPostUrl, getTagUrl } from '~/utils/url';

import type { TagPageProps } from './types';

const messages = defineMessages({
  description: {
    id: 'tag.description',
  },
  title: {
    id: 'tag.title',
  },
});

export const TagPage = ({ tag, content }: TagPageProps) => {
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
          title: `${title} - ${siteData.personalInformation.fullName}`,
          description: description,
          type: 'website',
          site_name: siteData.personalInformation.fullName,
          images: [
            {
              url: siteData.site.seoImage.url,
              width: 1024,
              height: 512,
              alt: siteData.personalInformation.fullName,
            },
          ],
        }}
      />

      <AuthorPresentation />

      <h2 className="mb-4 font-sans text-xl font-extrabold col-span-full lg:text-2xl lg:mb-8">
        {title}
      </h2>
      {isEmpty(content) ? (
        <p className="text-lg col-span-full">
          <FormattedMessage id="tag.empty" />
        </p>
      ) : (
        <ul className="pb-5 space-y-6 md:pb-10 col-span-full">
          {content.map((c) => {
            const getUrl = c._type === 'post' ? getPostUrl : getTilUrl;

            return (
              <PostBasic
                key={c._id}
                titleClassName="text-xl lg:text-2xl"
                {...c}
                url={getUrl(c.slug)}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};
