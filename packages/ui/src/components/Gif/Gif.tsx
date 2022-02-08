//@ts-ignore
import styles from './Gif.module.css';

export function Gif(props: GifProps) {
  const { src, caption, width, height, renderImage } = props;
  return (
    <figure
      style={{
        maxWidth: width ? `${width}px` : 'fit-content',
      }}
      className={styles.figure}
    >
      {renderImage ? (
        renderImage(props)
      ) : (
        <img src={src} alt={caption} width={width} height={height} />
      )}
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
  width?: Dimension;
  height?: Dimension;
  caption?: string;
  renderImage?: (props: GifProps) => React.ReactNode;
};
