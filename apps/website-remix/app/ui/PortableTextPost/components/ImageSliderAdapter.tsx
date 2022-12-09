import { utils } from '@raulmelo/core';
import { ImageSlider } from '@raulmelo/ui';

export function ImageSliderAdapter({ images }: SanityBlock) {
  if (utils.isNil(images) || utils.isEmpty(images)) {
    return null;
  }

  const adaptedImages = images.map((img) => {
    const { alt, caption, height, width, image } = img;
    const src = utils.imgUrlFor(image).url();

    const imgDimensions = utils.getImageDimensionsFromSanityImageUrl(src);

    return {
      alt,
      caption,
      height: height ?? imgDimensions.height,
      width: width ?? imgDimensions.width,
      src,
    };
  });

  return (
    <ImageSlider
      images={adaptedImages}
      renderImage={(img) => {
        return <img {...img} />;
      }}
    />
  );
}

type SanityBlock = ImageSliderValue & {
  isInline: boolean;
  index: number;
};

interface ImageSliderValue {
  _key: string;
  _type: string;
  images: ImageElement[];
}

interface ImageElement {
  _key: string;
  _type: string;
  alt: string;
  caption: string;
  height?: number;
  image: ImageImage;
  width?: number;
}

interface ImageImage {
  _type: string;
  asset: Asset;
}

interface Asset {
  _ref: string;
  _type: string;
}
