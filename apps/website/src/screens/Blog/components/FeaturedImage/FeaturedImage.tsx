import React from 'react';
import Image from 'next/image';
import { defineMessages, FormattedMessage } from 'react-intl';

import { useLocalization } from '@hooks/useLocalization';
import { PostApiData } from '@types-api';
import classNames from 'classnames';

const messages = defineMessages({
  featuredImageLabel: {
    id: 'blog.featuredImage',
  },
});

type FeaturedImageProps = {
  src: string;
  alt?: string;
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
      className="mb-8 lg:mb-16"
      role="img"
      aria-label={formatMessage(messages.featuredImageLabel)}
    >
      <figure
        className={classNames([
          'pb-[45%]',
          'relative',
          'overflow-hidden',
          'h-0',
          'shadow',
        ])}
      >
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
      className={classNames([
        'img-caption',
        'text-center',
        'text-base lg:text-md',
        'dark:text-gray-300',
        'mt-4',
      ])}
    >
      {children}
    </p>
  );
}
