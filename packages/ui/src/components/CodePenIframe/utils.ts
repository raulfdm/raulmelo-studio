export function parseCodePenDirectUrl(url: string): string {
  url = url.replace('/pen/', '/embed/');

  return url;
}
