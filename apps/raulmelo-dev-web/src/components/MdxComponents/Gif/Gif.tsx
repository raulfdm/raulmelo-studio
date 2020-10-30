import React from 'react';
import { styled } from '@styles/styled';
import { CSSObject } from 'styled-components';

type GifProps = {
  src: string;
  caption?: string;
  imgStyle?: string | CSSObject;
};

type FigureProps = {
  extraStyles?: string;
  style?: CSSObject;
};

const Figure = styled.figure<{ extraStyles?: string }>`
  margin: 0 auto;
  margin-bottom: 20px;
  ${({ extraStyles }) => extraStyles}
`;

export const Gif: React.FC<GifProps> = ({ src, caption, imgStyle }) => {
  const figureStyle: FigureProps = {};

  /**
   * Note
   * I initially had implemented that with string because
   * at the beginning I was .md files which does not support
   * JSX syntax.
   *
   * Later I migrate to .mdx and now it's possible to pass proper styles.
   *
   * I'm a bit concerned to drop imgStyle string support and break some post
   * which might be using it.
   */
  if (imgStyle) {
    if (typeof imgStyle === 'string') {
      figureStyle.extraStyles = imgStyle;
    } else {
      figureStyle.style = imgStyle;
    }
  }

  return (
    <Figure data-testid="gif-figure" className="gif-wrapper" {...figureStyle}>
      <img
        src={src}
        alt={caption}
        style={{ margin: 0, width: '100%' }}
        data-testid="gif-image"
      />
      {caption && (
        <figcaption className="gif-caption" data-testid="gif-figcaption">
          {caption}
        </figcaption>
      )}
    </Figure>
  );
};
