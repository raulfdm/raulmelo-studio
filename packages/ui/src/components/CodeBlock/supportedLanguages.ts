export const LANGUAGES_MAP = new Map();

/**
 * For some reason, sanity pass me the "title" (e.g., Plain Text) of the language
 * instead its value (e.g. "plaintext").
 *
 * This map will help me to generate language list but also retrieve the value.
 */
LANGUAGES_MAP.set('Bash', 'bash');
LANGUAGES_MAP.set('CSS', 'css');
LANGUAGES_MAP.set('Diff', 'diff');
LANGUAGES_MAP.set('HTML', 'html');
LANGUAGES_MAP.set('JavaScript', 'js');
LANGUAGES_MAP.set('JSX', 'jsx');
LANGUAGES_MAP.set('Markdown', 'md');
LANGUAGES_MAP.set('Plain Text', 'plaintext');
LANGUAGES_MAP.set('Regex', 'regex');
LANGUAGES_MAP.set('RSS', 'rss');
LANGUAGES_MAP.set('Rust', 'rust');
LANGUAGES_MAP.set('SVG', 'svg');
LANGUAGES_MAP.set('TypeScript', 'ts');
LANGUAGES_MAP.set('TSX', 'tsx');
LANGUAGES_MAP.set('xml', 'xml');
LANGUAGES_MAP.set('YAML', 'yaml');
LANGUAGES_MAP.set('GraphQL', 'graphql');
