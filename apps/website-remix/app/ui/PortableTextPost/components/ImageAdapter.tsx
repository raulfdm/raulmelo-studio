import { utils } from '@raulmelo/core';

import { Image } from './Image';

type SanityImageSource = Parameters<typeof utils[`imgUrlFor`]>;

export function ImageAdapter({ asset }: { asset: SanityImageSource }) {
  const src = utils.imgUrlFor(asset).url();
  const imgDimensions = utils.getImageDimensionsFromSanityImageUrl(src);

  return <Image {...imgDimensions} image={{ url: src, ...imgDimensions }} />;
}
