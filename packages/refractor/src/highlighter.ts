import { toHtml } from 'hast-util-to-html';

import { addMarkers } from './addMarkers';
import { refractor } from './configuredRefractor';

export function highlight(code: string, language: string, markers?: string) {
  const codeLanguage = refractor.registered(language) ? language : `plaintext`;

  const tree = refractor.highlight(code, codeLanguage);

  const lines = getLines(markers);

  addMarkers(tree.children, { markers: lines });

  return {
    html: toHtml(tree),
    classLang: `language-${codeLanguage}`,
  };
}

function getLines(lines?: string): number[] {
  /**
   * Don't know how but sometimes I got lines as number[]
   */
  if (Array.isArray(lines)) {
    return lines;
  }

  if (!lines || !lines.trim()) {
    return [];
  }
  const allLines = lines.split(`,`);

  const result: any[] = [];

  for (const line of allLines) {
    const [initial, end] = line.split(`-`);
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
