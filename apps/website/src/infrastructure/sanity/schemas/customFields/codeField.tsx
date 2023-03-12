import { CodeBlock, CodeIcon, LANGUAGES_MAP } from '@raulmelo/ui';

export const codeField = {
  type: `object`,
  name: `code`,
  title: `Code Snippet`,
  icon: () => <CodeIcon width={20} />,
  fields: [
    {
      type: `string`,
      name: `language`,
      title: `Language`,
      options: {
        initialValue: `plaintext`,
        list: adaptMapToListValue(LANGUAGES_MAP),
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
    },
  ],
  components: {
    preview: ({
      code,
      language,
      filename,
      highlightedLines,
    }: {
      code?: string;
      filename: string;
      highlightedLines: string;
      language: string;
    }) => {
      const lang = LANGUAGES_MAP.get(language);

      if (!code) {
        return null;
      }

      const compProps = {
        language: lang,
        code,
        filename,
        highlightedLines,
      };

      return <CodeBlock {...compProps} />;
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
};

function adaptMapToListValue(languages: typeof LANGUAGES_MAP) {
  const list: { title: string; value: string }[] = [];

  languages.forEach((value, key) => {
    list.push({ title: key, value });
  });

  return list;
}
