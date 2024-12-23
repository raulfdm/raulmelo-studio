import {defineField, defineType} from 'sanity'

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `post`,
      name: `title`,
      title: `Title`,
      type: `string`,
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `meta`,
      name: `publishedAt`,
      title: `Published at`,
      type: `date`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `post`,
      type: `blockContent`,
      name: `content`,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: `references`,
      name: `tags`,
      title: `Tags`,
      type: `array`,
      of: [{type: `reference`, to: {type: `tag`}}],
    }),
    defineField({
      group: `references`,
      name: `relatedPosts`,
      title: `Related Posts`,
      type: `array`,
      of: [
        {
          type: `reference`,
          to: [
            {
              type: `post`,
            },
            {type: `til`},
          ],
          options: {
            filter: ({
              document,
            }: {
              document: {
                _type: string
                _id: string
              }
            }) => {
              const {_type, _id} = document

              /**
               * Don't want to allow selecting drafts
               */
              if (_id.includes(`drafts`)) {
                return false
              }

              return _type === `post` || _type === `til`
            },
          },
        },
      ],
      validation: (Rule) => [
        Rule.unique().error(`You can't select the same post twice`),
        Rule.max(2).error(`Too many related posts. You should select only 2`),
      ],
    }),
  ],

  orderings: [
    {
      title: `Release Date, New`,
      name: `releaseDateDesc`,
      by: [{field: `publishedAt`, direction: `desc`}],
    },
    {
      title: `Release Date, Old`,
      name: `releaseDateAsc`,
      by: [{field: `publishedAt`, direction: `asc`}],
    },
  ],

  preview: {
    select: {
      title: `title`,
    },
  },
})
