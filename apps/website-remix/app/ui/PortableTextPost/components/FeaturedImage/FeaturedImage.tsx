import { useLocalization } from '$infrastructure/contexts/Localization';
import type { BlogPostBySlug } from '@raulmelo/core/dist/types/domains/posts/queryPostBySlug/types';
import classNames from 'classnames';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  featuredImageLabel: {
    id: `blogPost.featuredImage`,
  },
});

export type FeaturedImageProps = {
  url: string;
  alt?: string;
  unsplash?: BlogPostBySlug[`unsplash`];
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
        <img
          className="object-cover"
          src={url}
          alt={alt || formatMessage(messages.featuredImageLabel)}
          loading="eager"
        />
      </figure>
      {unsplash ? <UnsplashCaption {...unsplash} /> : null}
      {!unsplash && alt ? <Caption>{alt}</Caption> : null}
    </div>
  );
};

type UnsplashCaptionProps = NonNullable<BlogPostBySlug[`unsplash`]>;

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

function Caption({ className, ...props }: React.ComponentPropsWithoutRef<`p`>) {
  return (
    <p
      className={classNames(
        `text-center text-base lg:text-md dark:text-gray-300 mt-4`,
        className,
      )}
      {...props}
    />
  );
}
