import React from 'react';
import Image from 'next/image';
import { defineMessages } from 'react-intl';

import { useLocalization } from '@hooks/useLocalization';

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
};

export const FeaturedImage: React.FC<FeaturedImageProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const { formatMessage } = useLocalization();

  return (
    <div
      className="max-w-screen-lg mx-auto my-6"
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
      {alt && (
        <p className="img-caption" data-testid="featured-img-caption">
          {alt}
        </p>
      )}
    </div>
  );
};
