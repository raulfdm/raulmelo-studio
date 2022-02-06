import { CodeBlock } from '@raulmelo/ui';
import React from 'react';

const LANGUAGES_MAP = new Map();

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

export const codeField = {
  type: 'object',
  name: 'code',
  fields: [
    {
      type: 'string',
      name: 'language',
      title: 'Language',
      options: {
        defaultValue: 'plaintext',
        list: adaptMapToListValue(LANGUAGES_MAP),
      },
    },
    {
      type: 'string',
      name: 'filename',
      title: 'Filename',
    },
    {
      type: 'string',
      name: 'highlightedLines',
      title: 'Lines to Highlight',
      description:
        'Comma-separated list of lines to highlight (e.g., 1,2,4-6). The dash means a range',
    },
    {
      type: 'text',
      name: 'code',
    },
  ],
  preview: {
    select: {
      code: 'code',
      language: 'language',
      filename: 'filename',
      highlightedLines: 'highlightedLines',
    },
    component: ({
      value,
    }: {
      value: {
        code?: string;
        filename: string;
        highlightedLines: string;
        language: string;
      };
    }) => {
      const { code, language, filename, highlightedLines } = value;
      const lang = LANGUAGES_MAP.get(language);

      if (!code) {
        return null;
      }

      const props = {
        language: lang,
        code,
        filename,
      };

      if (highlightedLines) {
        props['highlightedLines'] = getLines(highlightedLines);
      }

      console.log(props);

      return <CodeBlock {...props} />;
    },
  },
};

function adaptMapToListValue(languages: typeof LANGUAGES_MAP) {
  const list = [];

  languages.forEach((value, key) => {
    list.push({ title: key, value });
  });

  return list;
}

function getLines(lines: string): number[] {
  if (!lines || !lines.trim()) {
    return [];
  }
  const allLines = lines.split(',');

  const result = [];

  for (const line of allLines) {
    const [initial, end] = line.split('-');
    const initialParsed = parseInt(initial, 10);

    if (!end) {
      result.push(initialParsed);
    }

    const endParsed = parseInt(end, 10);

    for (let i = initialParsed; i <= endParsed; i++) {
      result.push(i);
    }
  }

  return result;
}
