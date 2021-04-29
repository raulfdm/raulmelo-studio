import { useLocalization } from '@hooks/useLocalization';
import { BlogPostPost } from '@screens/BlogPost';
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
  unsplash: BlogPostPost['unsplash'];
};

const styles = {
  wrapper: tw`mb-8 lg:mb-16 col-span-full`,
  figure: tw`aspect-w-12 aspect-h-6 relative overflow-hidden h-0 shadow`,
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

type UnsplashCaptionProps = NonNullable<BlogPostPost['unsplash']>;

function UnsplashCaption({ authorName, url }: UnsplashCaptionProps) {
  return (
    <Caption>
      <FormattedMessage
        id="blogPost.unsplashCaption"
        values={{
          authorLink: (
            <a href={url} tw="underline">
              {authorName}
            </a>
          ),
          unsplashLink: (
            <a href="https://unsplash.com" tw="underline">
              Unsplash
            </a>
          ),
        }}
      />
    </Caption>
  );
}
