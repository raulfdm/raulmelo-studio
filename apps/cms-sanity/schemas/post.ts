export default {
  name: 'post',
  title: 'Post',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => [
        Rule.min(5).error('Description too short.'),
        Rule.max(121).error('Description is too long.'),
      ],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    },
    {
      type: 'markdown',
      description: 'A Github flavored markdown field with image uploading',
      name: 'content',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
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
