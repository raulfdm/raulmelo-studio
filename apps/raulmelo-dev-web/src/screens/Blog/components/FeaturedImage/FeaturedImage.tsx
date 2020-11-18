import React from 'react';
import Image from 'next/image';
import { defineMessages } from 'react-intl';

import { styled } from '@styles/styled';
import { useLocalization } from '@hooks/useLocalization';
import { Container } from '@components/Ui';

const ImgWrapper = styled(Container)`
  && {
    max-width: 1080px;
    padding-bottom: 50px;
  }
`;

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
    <ImgWrapper
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
    </ImgWrapper>
  );
};
