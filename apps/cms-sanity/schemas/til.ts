export const til = {
  name: 'til',
  title: 'TIL - Today I Learned',
  type: 'document',
  groups: [
    {
      name: 'post',
      title: 'Post',
      default: true,
    },
    {
      name: 'references',
      title: 'References',
    },
    {
      name: 'meta',
      title: 'Meta',
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
      group: 'meta',
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
    },
    {
      group: 'post',
      type: 'markdown',
      description: 'A Github flavored markdown field with image uploading',
      name: 'content',
    },
    {
      group: 'references',
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
