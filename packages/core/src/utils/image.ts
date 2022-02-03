import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { sanityConfig } from '~config';

const builder = imageUrlBuilder(sanityConfig);

export function imgUrlFor(source: SanityImageSource) {
  return builder.image(source);
}
