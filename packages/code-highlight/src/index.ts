import type { Root } from 'hast';
import { toHtml } from 'hast-util-to-html';

import { addLineNumber } from './addLineNumber.js';
import { starryNight } from './configuredStarry.js';
import { markHighlightedLines } from './markHighlightedLines.js';

type CodeHighlightOptions = {
  language?: string;
  highlightedLines?: string;
};

export function highlight(
  code: string,
  { language = '', highlightedLines = '' }: CodeHighlightOptions = {},
) {
  const scope = starryNight.flagToScope(language) ?? 'etc';

  const result = highlightOrPlainText(code, scope);

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

/**
 * A grammar that fails to compile used to take the whole page down with it.
 * Now that every page is rendered at build time that would fail the entire
 * build, so an unhighlightable block degrades to plain text instead.
 */
function highlightOrPlainText(code: string, scope: string): Root {
  try {
    return starryNight.highlight(code, scope);
  } catch (error) {
    console.warn(`Could not highlight a "${scope}" block:`, error);

    return { type: 'root', children: [{ type: 'text', value: code }] };
  }
}

export { CODE_LANGUAGES_MAP } from './configuredStarry.js';
