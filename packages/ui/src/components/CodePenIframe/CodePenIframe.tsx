import { parseCodePenDirectUrl } from './utils';

export interface CodePenProps {
  /** codepen iframe url */
  src?: string;
  directUrl?: string;
  height?: string;
}

export const CodePenIframe: React.FC<CodePenProps> = ({
  src,
  directUrl,
  children,
  height = '400',
}) => {
  let finalUrl = src;

  if (directUrl) {
    finalUrl = parseCodePenDirectUrl(directUrl);
  }

  if (!finalUrl) {
    console.error('CodePenIframe must receive either "src" or "directUrl"');
    return null;
  }

  return (
    <iframe
      height={height}
      style={{
        width: '100%',
      }}
      scrolling="no"
      src={finalUrl}
      frameBorder="no"
      allowFullScreen
      data-testid="codepen"
      title="CodePen demo"
    >
      {children}
    </iframe>
  );
};
