import NextImage from 'next/image';
import { Tweet } from 'react-twitter-widgets';
import { BigQuote } from './BigQuote';
import { CodePenIframe } from './CodePenIframe';
import { DotDivider } from './DotDivider';
import { Gif } from './Gif';
import { Image } from './Image';
import { H1, H2, H3, H4, H5, H6 } from './Headings';
import { YouTubeIframe } from './YouTubeIframe';
import { ImageSliderFactory } from './ImageSlider';

export const mdxComponents = {
  BigQuote,
  Gif,
  CodePen: CodePenIframe,
  YouTubeVideo: YouTubeIframe,
  hr: DotDivider,
  Image,
  Tweet: function TweetWrapper({ tweetId }: { tweetId: string }) {
    return <Tweet tweetId={tweetId} options={{ align: 'center' }} />;
  },
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ImageSlider: ImageSliderFactory({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ImageComponent(props: any) {
      return <NextImage {...props} layout="responsive" />;
    },
  }),
};
