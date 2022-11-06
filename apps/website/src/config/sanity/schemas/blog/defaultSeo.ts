import { defineField, defineType } from 'sanity';

export const defaultSeoSchemaType = defineType({
  name: 'defaultSeo',
  title: 'Default SEO',
  type: 'document',
  fields: [
    defineField({
      type: 'language',
      name: 'language',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
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
