import { defineField } from 'sanity';

export const usesSchema = defineField({
  name: 'uses',
  title: 'Uses',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
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
      type: 'blockContent',
      name: 'content',
    },
    {
      name: 'seoTitle',
      type: 'string',
      title: 'Title',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'Description',
      group: 'seo',
      type: 'text',
      validation: (Rule) => [
        Rule.min(5).error('Description too short.'),
        Rule.max(140).error('Description is too long.'),
      ],
    },
  ],
  preview: {
    select: {
      language: 'language',
    },
    prepare(selection) {
      return {
        title: `In ${selection.language.toUpperCase()}`,
      };
    },
  },
});
