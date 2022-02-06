import { ConfiguredRefractor } from './ConfiguredRefractor';

interface ICodeBlockProps {
  code: string;
  language?: string;
  highlightedLines?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language,
  filename,
  highlightedLines,
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
        markers={getLines(highlightedLines)}
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

function getLines(lines?: string): number[] {
  if (!lines || !lines.trim()) {
    return [];
  }
  const allLines = lines.split(',');

  const result = [];

  for (const line of allLines) {
    const [initial, end] = line.split('-');
    const initialParsed = parseInt(initial, 10);

    if (!end) {
      result.push(initialParsed);
    }

    const endParsed = parseInt(end, 10);

    for (let i = initialParsed; i <= endParsed; i++) {
      result.push(i);
    }
  }

  return result;
}
