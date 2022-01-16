export const rssSchema = {
  name: 'rss',
  title: 'RSS Settings',
  type: 'document',
  fields: [
    {
      type: 'language',
      name: 'language',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
    },
    prepare(selection: { title: string; language: string }) {
      return {
        title: `In ${selection.language.toUpperCase()}`,
      };
    },
  },
};
