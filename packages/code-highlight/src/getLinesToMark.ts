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
