import { defineField, defineType } from 'sanity';

export const postSchema = defineType({
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
    {
      group: 'post',
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      group: 'meta',
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      group: 'post',
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      group: 'post',
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => [
        Rule.min(5).error('Description too short.'),
        Rule.max(150).error('Description is too long.'),
      ],
    },
    {
      group: 'meta',
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    },
    {
      group: 'meta',
      name: 'seriesCopy',
      title: 'Series Copy',
      type: 'string',
    },
    {
      type: 'blockContent',
      group: 'post',
      name: 'content',
    },
    {
      group: 'media',
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      group: 'media',
      name: 'imgCaption',
      title: 'Image Caption',
      type: 'string',
    },
    {
      group: 'reference',
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      group: 'reference',
      name: 'postSeries',
      title: 'Post Series',
      type: 'reference',
      to: [{ type: 'postSeries' }],
    },
    {
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
    },
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
