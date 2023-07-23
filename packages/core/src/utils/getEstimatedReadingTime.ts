import type { PortableTextBlock } from '@portabletext/types';

import { contentBlockToRawText } from './contentBlockToRawText';

const AVERAGE_WORD_READING = 200;

export async function getEstimatedReadingTime(
  body: PortableTextBlock,
): Promise<number> {
  const markdownContent = await contentBlockToRawText(body);
  const allWords = markdownContent.split(' ').filter(isValidWord);
  const numberOfWords = allWords.length;

  const wpm = numberOfWords / AVERAGE_WORD_READING;

  return Math.round(wpm);
}

function isValidWord(word: string): boolean {
  word = word.trim();

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
