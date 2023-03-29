import type { Root } from 'hast';

export function markHighlightedLines(tree: Root, highlightedLines: string) {
  const linesToMark = getLinesToMark(highlightedLines);

  if (linesToMark.length === 0) {
    return tree;
  }

  for (const lineToMark of linesToMark) {
    const line = tree.children[lineToMark];

    if (line && 'properties' in line) {
      line.properties!.dataHighlightLine = true;
    }
  }

  return tree;
}

export function getLinesToMark(lines?: string): number[] {
  if (!lines || !lines.trim()) {
    return [];
  }

  const allLines = lines.split(`,`);

  const result: number[] = [];

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
