import { defineField, defineType } from 'sanity';

export const usesSchemaType = defineType({
  name: `uses`,
  title: `Uses`,
  type: `document`,
  groups: [
    {
      name: `seo`,
      title: `SEO`,
    },
  ],
  fields: [
    defineField({
      type: `language`,
      name: `language`,
    }),
    defineField({
      name: `title`,
      title: `Title`,
      type: `string`,
    }),
    defineField({
      type: `blockContent`,
      name: `content`,
    }),
    defineField({
      name: `seoTitle`,
      type: `string`,
      title: `Title`,
      group: `seo`,
    }),
    defineField({
      name: `seoDescription`,
      title: `Description`,
      group: `seo`,
      type: `text`,
      validation: (Rule) => [
        Rule.min(5).error(`Description too short.`),
        Rule.max(140).error(`Description is too long.`),
      ],
    }),
  ],
  preview: {
    select: {
      language: `language`,
    },
    prepare(selection) {
      return {
        title: `In ${selection.language.toUpperCase()}`,
      };
    },
  },
});
