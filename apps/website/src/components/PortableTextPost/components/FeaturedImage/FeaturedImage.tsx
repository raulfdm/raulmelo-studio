import { IBlogPostBySlugApiResponse } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
import classNames from 'classnames';
import Image from 'next/image';
import { defineMessages, FormattedMessage } from 'react-intl';

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

export const FeaturedImage = ({ url, alt, unsplash }: FeaturedImageProps) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      className="mb-8 lg:mb-16 col-span-full"
      role="img"
      aria-label={formatMessage(messages.featuredImageLabel)}
    >
      <figure className="relative h-0 overflow-hidden shadow aspect-w-12 aspect-h-6">
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
            <a href={url} className="underline text-secondary">
              {authorName}
            </a>
          ),
          unsplashLink: (
            <a href="https://unsplash.com" className="underline text-secondary">
              Unsplash
            </a>
          ),
        }}
      />
    </Caption>
  );
}

function Caption({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={classNames(
        'text-center text-base lg:text-md dark:text-gray-300 mt-4',
        className,
      )}
      {...props}
    />
  );
}
