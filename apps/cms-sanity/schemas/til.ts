export const til = {
  name: 'til',
  title: 'TIL - Today I Learned',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
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
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
};
