import type { Root } from 'hast';

export function markHighlightedLines(tree: Root, highlightedLines: string) {
  const linesToMark = getLinesToMark(highlightedLines);

  if (linesToMark.length === 0) {
    return tree;
  }

  /**
   * For some reason, there are a bunch of `text` nodes in the tree
   * with breaking lines. We need to filter them out to apply the line highlight
   * properly.
   */
  const childrenToCheck = tree.children.filter(
    (child) => child.type === 'element' && child.tagName === 'span',
  );

  for (const lineToMark of linesToMark) {
    /**
     * -1 because the array is 0-based and the lines are 1-based.
     */
    const line = childrenToCheck[lineToMark - 1];

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
