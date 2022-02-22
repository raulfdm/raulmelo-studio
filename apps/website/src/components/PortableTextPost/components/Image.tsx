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

  const figureStyles = {} as CSSProperties;

  if (customWidth) {
    figureStyles.width = customWidth;
  }

  return (
    <div tw="flex items-center justify-center">
      <figure style={figureStyles}>
        <NextImage src={image.url} {...props} alt={alt} quality={90} />
        {caption ? <figcaption tw="text-center">{caption}</figcaption> : null}
      </figure>
    </div>
  );
};
