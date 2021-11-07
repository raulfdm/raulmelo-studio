import { PostBasic } from '@components/PostBasic';
import { useLocalization } from '@hooks/useLocalization';
import { utils } from '@raulfdm/core';
import { AuthorPresentation } from '@screens/Home/components/AuthorPresentation';
import { getTilUrl } from '@screens/TilsHome/utils';
import { getPostUrl, getTagUrl } from '@utils/url';
import { NextSeo } from 'next-seo';
import React, { useMemo } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import siteData from 'site-data';
import tw from 'twin.macro';

import { TagPageProps } from './types';

const messages = defineMessages({
  description: {
    id: 'tag.description',
  },
  title: {
    id: 'tag.title',
  },
});

const styles = {
  pageTitle: tw`mb-4 font-sans text-xl font-extrabold col-span-full lg:text-2xl lg:mb-8`,
  emptyParagraph: tw`text-lg col-span-full`,
  postTitle: tw`text-xl lg:text-2xl`,
  list: tw`pb-5 space-y-6 md:pb-10 col-span-full`,
};

export const TagPage: React.FC<TagPageProps> = ({ tag, content }) => {
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

      <h2 css={styles.pageTitle}>{title}</h2>
      {utils.isEmpty(content) ? (
        <p css={styles.emptyParagraph}>
          <FormattedMessage id="tag.empty" />
        </p>
      ) : (
        <ul css={styles.list}>
          {content.map((c) => {
            const getUrl = c.type === 'post' ? getPostUrl : getTilUrl;

            return (
              <PostBasic
                key={c.id}
                titleClassName={styles.postTitle}
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
