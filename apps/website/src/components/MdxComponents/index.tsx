import dynamic from 'next/dynamic';

import { BigQuote } from './BigQuote';
import { DotDivider } from './DotDivider';

import type { YouTubeIframe as YouTubeIframeType } from './YouTubeIframe';
import type { Tweet as TweetType } from './Tweet';
import type { ImageSlider as ImageSliderType } from './ImageSlider';
import type { Gif as GifType } from './Gif';
import type { CodePenIframe as CodePenIframeType } from './CodePenIframe';
import type { BigQuote as BigQuoteType } from './BigQuote';

import { Image } from './Image';
import { H1, H2, H3, H4, H5, H6 } from './Headings';

const YouTubeVideo = dynamic(() =>
  import('./YouTubeIframe').then((mod) => mod.YouTubeIframe),
) as typeof YouTubeIframeType;

const BigQuote = dynamic(() =>
  import('./BigQuote').then((mod) => mod.BigQuote),
) as typeof BigQuoteType;

const Gif = dynamic(() =>
  import('./Gif').then((mod) => mod.Gif),
) as typeof GifType;

const CodePenIframe = dynamic(() =>
  import('./CodePenIframe').then((mod) => mod.CodePenIframe),
) as typeof CodePenIframeType;

const ImageSlider = dynamic(() =>
  import('./ImageSlider').then((mod) => mod.ImageSlider),
) as typeof ImageSliderType;

const Tweet = dynamic(() =>
  import('./Tweet').then((mod) => mod.Tweet),
) as typeof TweetType;

export const mdxComponents = {
  BigQuote,
  Gif,
  CodePen: CodePenIframe,
  YouTubeVideo,
  hr: DotDivider,
  Image,
  Tweet,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  ImageSlider,
};
