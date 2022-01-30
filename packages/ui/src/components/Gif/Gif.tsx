import styles from './Gif.module.css';

export function Gif({
  src,
  caption,
  width,
  height,
  ImageComponent = 'img',
}: GifProps) {
  return (
    <figure
      style={{
        maxWidth: width ? `${width}px` : undefined,
      }}
      className={styles.figure}
    >
      <ImageComponent src={src} alt={caption} width={width} height={height} />
      {caption && (
        <figcaption role="caption" className={styles.caption}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

type Dimension = string | number;

export type GifProps = {
  src: string;
  width: Dimension;
  height: Dimension;
  caption?: string;
  ImageComponent?: React.ElementType;
};
