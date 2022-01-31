import {
  BigQuote,
  CodePenIframe,
  DotDivider,
  Gif,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  ImageSlider,
  Tweet,
  YouTubeIframe,
} from '@raulmelo/ui';
import NextImage from 'next/image';

import { Image } from './Image';

export const mdxComponents = {
  BigQuote,
  Gif,
  CodePen: CodePenIframe,
  YouTubeVideo: YouTubeIframe,
  hr: DotDivider,
  Image,
  Tweet,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ImageSlider: function (props: any) {
    return (
      <ImageSlider
        renderImage={(currentImage) => {
          return (
            <NextImage
              layout="responsive"
              src={currentImage.src}
              width={currentImage.width}
              height={currentImage.height}
              alt={currentImage.alt}
            />
          );
        }}
        {...props}
      />
    );
  },
};
