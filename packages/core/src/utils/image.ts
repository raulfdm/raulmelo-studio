import imageUrlBuilder from '@sanity/image-url';

import { sanityConfig } from '~/config';

import { isNil } from './ramda';

const builder = imageUrlBuilder(sanityConfig);

export function imgUrlFor(source: SanityImageSource) {
  return builder.image(source);
}

// TODO: unit test it
export function getImageDimensionsFromSanityImageUrl(url: string) {
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

export type SanityImageSource =
  import('@sanity/image-url/lib/types/types').SanityImageSource;
