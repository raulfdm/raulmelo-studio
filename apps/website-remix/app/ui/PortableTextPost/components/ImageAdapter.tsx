import {
  imgUrlFor,
  getImageDimensionsFromSanityImageUrl,
  type SanityImageSource,
} from '@raulmelo/core/utils';
import { Image } from './Image';

export function ImageAdapter({ asset }: { asset: SanityImageSource }) {
  const src = imgUrlFor(asset).url();
  const imgDimensions = getImageDimensionsFromSanityImageUrl(src);

  return <Image {...imgDimensions} image={{ url: src, ...imgDimensions }} />;
}
