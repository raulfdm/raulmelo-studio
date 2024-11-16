import {defineField, defineType} from 'sanity'

import {codeField} from '../customFields/codeField'

export const codeSnippetsSchema = defineType({
  name: `codeSnippet`,
  title: `Code Snippets`,
  type: `document`,
  groups: [
    {
      name: `publishInfo`,
      title: `Publish Info`,
    },
    {
      name: `code`,
      title: `Code`,
      default: true,
    },
  ],
  fields: [
    defineField({
      group: `publishInfo`,
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `publishInfo`,
      name: `slug`,
      title: `Slug`,
      type: `slug`,
      options: {
        source: `title`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `publishInfo`,
      name: `publishedAt`,
      title: `Published at`,
      type: `date`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `code`,
      name: `description`,
      title: `Description`,
      type: `text`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `code`,
      name: `snippets`,
      title: `Snippets`,
      type: `array`,
      of: [{type: codeField.name}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `publishInfo`,
      name: `tags`,
      title: `Tags`,
      type: `array`,
      of: [{type: `reference`, to: {type: `tag`}}],
    }),
  ],
})
