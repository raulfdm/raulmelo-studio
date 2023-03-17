import {
  imgUrlFor,
  isEmpty,
  type SanityImageSource,
} from '@raulmelo/core/utils';
import { ImageSlider, ViewCarouselIcon } from '@raulmelo/ui';

import { sanityClient } from '../../client';

export const imageSliderField = {
  type: `object`,
  name: `imageSlider`,
  title: `Image Slider`,
  icon: () => <ViewCarouselIcon width={20} />,
  fields: [
    {
      name: `images`,
      type: `array`,
      defaultValue: [],
      of: [
        {
          type: `object`,
          name: `images`,
          fields: [
            { type: `image`, name: `image`, title: `Image` },
            { type: `string`, name: `alt`, title: `Alternative Text` },
            { type: `string`, name: `caption`, title: `Image caption` },
            { type: `number`, name: `width` },
            { type: `number`, name: `height` },
          ],
        },
      ],
    },
  ],
  components: {
    preview: ({ images }: SanityImageSliderProps) => {
      if (images === undefined || isEmpty(images)) {
        return null;
      }

      const filteredImages = images.filter(filterEmptyImage);

      if (filteredImages.length === 0) {
        return null;
      }

      return (
        <ImageSlider images={filteredImages.map(prepareImages) as never} />
      );

      function filterEmptyImage(sanityImage: SanityImageSliderImage) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (sanityImage.image?.[`asset`] === undefined) {
          return false;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (sanityImage.image?.[`src`] === undefined) {
          return false;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (sanityImage.image?.[`alt`] === undefined) {
          return false;
        }

        return true;
      }

      function prepareImages(sanityImage: SanityImageSliderImage) {
        const { image, ...props } = sanityImage;
        const { url } = imgUrlFor(sanityClient, image);

        return {
          src: url,
          ...props,
        };
      }
    },
  },
  preview: {
    select: {
      images: `images`,
    },
  },
};

type SanityImageSliderImage = {
  image: SanityImageSource;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type SanityImageSliderProps = {
  images?: SanityImageSliderImage[];
};
