import { CODE_LANGUAGES_MAP } from '@raulmelo/code-highlight';
import { IconCode } from '@tabler/icons-react';
import { defineField } from 'sanity';

export const codeField = defineField({
  type: `object`,
  name: `code`,
  title: `Code Snippet`,
  icon: () => <IconCode width={20} />,
  fields: [
    {
      type: `string`,
      name: `language`,
      title: `Language`,
      initialValue: `plaintext`,
      options: {
        list: adaptMapToListValue(CODE_LANGUAGES_MAP),
      },
    },
    {
      type: `string`,
      name: `filename`,
      title: `Filename`,
    },
    {
      type: `string`,
      name: `highlightedLines`,
      title: `Lines to Highlight`,
      description: `Comma-separated list of lines to highlight (e.g., 1,2,4-6). The dash means a range`,
    },
    {
      type: `text`,
      name: `code`,
      validation: (Rule) => Rule.required(),
    },
    {
      type: `boolean`,
      name: `showLineNumbers`,
      title: `Show Line Numbers`,
      initialValue: true,
    },
  ],
  components: {
    preview: ({ code, language }: any) => {
      const lang = CODE_LANGUAGES_MAP.get(language);

      if (!code) {
        return null;
      }

      return (
        <code>
          <pre>{code}</pre>
          <span>{lang}</span>
        </code>
      );
    },
  },
  preview: {
    select: {
      code: `code`,
      language: `language`,
      filename: `filename`,
      highlightedLines: `highlightedLines`,
    },
  },
});

function adaptMapToListValue(languages: typeof CODE_LANGUAGES_MAP) {
  const list: { title: string; value: string }[] = [];

  languages.forEach((value, key) => {
    list.push({ title: key, value });
  });

  return list;
}
