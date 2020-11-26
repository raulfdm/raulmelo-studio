import Image from 'next/image';

type Dimension = string | number;

type GifProps = {
  src: string;
  width: Dimension;
  height: Dimension;
  caption?: string;
};

export const Gif = ({ src, caption, width, height }: GifProps) => {
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
      data-testid="gif-figure"
      style={{
        maxWidth: width,
      }}
    >
      <Image src={src} alt={caption} width={width} height={height} />
      {caption && (
        <figcaption className="w-full text-center" data-testid="gif-figcaption">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
