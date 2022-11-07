import { defineField, defineType } from 'sanity';

export const postSchemaType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'post',
      title: 'Post',
      default: true,
    },
    {
      name: 'media',
      title: 'Media',
    },

    {
      name: 'meta',
      title: 'Meta',
    },
    {
      name: 'reference',
      title: 'References',
    },
  ],
  fields: [
    defineField({
      group: 'meta',
      type: 'language',
      name: 'language',
    }),
    defineField({
      group: 'post',
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      group: 'meta',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      group: 'post',
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      group: 'post',
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => [
        Rule.min(5).error('Description too short.'),
        Rule.max(150).error('Description is too long.'),
      ],
    }),
    defineField({
      group: 'meta',
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    }),
    defineField({
      group: 'meta',
      name: 'seriesCopy',
      title: 'Series Copy',
      type: 'string',
    }),
    defineField({
      type: 'blockContent',
      group: 'post',
      name: 'content',
    }),
    defineField({
      group: 'media',
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      group: 'media',
      name: 'imgCaption',
      title: 'Image Caption',
      type: 'string',
    }),
    defineField({
      group: 'reference',
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      group: 'reference',
      name: 'postSeries',
      title: 'Post Series',
      type: 'reference',
      to: [{ type: 'postSeries' }],
    }),
    defineField({
      group: 'media',
      title: 'Unsplash',
      name: 'unsplash',
      type: 'object',
      fields: [
        {
          name: 'authorName',
          type: 'string',
          title: 'Author Name',
        },
        { name: 'url', type: 'string', title: 'URL' },
      ],
    }),
  ],

  orderings: [
    {
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Release Date, Old',
      name: 'releaseDateAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'featuredImage',
      seriesCopy: 'seriesCopy',
    },
    prepare(selection) {
      const result = {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      };

      if (selection.seriesCopy) {
        result.subtitle = selection.seriesCopy;
      }

      return result;
    },
  },
});
