import {
  getImageDimensionsFromSanityImageUrl,
  imgUrlFor,
  isEmpty,
  isNil,
} from '@raulmelo/core/utils';
import { ImageSlider } from '@raulmelo/ui';
import NextImage from 'next/image';

export function ImageSliderAdapter({ value }: SanityBlock) {
  const { images } = value;

  if (isNil(images) || isEmpty(images)) {
    return null;
  }

  const adaptedImages = images.map((img) => {
    const { alt, caption, height, width, image } = img;
    const src = imgUrlFor(image).url();

    const imgDimensions = getImageDimensionsFromSanityImageUrl(src);

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
        return <NextImage {...img} />;
      }}
    />
  );
}

interface SanityBlock {
  value: ImageSliderValue;
  isInline: boolean;
  index: number;
}

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
