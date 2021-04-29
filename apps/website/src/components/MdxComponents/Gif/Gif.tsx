import React from 'react';
import tw, { css, styled } from 'twin.macro';

const Figure = styled.figure(
  ({ width }: { width: number }) => css`
    ${tw`relative m-auto`};

    max-width: ${width}px;

    figcaption {
      ${tw`text-center w-full`};
    }
  `,
);

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
    <Figure width={width as number}>
      <ImageComponent src={src} alt={caption} width={width} height={height} />
      {caption && <figcaption role="caption">{caption}</figcaption>}
    </Figure>
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
