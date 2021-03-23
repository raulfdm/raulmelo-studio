import React from 'react';
import Image from 'next/image';
import { defineMessages } from 'react-intl';

import { useLocalization } from '@hooks/useLocalization';
import { PostApiData } from '@types-api';

const messages = defineMessages({
  featuredImageLabel: {
    id: 'blog.featuredImage',
  },
});

type FeaturedImageProps = {
  src: string;
  alt?: string;
  width: string | number;
  height: string | number;
  unsplash: PostApiData['unsplash'];
};

export const FeaturedImage: React.FC<FeaturedImageProps> = ({
  src,
  alt,
  width,
  height,
  unsplash,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      className="max-w-screen-lg mx-auto mt-14 mb-11"
      role="img"
      aria-label={formatMessage(messages.featuredImageLabel)}
    >
      <Image
        src={src}
        width={width}
        height={height}
        layout="responsive"
        alt={alt || formatMessage(messages.featuredImageLabel)}
        loading="eager"
      />
      {unsplash ? <UnsplashCaption {...unsplash} /> : null}
      {!unsplash && alt ? <Caption>{alt}</Caption> : null}
    </div>
  );
};

type UnsplashCaptionProps = NonNullable<PostApiData['unsplash']>;

function UnsplashCaption({ authorName, url }: UnsplashCaptionProps) {
  return (
    <Caption>
      Photo by{' '}
      <a href={url} className="underline">
        {authorName}
      </a>{' '}
      at{' '}
      <a href="https://unsplash.com" className="underline">
        Unsplash
      </a>
    </Caption>
  );
}

type CaptionProps = {
  children: React.ReactNode;
};
function Caption({ children }: CaptionProps) {
  return (
    <p
      className="img-caption text-center text-sm mt-2 text-gray-600 dark:text-gray-300"
      data-testid="featured-img-caption"
    >
      {children}
    </p>
  );
}
