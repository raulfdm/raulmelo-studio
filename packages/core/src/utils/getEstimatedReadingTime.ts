import type { PortableTextBlock } from '@portabletext/types';

import { contentBlockToMarkdown } from './contentBlockToMarkdown';

const AVERAGE_WORD_READING = 200;

export function getEstimatedReadingTime(body: PortableTextBlock): number {
  const markdownContent = contentBlockToMarkdown(body);
  const allWords = markdownContent.split(' ').filter(isValidWord);
  const numberOfWords = allWords.length;

  const wpm = numberOfWords / AVERAGE_WORD_READING;

  return Math.round(wpm);
}

function isValidWord(word: string): boolean {
  if (!word) {
    return false;
  }

  if (!word.match(/\w/gm)) {
    return false;
  }

  if (word === '\n') {
    return false;
  }

  return true;
}
