import Refractor from 'react-refractor';
import bash from 'refractor/lang/bash';
import js from 'refractor/lang/javascript';
import json from 'refractor/lang/json';

Refractor.registerLanguage(js);
Refractor.registerLanguage(json);
Refractor.registerLanguage(bash);

interface ICodeComponentProps {
  value?: {
    code?: string;
    language?: string;
    highlightedLines?: number[];
    filename?: string;
  };
}

export function CodeComponent({ value }: ICodeComponentProps) {
  if (value?.code === undefined) {
    return null;
  }

  let lang = value?.language;

  if (lang === 'sh') {
    lang = 'bash';
  } else if (lang === 'text' || lang === undefined) {
    lang = 'plaintext';
  }

  return (
    <Refractor
      language={lang}
      value={value.code}
      markers={value.highlightedLines}
    />
  );
}
