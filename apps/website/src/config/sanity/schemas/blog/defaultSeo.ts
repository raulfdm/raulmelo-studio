import { defineField } from 'sanity';

export const defaultSeoSchema = defineField({
  name: 'defaultSeo',
  title: 'Default SEO',
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
