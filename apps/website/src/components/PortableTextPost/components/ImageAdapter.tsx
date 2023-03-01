import {
  getImageDimensionsFromSanityImageUrl,
  imgUrlFor,
} from '@raulmelo/core/utils';

import { Image } from './Image';

type SanityImageSource = Parameters<typeof imgUrlFor>;

export function ImageAdapter({
  value,
}: {
  value: { asset: SanityImageSource };
}) {
  const { asset } = value;
  const src = imgUrlFor(asset).url();
  const imgDimensions = getImageDimensionsFromSanityImageUrl(src);

  return <Image {...imgDimensions} image={{ url: src, ...imgDimensions }} />;
}
