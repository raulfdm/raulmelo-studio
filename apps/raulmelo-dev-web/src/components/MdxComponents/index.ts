import { Gif } from './Gif';
import { BigQuote } from './BigQuote';
import { YouTubeVideo } from './YouTubeVideo';
import { DotDivider } from './DotDivider';
import * as Headings from './Headings';
import { CodePen } from './CodePen';
import { TwitterCard } from './TwitterCard';
import { Image } from './Image';

export const mdxComponents = {
  BigQuote,
  Gif,
  CodePen,
  YouTubeVideo,
  hr: DotDivider,
  Image,
  TwitterCard,
  ...Headings,
};
