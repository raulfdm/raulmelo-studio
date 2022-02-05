import {
  BigQuote,
  CodePenIframe,
  DotDivider,
  Gif,
  sanityToUiAdapter,
  Tweet,
  YouTubeIframe,
} from '@raulmelo/ui';

import { CodeComponent } from './Code';
import { ImageAdapter } from './ImageAdapter';
import { ImageSliderAdapter } from './ImageSliderAdapter';

export const portableComponents = {
  hardBreak: false,
  types: {
    divider: () => <DotDivider />,
    code: CodeComponent,
    youtubeVideo: sanityToUiAdapter(YouTubeIframe),
    image: ImageAdapter,
    codePen: sanityToUiAdapter(CodePenIframe),
    tweet: sanityToUiAdapter(Tweet),
    gif: sanityToUiAdapter(Gif),
    imageSlider: ImageSliderAdapter,
  },
  block: {
    bigQuote: ({ children }: { children: React.ReactNode }) => {
      return <BigQuote>{children}</BigQuote>;
    },
  },
};
