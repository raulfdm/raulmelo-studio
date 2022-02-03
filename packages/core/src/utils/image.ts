import imageUrlBuilder from '@sanity/image-url';

import { sanityConfig } from '~config';

const builder = imageUrlBuilder(sanityConfig);

export function imgUrlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type SanityImageSource =
  import('@sanity/image-url/lib/types/types').SanityImageSource;
