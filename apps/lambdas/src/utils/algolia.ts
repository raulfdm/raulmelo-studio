export function getDateTimestamp(date: string): string {
  return (new Date(date).getTime() / 1000).toFixed(0);
}

export function getExcerpt(content: string): string {
  return content
    .replace(/---/g, '')
    .replace(/\\n/g, '')
    .replace(/#/g, '')
    .slice(0, 5000);
}
