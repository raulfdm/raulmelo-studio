import 'twin.macro';

import NextImage from 'next/image';
import type { CSSProperties } from 'react';

type ImageProps = {
  image: {
    width: number;
    height: number;
    url: string;
  };
  alt?: string;
  caption?: string;
  customWidth?: number;
};

export const Image: React.FC<ImageProps> = ({
  caption,
  customWidth,
  image,
  alt,
}) => {
  const props = {
    alt,
    height: image.height,
    width: image.width,
  };

  const figureStyles = {
    width: undefined,
    margin: '0 auto',
  } as CSSProperties;

  if (customWidth) {
    figureStyles.width = customWidth;
  }

  return (
    <figure style={figureStyles}>
      <NextImage src={image.url} {...props} layout="responsive" alt={alt} />
      {caption ? <figcaption tw="text-center">{caption}</figcaption> : null}
    </figure>
  );
};
