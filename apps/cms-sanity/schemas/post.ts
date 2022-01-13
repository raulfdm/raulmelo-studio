export const postSchema = {
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'post',
      title: 'Post',
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
    {
      group: 'meta',
      type: 'language',
      name: 'language',
    },
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
        Rule.max(121).error('Description is too long.'),
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
      group: 'post',
      type: 'markdown',
      description: 'A Github flavored markdown field with image uploading',
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

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'featuredImage',
    },
  },
};
