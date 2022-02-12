import {
  BigQuote,
  CodeBlock,
  CodePenIframe,
  DotDivider,
  Gif,
  Highlight,
  sanityToUiAdapter,
  Tweet,
  YouTubeIframe,
} from '@raulmelo/ui';

import { ImageAdapter } from './ImageAdapter';
import { ImageSliderAdapter } from './ImageSliderAdapter';

export const portableComponents = {
  hardBreak: false,
  types: {
    divider: () => <DotDivider />,
    code: sanityToUiAdapter(CodeBlock),
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
    blockquote: ({ children }: { children: string[] }) => {
      const updatedChildren = children
        .filter((c) => c !== '')
        .reduce((accumulator, current) => {
          if (current.length === 0) {
            return accumulator;
          }

          if (current === '\n') {
            accumulator.push(<br />);
            return accumulator;
          }

          accumulator.push(current);
          return accumulator;
        }, [] as (React.ReactNode | string)[]);

      return <blockquote>{updatedChildren}</blockquote>;
    },
  },
  marks: {
    highlight: ({ children, ...props }: { children: React.ReactNode }) => {
      return <Highlight {...props}>{children}</Highlight>;
    },
  },
};
