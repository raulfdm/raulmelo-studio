import React from 'react';

export const Gif = ({
  src,
  caption,
  width,
  height,
  ImageComponent = 'img',
}: GifProps) => {
  /**
   * Since we're building pages, errors like this is quite useful to
   * understand where is failing. In other cases the error that MDX compiler
   * will give us is almost impossible to know which post has invalid props.
   */
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
        <figcaption className="w-full text-center">{caption}</figcaption>
      )}
    </figure>
  );
};

type Dimension = string | number;

type GifProps = {
  src: string;
  width: Dimension;
  height: Dimension;
  caption?: string;
  ImageComponent?: React.ElementType;
};
