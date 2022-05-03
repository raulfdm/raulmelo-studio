import { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
import Image from 'next/image';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import tw from 'twin.macro';

import { useLocalization } from '~/hooks/useLocalization';

const messages = defineMessages({
  featuredImageLabel: {
    id: 'blogPost.featuredImage',
  },
});

export type FeaturedImageProps = {
  url: string;
  alt?: string;
  unsplash?: IBlogPostBySlugApiResponse['unsplash'];
};

const styles = {
  wrapper: tw`mb-8 lg:mb-16 col-span-full`,
  figure: tw`relative h-0 overflow-hidden shadow`,
  captionLink: tw`underline text-secondary`,
};

const Caption = tw.p`text-center text-base lg:text-md dark:text-gray-300 mt-4`;

export const FeaturedImage = ({ url, alt, unsplash }: FeaturedImageProps) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      css={styles.wrapper}
      role="img"
      aria-label={formatMessage(messages.featuredImageLabel)}
    >
      <figure css={styles.figure} className="aspect-w-12 aspect-h-6">
        <Image
          src={url}
          layout="fill"
          objectFit="cover"
          alt={alt || formatMessage(messages.featuredImageLabel)}
          loading="eager"
          priority
        />
      </figure>
      {unsplash ? <UnsplashCaption {...unsplash} /> : null}
      {!unsplash && alt ? <Caption>{alt}</Caption> : null}
    </div>
  );
};

type UnsplashCaptionProps = NonNullable<IBlogPostBySlugApiResponse['unsplash']>;

function UnsplashCaption({ authorName, url }: UnsplashCaptionProps) {
  return (
    <Caption>
      <FormattedMessage
        id="blogPost.unsplashCaption"
        values={{
          authorLink: (
            <a href={url} tw="underline text-secondary">
              {authorName}
            </a>
          ),
          unsplashLink: (
            <a href="https://unsplash.com" tw="underline text-secondary">
              Unsplash
            </a>
          ),
        }}
      />
    </Caption>
  );
}
