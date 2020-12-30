import React from 'react';

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
      className="relative mx-auto"
      style={{
        maxWidth: width,
      }}
    >
      <ImageComponent src={src} alt={caption} width={width} height={height} />
      {caption && (
        <figcaption role="caption" className="w-full text-center">
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
