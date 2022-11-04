import { defineField } from 'sanity';

export const rssSchema = defineField({
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
    prepare(selection) {
      return {
        title: `In ${selection.language.toUpperCase()}`,
      };
    },
  },
});
