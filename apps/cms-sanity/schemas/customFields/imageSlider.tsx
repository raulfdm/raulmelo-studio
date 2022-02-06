import { utils } from '@raulmelo/core';
import type { SanityImageSource } from '@raulmelo/core/dist/types/utils/image';
import { ImageSlider, ViewCarouselIcon } from '@raulmelo/ui';
import React from 'react';

export const imageSliderField = {
  type: 'object',
  name: 'imageSlider',
  title: 'Image Slider',
  icon: () => <ViewCarouselIcon width={20} />,
  fields: [
    {
      name: 'images',
      type: 'array',
      defaultValue: [],
      of: [
        {
          type: 'object',
          name: 'images',
          fields: [
            { type: 'image', name: 'image', title: 'Image' },
            { type: 'string', name: 'alt', title: 'Alternative Text' },
            { type: 'string', name: 'caption', title: 'Image caption' },
            { type: 'number', name: 'width' },
            { type: 'number', name: 'height' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      images: 'images',
    },
    component: ({ value }: { value: SanityImageSliderProps }) => {
      if (value.images === undefined || utils.isEmpty(value.images)) {
        return null;
      }

      const images = value.images.filter(filterEmptyImage).map(prepareImages);

      return <ImageSlider images={images} />;

      function filterEmptyImage(sanityImage: SanityImageSliderImage) {
        return sanityImage.image?.['asset'] !== undefined;
      }

      function prepareImages(sanityImage: SanityImageSliderImage) {
        const { image, ...props } = sanityImage;
        const remoteImage = utils.imgUrlFor(image);

        return {
          src: remoteImage.url(),
          ...props,
        };
      }
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
