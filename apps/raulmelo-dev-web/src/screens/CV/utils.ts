export function stringToArrayOfParagraph(str: string): string[] {
  return str.split(/\n/g).filter((val) => val);
}

export function idGenerator(): string {
  return Math.random().toString(36).substr(2, 9);
}
