import { SupportedLanguages } from '@raulmelo/core/intl';

/**
 * `[lang]` routes with no further dynamic segment resolve to exactly one page
 * per supported language.
 */
export function getLanguageStaticPaths() {
  return SupportedLanguages.map((lang) => ({ params: { lang } }));
}
