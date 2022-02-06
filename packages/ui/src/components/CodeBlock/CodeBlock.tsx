import { ConfiguredRefractor } from './ConfiguredRefractor';

interface ICodeBlockProps {
  code?: string;
  language?: string;
  highlightedLines?: number[];
  filename?: string;
}

export function CodeBlock({
  code,
  language,
  filename,
  highlightedLines = [],
}: ICodeBlockProps) {
  if (!code) {
    return null;
  }

  let lang = language;

  if (!lang || lang === 'text' || !ConfiguredRefractor.hasLanguage(language)) {
    lang = 'plaintext';
  }

  return (
    <div className="code-snippet">
      {filename && <Filename filename={filename} />}
      <ConfiguredRefractor
        language={lang}
        value={code}
        markers={highlightedLines}
      />
    </div>
  );
}

function Filename({ filename }: { filename: string }) {
  return (
    <div className="filename">
      <span>{filename}</span>
    </div>
  );
}
