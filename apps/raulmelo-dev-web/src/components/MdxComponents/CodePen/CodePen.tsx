type CodePenProps = {
  /** codepen iframe url */
  src: string;
};

export const CodePen: React.FC<CodePenProps> = ({ src, children }) => {
  return (
    <iframe
      height="400"
      style={{
        width: '100%',
      }}
      scrolling="no"
      src={src}
      frameBorder="no"
      allowTransparency
      allowFullScreen
    >
      {children}
    </iframe>
  );
};
