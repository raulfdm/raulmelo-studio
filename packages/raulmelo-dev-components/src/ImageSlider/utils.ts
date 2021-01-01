import { SliderImageProps } from './ImageSlider';

/**
 * The main focus of this component is to be used with mdx pipeline and
 * unfortunately it's very hard to identify when some required props was forgotten.
 *
 * So, this method only exists to help recognize when I forget to pass a prop
 */
export function validations(image: SliderImageProps): void {
  if (!image.src) {
    throw new Error('ImageSlider: image requires "src"');
  }

  if (!image.alt) {
    throw new Error('ImageSlider: image requires "alt"');
  }
}
