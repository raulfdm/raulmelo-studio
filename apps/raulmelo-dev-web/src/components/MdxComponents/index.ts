import { Gif } from './Gif';
import { BigQuote } from './BigQuote';
import { YouTubeVideo } from './YouTubeVideo';
import { DotDivider } from './DotDivider';
import { Blockquote } from './Blockquote';
import * as Headings from './Headings';
import { Paragraph } from './Paragraph';
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
  blockquote: Blockquote,
  p: Paragraph,
  TwitterCard,
  ...Headings,
};
