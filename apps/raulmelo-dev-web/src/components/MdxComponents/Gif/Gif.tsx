import { styled } from '@styles/styled';
import Image from 'next/image';

type Dimension = string | number;

type GifProps = {
  src: string;
  width: Dimension;
  height: Dimension;
  caption?: string;
};

const Figure = styled.figure`
  position: relative;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Caption = styled.figcaption`
  text-align: center;
  width: 100%;
`;

export const Gif = ({ src, caption, width, height }: GifProps) => {
  /**
   * Since we're building pages, errors like this is quite useful to
   * understand where is failing. In other cases the error that MDX compiler
   * will give us is almost impossible to know which post has invalid props.
   */
  if (!width || !height) {
    throw new Error(`Width and Height are required: Image src: ${src}`);
  }

  return (
    <Figure
      data-testid="gif-figure"
      className="gif-wrapper"
      style={{
        maxWidth: width,
      }}
    >
      <Image src={src} alt={caption} width={width} height={height} />
      {caption && (
        <Caption className="gif-caption" data-testid="gif-figcaption">
          {caption}
        </Caption>
      )}
    </Figure>
  );
};
