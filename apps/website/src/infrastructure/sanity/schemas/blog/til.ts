import { defineField, defineType } from 'sanity';

export const tilSchemaType = defineType({
  name: `til`,
  title: `TIL - Today I Learned`,
  type: `document`,
  groups: [
    {
      name: `post`,
      title: `Post`,
      default: true,
    },
    {
      name: `meta`,
      title: `Meta`,
    },
    {
      name: `references`,
      title: `References`,
    },
  ],
  fields: [
    defineField({
      group: `meta`,
      type: `language`,
      name: `language`,
    }),
    defineField({
      group: `post`,
      name: `title`,
      title: `Title`,
      type: `string`,
    }),
    defineField({
      group: `meta`,
      name: `slug`,
      title: `Slug`,
      type: `slug`,
      options: {
        source: `title`,
        maxLength: 96,
      },
    }),
    defineField({
      group: `meta`,
      name: `publishedAt`,
      title: `Published at`,
      type: `date`,
    }),
    defineField({
      group: `post`,
      type: `blockContent`,
      name: `content`,
    }),
    defineField({
      group: `references`,
      name: `tags`,
      title: `Tags`,
      type: `array`,
      of: [{ type: `reference`, to: { type: `tag` } }],
    }),
  ],

  orderings: [
    {
      title: `Release Date, New`,
      name: `releaseDateDesc`,
      by: [{ field: `publishedAt`, direction: `desc` }],
    },
    {
      title: `Release Date, Old`,
      name: `releaseDateAsc`,
      by: [{ field: `publishedAt`, direction: `asc` }],
    },
  ],

  preview: {
    select: {
      title: `title`,
    },
  },
});
