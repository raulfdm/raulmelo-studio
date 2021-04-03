import React from 'react';
import Image from 'next/image';
import { defineMessages, FormattedMessage } from 'react-intl';

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
  unsplash,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      className="mt-14 mb-11"
      role="img"
      aria-label={formatMessage(messages.featuredImageLabel)}
    >
      <figure className="pb-[50%] relative overflow-hidden h-0">
        <Image
          src={src}
          layout={'fill'}
          alt={alt || formatMessage(messages.featuredImageLabel)}
          loading="eager"
        />
      </figure>
      {unsplash ? <UnsplashCaption {...unsplash} /> : null}
      {!unsplash && alt ? <Caption>{alt}</Caption> : null}
    </div>
  );
};

type UnsplashCaptionProps = NonNullable<PostApiData['unsplash']>;

function UnsplashCaption({ authorName, url }: UnsplashCaptionProps) {
  return (
    <Caption>
      <FormattedMessage
        id="blog.unsplashCaption"
        values={{
          authorLink: (
            <a href={url} className="underline">
              {authorName}
            </a>
          ),
          unsplashLink: (
            <a href="https://unsplash.com" className="underline">
              Unsplash
            </a>
          ),
        }}
      />
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
