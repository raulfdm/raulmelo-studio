import type { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import type { SanityImageObject } from '@sanity/image-url/lib/types/types';

import { isNil } from './ramda.js';

type Source =
  | SanityImageObject
  | {
      url: string;
      width: number;
      height: number;
    };

export type ImageUrlForReturnType = {
  sanityImage: ImageUrlBuilder;
  url: string;
  width: number;
  height: number;
  aspectRatio: `${number}:${number}`;
};

export function imgUrlFor(
  sanityConfig: SanityClient,
  source: Source,
): ImageUrlForReturnType {
  if ('url' in source) {
    const { width, height } = scaleDownImageSize(source.width, source.height);
    const sanityImage = getFinalSanityImage(source.url, width, height);

    return {
      sanityImage,
      url: sanityImage.url(),
      width,
      height,
      aspectRatio: calculateAspectRatio(width, height),
    };
  }

  const url = imageUrlBuilder(sanityConfig).image(source).url();
  const sourceSize = getImageDimensionsFromSanityImageUrl(url);

  const { width, height } = scaleDownImageSize(
    sourceSize.width,
    sourceSize.height,
  );

  const sanityImage = getFinalSanityImage(source, width, height);

  return {
    sanityImage,
    url: sanityImage.url(),
    width,
    height,
    aspectRatio: calculateAspectRatio(width, height),
  };

  function getFinalSanityImage(
    imageSource: SanityImageObject | string,
    width: number,
    height: number,
  ) {
    return imageUrlBuilder(sanityConfig)
      .image(imageSource)
      .auto('format')
      .width(width)
      .height(height);
  }
}

function scaleDownImageSize(width: number, height: number) {
  const maxWidth = 1300;

  if (width <= maxWidth) {
    return { width, height };
  }

  const ratio = maxWidth / width;
  const newWidth = maxWidth;
  const newHeight = Math.floor(height * ratio);

  return { width: newWidth, height: newHeight };
}

function calculateAspectRatio(
  width: number,
  height: number,
): `${number}:${number}` {
  // Calculate the aspect ratio by dividing the width by the height
  const aspectRatio = width / height;

  // Convert the aspect ratio to a simplified fraction
  const fraction = simplifyFraction(aspectRatio);

  // Combine the numerator and denominator into a string separated by a colon

  return `${fraction.numerator}:${fraction.denominator}`;
}

// Helper function to simplify a fraction
function simplifyFraction(fraction: number) {
  // Find the greatest common divisor of the numerator and denominator
  const findGreatestCommonDivisor = (a: number, b: number): number =>
    b === 0 ? a : findGreatestCommonDivisor(b, a % b);
  const greatestCommonDivisor = findGreatestCommonDivisor(
    Math.floor(fraction * 10000),
    10000,
  );

  // Divide both the numerator and denominator by the greatest common divisor to simplify the fraction
  const numerator = Math.floor((fraction * 10000) / greatestCommonDivisor);
  const denominator = 10000 / greatestCommonDivisor;

  return { numerator, denominator };
}

function getImageDimensionsFromSanityImageUrl(url: string) {
  /**
   * Sanity image URLs look like this:
   * "http://some-url/aaksdjaksdj-245x153.some-extension"
   *                              ^^^^^^^
   *
   * This utility extracts this information since the builder image utility
   * from sanity does not provide the dimensions
   */
  const REGEX = /-(\d*)x(\d*)./gm;
  const pattern = REGEX.exec(url) ?? [];

  const [, width, height] = pattern;

  if (isNil(width) || isNil(height)) {
    throw new Error(`Could not parse image dimensions from url => "${url}"`);
  }

  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  };
}

export { type SanityImageObject };
