type YouTubeVideoSrcProps = {
  src: React.HTMLProps<HTMLIFrameElement>['src'];
};

type YouTubeVideoVideoIdProps = {
  videoId: string;
};

type Overload = {
  (props: YouTubeVideoSrcProps): JSX.Element;
  (props: YouTubeVideoVideoIdProps): JSX.Element;
};

const hasSrc = (
  props: YouTubeVideoSrcProps | YouTubeVideoVideoIdProps,
): props is YouTubeVideoSrcProps => 'src' in props;

export const YouTubeVideo: Overload = (
  props: YouTubeVideoSrcProps | YouTubeVideoVideoIdProps,
) => {
  const videoSrc = hasSrc(props)
    ? props.src
    : `https://www.youtube.com/embed/${props.videoId}`;

  /**
   * The reasons for defining here the code from iframe-responsive
   * is because with a custom component, remark does not know what kind
   * of html element is it and puts under a paragraph <p>
   * As consequence of that, responsive-iframe plugin cannot identify this iframe
   * and does not apply the wrapper and styles for it.
   *
   * This sucks but it seems a limitation of using first remark, then react-rehype */
  return (
    <div
      className="w-full h-0 relative overflow-hidden"
      style={{ paddingBottom: '56.25%' }}
    >
      <iframe
        className="absolute top-0 left-0 h-full w-full"
        width="560"
        height="315"
        src={videoSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/e_h1fHGN7Sc"
  frameBorder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>;
