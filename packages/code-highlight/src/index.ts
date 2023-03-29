import { toHtml } from 'hast-util-to-html';

import { addLineNumber } from './addLineNumber';
import { starryNight } from './configuredStarry';

type CodeHighlightOptions = {
  language?: string;
};

export function highlight(
  code: string,
  { language = '' }: CodeHighlightOptions = {},
) {
  const scope = starryNight.flagToScope(language) ?? 'etc';

  let result = starryNight.highlight(code, scope);

  return toHtml(addLineNumber(result));
}

export { CODE_LANGUAGES_MAP } from './configuredStarry';
