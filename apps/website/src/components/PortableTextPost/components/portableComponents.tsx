import {
  BigQuote,
  CodePenIframe,
  DotDivider,
  Gif,
  ImageSlider,
  sanityToUiAdapter,
  Tweet,
  YouTubeIframe,
} from '@raulmelo/ui';

import { CodeComponent } from './Code';

export const portableComponents = {
  hardBreak: false as boolean,
  types: {
    divider: () => {
      return <DotDivider />;
    },
    code: CodeComponent,
    youtubeVideo: sanityToUiAdapter(YouTubeIframe),
    codePen: sanityToUiAdapter(CodePenIframe),
    tweet: sanityToUiAdapter(Tweet),
    gif: sanityToUiAdapter(Gif),
    imageSlider: (props) => {
      console.log(props);
      return null;
    },
  },
  block: {
    bigQuote: (props: any) => {
      return <BigQuote {...props} />;
    },
  },
};
