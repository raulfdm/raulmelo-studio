export const postSeries = {
  name: 'postSeries',
  title: 'Post Series',
  type: 'document',
  fields: [
    {
      type: 'language',
      name: 'language',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'posts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      posts: 'posts',
    },
    prepare(selection) {
      console.log(selection);
      const { posts, name } = selection;
      const numberOfPosts = posts.length;
      let plural = 'posts';

      if (numberOfPosts === 1) {
        plural = 'post';
      }

      return { title: name, subtitle: `${numberOfPosts} ${plural}` };
    },
  },
};
