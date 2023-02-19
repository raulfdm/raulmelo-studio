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

export const Image = ({ caption, customWidth, image, alt }: ImageProps) => {
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
    <div className="flex items-center justify-center">
      <figure style={figureStyles}>
        <img
          src={`${image.url}?auto=format&max-w=1037&fit=max`}
          {...props}
          alt={alt || ''}
          loading="lazy"
        />
        {caption ? (
          <figcaption className="text-center">{caption}</figcaption>
        ) : null}
      </figure>
    </div>
  );
};
