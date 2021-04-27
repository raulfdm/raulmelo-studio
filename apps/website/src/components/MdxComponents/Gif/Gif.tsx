import React from 'react';
import tw, { css } from 'twin.macro';

export const Gif = ({
  src,
  caption,
  width,
  height,
  ImageComponent = 'img',
}: GifProps) => {
  if (!width || !height) {
    throw new Error(`Width and Height are required: Image src: ${src}`);
  }

  return (
    <figure
      css={[
        tw`relative m-auto`,
        css`
          max-width: ${width}px;
        `,
      ]}
    >
      <ImageComponent src={src} alt={caption} width={width} height={height} />
      {caption && (
        <figcaption role="caption" tw="text-center w-full">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

type Dimension = string | number;

export type GifProps = {
  src: string;
  width: Dimension;
  height: Dimension;
  caption?: string;
  ImageComponent?: React.ElementType;
};
