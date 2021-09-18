import { useLocalization } from '@hooks/useLocalization';
import { IBlogPostBySlug } from '@raulfdm/core/dist/types/domains/posts/queryPostBySlug/types';
import Image from 'next/image';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import tw from 'twin.macro';

const messages = defineMessages({
  featuredImageLabel: {
    id: 'blogPost.featuredImage',
  },
});

export type FeaturedImageProps = {
  src: string;
  alt?: string;
  unsplash: IBlogPostBySlug['unsplash'];
};

const styles = {
  wrapper: tw`mb-8 lg:mb-16 col-span-full`,
  figure: tw`relative h-0 overflow-hidden shadow aspect-w-12 aspect-h-6`,
  captionLink: tw`underline text-secondary`,
};

const Caption = tw.p`text-center text-base lg:text-md dark:text-gray-300 mt-4`;

export const FeaturedImage: React.FC<FeaturedImageProps> = ({
  src,
  alt,
  unsplash,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      css={styles.wrapper}
      role="img"
      aria-label={formatMessage(messages.featuredImageLabel)}
    >
      <figure css={styles.figure}>
        <Image
          src={src}
          layout="fill"
          objectFit="cover"
          alt={alt || formatMessage(messages.featuredImageLabel)}
          loading="eager"
        />
      </figure>
      {unsplash ? <UnsplashCaption {...unsplash} /> : null}
      {!unsplash && alt ? <Caption>{alt}</Caption> : null}
    </div>
  );
};

type UnsplashCaptionProps = NonNullable<IBlogPostBySlug['unsplash']>;

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
