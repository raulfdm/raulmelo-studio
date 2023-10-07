import { toHtml } from 'hast-util-to-html';

import { addLineNumber } from './addLineNumber.ts';
import { starryNight } from './configuredStarry.ts';
import { markHighlightedLines } from './markHighlightedLines.ts';

type CodeHighlightOptions = {
  language?: string;
  highlightedLines?: string;
};

export function highlight(
  code: string,
  { language = '', highlightedLines = '' }: CodeHighlightOptions = {},
) {
  const scope = starryNight.flagToScope(language) ?? 'etc';

  const result = starryNight.highlight(code, scope);

  /**
   * it MUST be in this order.
   */
  const withLineNumbers = addLineNumber(result);
  const withHighlightedLines = markHighlightedLines(
    withLineNumbers,
    highlightedLines,
  );

  return toHtml(withHighlightedLines);
}

export { CODE_LANGUAGES_MAP } from './configuredStarry.js';
