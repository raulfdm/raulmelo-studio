import { type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { type SanityImageObject } from '@sanity/image-url/lib/types/types';

import { isNil } from './ramda';

type Source = SanityImageObject | string;

export function imgUrlFor(sanityConfig: SanityClient, source: Source) {
  return imageUrlBuilder(sanityConfig)
    .image(source)
    .maxWidth(1300)
    .fit('max')
    .auto(`format`);
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

export { type SanityImageObject };
