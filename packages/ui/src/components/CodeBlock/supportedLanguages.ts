export const LANGUAGES_MAP = new Map();

/**
 * For some reason, sanity pass me the "title" (e.g., Plain Text) of the language
 * instead its value (e.g. "plaintext").
 *
 * This map will help me to generate language list but also retrieve the value.
 */
LANGUAGES_MAP.set('Bash', 'bash');
LANGUAGES_MAP.set('CSS', 'css');
LANGUAGES_MAP.set('CSV', 'csv');
LANGUAGES_MAP.set('Diff', 'diff');
LANGUAGES_MAP.set('Git', 'git');
LANGUAGES_MAP.set('Go', 'go');
LANGUAGES_MAP.set('Go Module', 'go-mod');
LANGUAGES_MAP.set('GraphQL', 'graphql');
LANGUAGES_MAP.set('HTML', 'html');
LANGUAGES_MAP.set('JavaScript', 'js');
LANGUAGES_MAP.set('JSON', 'json');
LANGUAGES_MAP.set('JSX', 'jsx');
LANGUAGES_MAP.set('Markdown', 'md');
LANGUAGES_MAP.set('Plain Text', 'plaintext');
LANGUAGES_MAP.set('Regex', 'regex');
LANGUAGES_MAP.set('RSS', 'rss');
LANGUAGES_MAP.set('Rust', 'rust');
LANGUAGES_MAP.set('Svelte', 'svelte');
LANGUAGES_MAP.set('SVG', 'svg');
LANGUAGES_MAP.set('TSX', 'tsx');
LANGUAGES_MAP.set('TypeScript', 'ts');
LANGUAGES_MAP.set('XML', 'xml');
LANGUAGES_MAP.set('YAML', 'yaml');
