//@ts-ignore
import styles from './YouTubeIframe.module.css';

export function YouTubeIframe({ src, videoId }: YouTubeIframeProps) {
  if (src) {
    throw new Error(
      `YouTubeIframe: "src" is no longer allowed. Use "videoId" instead`,
    );
  }

  if (!videoId) {
    console.error(`YouTubeIframe: "videoId" is required`);
    return null;
  }

  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  /**
   * The reasons for defining here the code from iframe-responsive
   * is because with a custom component, remark does not know what kind
   * of html element is it and puts under a paragraph <p>
   * As consequence of that, responsive-iframe plugin cannot identify this iframe
   * and does not apply the wrapper and styles for it.
   *
   * This sucks but it seems a limitation of using first remark, then react-rehype */
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.iframe}
        src={videoSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        data-testid="youtube-iframe"
        title="YouTube Video"
      />
    </div>
  );
}

export interface YouTubeIframeProps {
  src?: string;
  videoId?: string;
}
